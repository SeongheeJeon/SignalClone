import React, { useState, useEffect } from "react";

import { StyleSheet, View, FlatList } from "react-native";
import { Auth } from "aws-amplify";
import { DataStore, Predicates } from "@aws-amplify/datastore";
import { ChatRoom, ChatRoomUser } from "../src/models";

import ChatRoomItem from "../components/ChatRoomItem";

export default function HomeScreen() {
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);

  useEffect(() => {
    const fetchChatRooms = async () => {
      const userData = await Auth.currentAuthenticatedUser();
      // await DataStore.delete(ChatRoom, Predicates.ALL);

      const chatRoomUsers = await DataStore.query(ChatRoomUser);

      if (chatRoomUsers.length > 0) {
        const dbChatRooms = chatRoomUsers
          .filter(
            (chatRoomUser) => chatRoomUser.user.id === userData.attributes.sub
          )
          .map((chatRoomUser) => chatRoomUser.chatRoom);
        setChatRooms(dbChatRooms);
      }

      // console.log(chatRooms);
    };
    fetchChatRooms();
  }, []);

  return (
    <View style={styles.page}>
      {chatRooms && (
        <FlatList
          data={chatRooms}
          renderItem={({ item }) => <ChatRoomItem chatRoom={item} />}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  page: {
    backgroundColor: "white",
    flex: 1,
  },
});
