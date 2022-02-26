import React, { useState, useEffect } from "react";
import {
  Image,
  View,
  Text,
  Pressable,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/core";

import { Auth } from "aws-amplify";
import { DataStore, Predicates, SortDirection } from "@aws-amplify/datastore";
import { ChatRoomUser, User, Message } from "../../src/models";
import moment from "moment";

import styles from "./styles";
import {
  decrypt,
  getMySecretKey,
  stringToUint8Array,
} from "../../utils/crypto";
import { box } from "tweetnacl";

export default function ChatRoomItem({ chatRoom }) {
  const [authUser, setAuthUser] = useState<User | null>();
  const [otherUser, setOtherUser] = useState<User | null>(null);
  const [lastMessage, setLastMessage] = useState<Message | undefined>();
  const [decryptedContent, setDecryptedContent] = useState<
    string | undefined
  >();
  const [isLoading, setIsLoading] = useState(true);

  const navigation = useNavigation();

  useEffect(() => {
    fetchAuthUser();
  }, []);

  useEffect(() => {
    authUser && fetchUser();
  }, [authUser]);

  useEffect(() => {
    authUser && fetchLastMessage();
  }, [authUser]);

  useEffect(() => {
    lastMessage && decryptMessage();
  }, [lastMessage]);

  // subscription for ChatRoomUser (when chatRoom is created)
  useEffect(() => {
    const subscription = DataStore.observe(ChatRoomUser).subscribe((msg) => {
      if (msg.model === ChatRoomUser && msg.opType === "INSERT") {
        fetchUser();
      }
    });
    return () => subscription.unsubscribe();
  }, []);

  // subscription for Message (when lastMessage is updated)
  useEffect(() => {
    const subscription = DataStore.observe(Message).subscribe((msg) => {
      if (
        msg.model === Message &&
        msg.opType === "INSERT" &&
        msg.element.chatroomID === chatRoom.id &&
        msg.element.forUserID === authUser?.id
      ) {
        setLastMessage(msg.element);
      }
    });
    return () => subscription.unsubscribe();
  }, []);

  const fetchAuthUser = async () => {
    const authUser = await Auth.currentAuthenticatedUser();
    const dbUser = await DataStore.query(User, authUser.attributes.sub);
    setAuthUser(dbUser);
  };

  const fetchUser = async () => {
    if (!authUser) {
      console.log("authUser isn't set");
      return;
    }
    const fetchedUsers = (await DataStore.query(ChatRoomUser))
      .filter((chatRoomUser) => chatRoomUser.chatRoom.id === chatRoom.id)
      .map((chatRoomUser) => chatRoomUser.user);

    if (fetchedUsers.length === 2) {
      const otherUser =
        fetchedUsers.find((user) => user.id !== authUser.id) || null;
      setOtherUser(otherUser);
    }
    setIsLoading(false);
  };

  const fetchLastMessage = async () => {
    if (!authUser) {
      // console.log("authUser isn't set");
      return;
    }

    const myID = authUser.id;
    const messages = await DataStore.query(
      Message,
      (message) => message.chatroomID("eq", chatRoom?.id).forUserID("eq", myID),
      {
        sort: (message) => message.createdAt(SortDirection.DESCENDING),
      }
    );
    setLastMessage(messages[0]); // newest message
  };

  const decryptMessage = async () => {
    if (!authUser) {
      console.log("authUser isn't set");
      return;
    }
    if (!lastMessage) {
      console.log("lastMessage isn't set");
      return;
    }

    const fromUser = await DataStore.query(User, lastMessage.userID);

    const myKey = await getMySecretKey(authUser.id);
    if (!myKey) {
      return;
    }

    const sharedKey = box.before(
      stringToUint8Array(fromUser?.publicKey),
      myKey
    );

    const decrypted = decrypt(sharedKey, lastMessage.content);
    setDecryptedContent(decrypted.message);
  };

  const onPress = async () => {
    navigation.navigate("ChatRoom", { id: chatRoom.id, userID: otherUser?.id });
  };

  const confirmDelete = () => {
    Alert.alert(
      "Confirm delete",
      "Are you sure you want to delete the Chatroom?",
      [
        {
          text: "Delete",
          onPress: deleteChatRoom,
          style: "destructive",
        },
        {
          text: "cancel",
        },
      ]
    );
  };

  const deleteChatRoom = async () => {
    await DataStore.delete(chatRoom);
    console.log("chatroom deleted");
  };

  if (isLoading) {
    return <ActivityIndicator />;
  }

  const time = moment(lastMessage?.createdAt).from(moment());

  return (
    <Pressable
      onPress={onPress}
      onLongPress={confirmDelete}
      style={styles.container}
    >
      {chatRoom && (
        <Image
          source={{
            uri: chatRoom.imageUri || otherUser?.imageUri || undefined,
          }}
          style={styles.image}
        />
      )}

      {!!chatRoom.newMessages && (
        <View style={styles.badgeContainer}>
          <Text style={styles.badgeText}>{chatRoom.newMessages}</Text>
        </View>
      )}

      <View style={styles.rightContainer}>
        <View style={styles.row}>
          {chatRoom && (
            <Text style={styles.name}>
              {chatRoom.name || otherUser?.name || "알수없음"}
            </Text>
          )}
          <Text style={styles.text}>{time}</Text>
        </View>
        <Text numberOfLines={1} style={styles.text}>
          {decryptedContent}
        </Text>
      </View>
    </Pressable>
  );
}
