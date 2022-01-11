import React, { useState, useEffect } from "react";
import { Image, View, Text, Pressable, ActivityIndicator } from "react-native";
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

  useEffect(() => {
    const fetchUsers = async () => {
      const fetchedUsers = (await DataStore.query(ChatRoomUser))
        .filter((chatRoomUser) => chatRoomUser.chatRoom.id === chatRoom.id)
        .map((chatRoomUser) => chatRoomUser.user);

      // setUsers(fetchedUsers);

      const authUser = await Auth.currentAuthenticatedUser();
      const otherUser =
        fetchedUsers.find((user) => user.id !== authUser.attributes.sub) ||
        null;
      setUser(otherUser);
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchLastMessage = async () => {
      const dbChatRoom = await DataStore.query(ChatRoom, chatRoom.id);

      // console.log(dbChatRoom);
      if (!dbChatRoom?.LastMessage) {
        // console.log("no LastMessage");
        // console.log(chatRoom);
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
    // console.log("clicked");
    // await DataStore.delete(ChatRoom, Predicates.ALL);

    navigation.navigate("ChatRoom", { id: chatRoom.id, name: user.name });
  };

  if (!user) {
    return <ActivityIndicator />;
  }

  const time = moment(lastMessage?.createdAt).from(moment());

  return (
    <Pressable onPress={onPress} style={styles.container}>
      <Image
        source={{
          uri: chatRoom.imageUri || user.imageUri,
        }}
        style={styles.image}
      />

      {!!chatRoom.newMessages && (
        <View style={styles.badgeContainer}>
          <Text style={styles.badgeText}>{chatRoom.newMessages}</Text>
        </View>
      )}

      <View style={styles.rightContainer}>
        <View style={styles.row}>
          <Text style={styles.name}>{chatRoom.name || user.name}</Text>
          <Text style={styles.text}>{time}</Text>
        </View>
        <Text numberOfLines={1} style={styles.text}>
          {lastMessage?.content}
        </Text>
      </View>
    </Pressable>
  );
}
