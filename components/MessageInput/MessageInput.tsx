import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  Image,
  Alert,
} from "react-native";
import {
  AntDesign,
  Feather,
  Ionicons,
  MaterialCommunityIcons,
  SimpleLineIcons,
} from "@expo/vector-icons";
import EmojiSelector from "react-native-emoji-selector";

import { Auth, Storage } from "aws-amplify";
import { DataStore } from "@aws-amplify/datastore";
import { ChatRoom, Message } from "../../src/models";

import * as ImagePicker from "expo-image-picker";
import { v4 as uuidv4 } from "uuid";
import { Audio } from "expo-av";
import AudioPlayer from "../AudioPlayer";
import MessageComponent from "../Message";
import { ChatRoomUser } from "../../src/models";
import { useNavigation } from "@react-navigation/core";
import { box } from "tweetnacl";
import {
  encrypt,
  getMySecretKey,
  stringToUint8Array,
} from "../../utils/crypto";

const MessageInput = ({ chatRoom, messageReplyTo, removeMessageReplyTo }) => {
  const [message, setMessage] = useState("");
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [imageKey, setImageKey] = useState<string | undefined>(undefined);
  const [progress, setProgress] = useState(0);
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [soundURI, setSoundURI] = useState<string | null>(null);
  const [audioKey, setAudioKey] = useState<string | undefined>(undefined);

  const navigation = useNavigation();

  // permissions to camera and library
  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const libraryResponse =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        const cameraResponse =
          await ImagePicker.requestCameraPermissionsAsync();
        await Audio.requestPermissionsAsync();
        if (
          libraryResponse.status !== "granted" ||
          cameraResponse.status !== "granted"
        ) {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  useEffect(() => {
    if (imageKey === undefined) {
      return;
    }
    sendMessage();
  }, [imageKey]);

  useEffect(() => {
    if (audioKey === undefined) {
      return;
    }
    sendMessage();
  }, [audioKey]);

  const sendMessageToUser = async (user, fromUserID) => {
    // send message
    const ourSecretKey = await getMySecretKey(fromUserID);
    if (!ourSecretKey) {
      return;
    }
    // console.log(user);
    if (!user.publicKey) {
      Alert.alert(
        "the user haven't set his keypair yet",
        "Until the user generates the keypair, you can't send him messages"
      );
      return;
    }

    const sharedKey = box.before(
      stringToUint8Array(user.publicKey),
      ourSecretKey
    );
    // console.log("shared key", sharedKey);

    const encryptedMessage = encrypt(sharedKey, { message });
    // console.log("encrypted message", encryptedMessage);

    const newMessage = await DataStore.save(
      new Message({
        content: encryptedMessage,
        image: imageKey,
        audio: audioKey,
        userID: fromUserID,
        forUserID: user.id,
        chatroomID: chatRoom.id,
        status: "SENT",
        replyToMessageID: messageReplyTo?.id,
      })
    );

    // updateLastMessage(newMessage);
    resetFields();
  };

  const sendMessage = async () => {
    const authUser = await Auth.currentAuthenticatedUser();

    // get all the users of this chatroom
    const users = (await DataStore.query(ChatRoomUser))
      .filter((cru) => cru.chatRoom.id === chatRoom.id)
      .map((cru) => cru.user);

    await Promise.all(
      users.map((user) => sendMessageToUser(user, authUser.attributes.sub))
    );
  };

  // save lastMessage to chatRoom
  const updateLastMessage = async (newMessage) => {
    await DataStore.save(
      ChatRoom.copyOf(chatRoom, (updatedChatRoom) => {
        updatedChatRoom.LastMessage = newMessage;
      })
    );
  };

  const onPlusClicked = () => {
    // console.warn("On plus clicked");
  };

  const onPress = () => {
    if (image) {
      sendImage();
    } else if (soundURI) {
      sendAudio();
    } else if (message) {
      sendMessage();
    } else {
      onPlusClicked();
    }
  };

  const resetFields = () => {
    setMessage("");
    setIsEmojiPickerOpen(false);
    setImage(null);
    setImageKey(undefined);
    setAudioKey(undefined);
    setProgress(0);
    setSoundURI(null);
    removeMessageReplyTo();
  };

  // Image picker
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const takePhoto = async () => {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [4, 3],
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const progressCallback = (progress) => {
    setProgress(progress.loaded / progress.total);
  };

  const sendImage = async () => {
    if (!image) {
      return;
    }
    const blob = await getBlob(image);
    const { key } = await Storage.put(`${uuidv4()}.png`, blob, {
      progressCallback,
    });
    setImageKey(key);
    // updateLastMessage(newMessage);
  };

  const getBlob = async (uri: string) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    return blob;
  };

  // Audio

  async function startRecording() {
    try {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
      console.log("Starting recording..");
      const { recording } = await Audio.Recording.createAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );
      setRecording(recording);
      console.log("Recording started");
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  }

  async function stopRecording() {
    console.log("Stopping recording..");

    if (!recording) {
      return;
    }
    await recording.stopAndUnloadAsync();
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
    });

    const uri = recording.getURI();
    console.log("Recording stopped and stored at", uri);
    if (!uri) {
      return;
    }
    setSoundURI(uri);
    setRecording(null);
  }

  const sendAudio = async () => {
    if (!soundURI) {
      return;
    }
    const blob = await getBlob(soundURI);
    const { key } = await Storage.put(`${uuidv4()}.mp3`, blob, {
      progressCallback,
    });

    setAudioKey(key);
  };

  return (
    <KeyboardAvoidingView
      style={
        (styles.root,
        { height: isEmojiPickerOpen ? "50%" : "auto", padding: 10 })
      }
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={100}
    >
      {messageReplyTo && (
        <View
          style={{
            backgroundColor: "#f2f2f2",
            padding: 5,
            flexDirection: "row",
            alignSelf: "stretch",
            justifyContent: "space-between",
          }}
        >
          <View style={{ flex: 1 }}>
            <Text>Reply to: </Text>
            <MessageComponent message={messageReplyTo} />
          </View>
          <Pressable
            onPress={() => {
              removeMessageReplyTo();
            }}
          >
            <AntDesign
              name="close"
              size={24}
              color="black"
              style={{ margin: 5 }}
            />
          </Pressable>
        </View>
      )}

      {image && (
        <View style={styles.sendImageContainer}>
          <Image
            source={{ uri: image }}
            style={{ width: 100, height: 100, borderRadius: 10 }}
          />

          <View
            style={{
              flex: 1,
              justifyContent: "flex-start",
              alignSelf: "flex-end",
            }}
          >
            <View
              style={{
                height: 5,
                borderRadius: 5,
                backgroundColor: "#3777f0",
                width: `${progress * 100}%`,
              }}
            />
          </View>

          <Pressable
            onPress={() => {
              setImage(null);
            }}
          >
            <AntDesign
              name="close"
              size={24}
              color="black"
              style={{ margin: 5 }}
            />
          </Pressable>
        </View>
      )}

      {soundURI && <AudioPlayer soundURI={soundURI} />}

      <View style={styles.row}>
        <View style={styles.inputContainer}>
          <Pressable
            onPress={() => {
              setIsEmojiPickerOpen((currentValue) => !currentValue);
            }}
          >
            <SimpleLineIcons
              name="emotsmile"
              size={24}
              color="grey"
              style={styles.icon}
            />
          </Pressable>

          <TextInput
            style={styles.input}
            value={message}
            onChangeText={setMessage}
            placeholder="Signal message ..."
          />

          <Pressable onPress={pickImage}>
            <Feather name="image" size={24} color="grey" style={styles.icon} />
          </Pressable>

          <Pressable onPress={takePhoto}>
            <Feather name="camera" size={24} color="grey" style={styles.icon} />
          </Pressable>

          <Pressable onPressIn={startRecording} onPressOut={stopRecording}>
            <MaterialCommunityIcons
              name={recording ? "microphone" : "microphone-outline"}
              size={24}
              color={recording ? "red" : "grey"}
              style={styles.icon}
            />
          </Pressable>
        </View>
        <Pressable onPress={onPress} style={styles.buttonContainer}>
          {message || image || soundURI ? (
            <Ionicons name="send" size={18} color="white" />
          ) : (
            <AntDesign name="plus" size={24} color="white" />
          )}
        </Pressable>
      </View>

      {isEmojiPickerOpen && (
        <EmojiSelector
          onEmojiSelected={(emoji) => {
            setMessage((currentMessage) => currentMessage + emoji);
          }}
          columns={8}
        />
      )}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: "column",
  },
  sendImageContainer: {
    flexDirection: "row",
    marginVertical: 10,
    alignSelf: "stretch",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 10,
  },

  row: {
    flexDirection: "row",
  },
  inputContainer: {
    flexDirection: "row",
    backgroundColor: "#f2f2f2",
    flex: 1,
    padding: 5,
    marginRight: 10,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#dedede",
    alignItems: "center",
  },
  input: {
    flex: 1,
    marginHorizontal: 5,
  },
  icon: {
    marginHorizontal: 5,
  },
  buttonContainer: {
    width: 40,
    height: 40,
    backgroundColor: "#3777f0",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default MessageInput;
