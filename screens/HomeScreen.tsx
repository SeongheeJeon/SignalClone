import React, { useState, useEffect } from "react";

import { StyleSheet, View, FlatList } from "react-native";
import { Auth } from "aws-amplify";
import { DataStore } from "@aws-amplify/datastore";
import { ChatRoom, ChatRoomUser } from "../src/models";

import ChatRoomItem from "../components/ChatRoomItem";

export default function HomeScreen() {
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);

  useEffect(() => {
    const fetchChatRooms = async () => {
      const userData = await Auth.currentAuthenticatedUser();

      const chatRooms = (await DataStore.query(ChatRoomUser))
        .filter(
          (chatRoomUser) => chatRoomUser.user.id === userData.attributes.sub
        )
        .map((chatRoomUser) => chatRoomUser.chatroom);

      setChatRooms(chatRooms);
      // console.log(chatRooms);
    };
    fetchChatRooms();
  }, []);

  return (
    <View style={styles.page}>
      <FlatList
        data={chatRooms}
        renderItem={({ item }) => <ChatRoomItem chatRoom={item} />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  page: {
    backgroundColor: "white",
    flex: 1,
  },
});
