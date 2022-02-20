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
import { DataStore, Predicates } from "@aws-amplify/datastore";
import { ChatRoomUser, User, Message, ChatRoom } from "../../src/models";
import moment from "moment";

import styles from "./styles";

export default function ChatRoomItem({ chatRoom }) {
  // const [users, setUsers] = useState<User[]>([]); // all users in this chatroom
  const [user, setUser] = useState<User | null>(null);
  const [lastMessage, setLastMessage] = useState<Message | undefined>();
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const subscription = DataStore.observe(ChatRoomUser).subscribe((msg) => {
      if (msg.model === ChatRoomUser && msg.opType === "INSERT") {
        fetchUsers();
      }
    });
    return () => subscription.unsubscribe();
  }, []);

  const fetchUsers = async () => {
    const fetchedUsers = (await DataStore.query(ChatRoomUser))
      .filter((chatRoomUser) => chatRoomUser.chatRoom.id === chatRoom.id)
      .map((chatRoomUser) => chatRoomUser.user);

    const authUser = await Auth.currentAuthenticatedUser();
    const otherUser =
      fetchedUsers.find((user) => user.id !== authUser.attributes.sub) || null;
    setUser(otherUser);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchLastMessage = async () => {
      const dbChatRoom = await DataStore.query(ChatRoom, chatRoom.id);

      // console.log(dbChatRoom);
      if (!dbChatRoom?.LastMessage) {
        return;
      }

      setLastMessage(dbChatRoom.LastMessage);
      // DataStore.query(Message, chatRoom.chatRoomLastMessageId).then(
      //   setLastMessage
      // );

      // console.log(chatRoom);
    };

    fetchLastMessage();
  }, []);

  const onPress = async () => {
    navigation.navigate("ChatRoom", { id: chatRoom.id, name: user.name });
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
      {user && (
        <Image
          source={{
            uri: chatRoom.imageUri || user.imageUri,
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
          {user && (
            <Text style={styles.name}>{chatRoom.name || user.name}</Text>
          )}
          <Text style={styles.text}>{time}</Text>
        </View>
        <Text numberOfLines={1} style={styles.text}>
          {lastMessage?.content}
        </Text>
      </View>
    </Pressable>
  );
}
