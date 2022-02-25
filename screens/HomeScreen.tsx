import React, { useState, useEffect } from "react";

import { StyleSheet, View, FlatList } from "react-native";
import { Auth, Hub } from "aws-amplify";
import { DataStore, Predicates } from "@aws-amplify/datastore";
import { ChatRoom, ChatRoomUser } from "../src/models";

import ChatRoomItem from "../components/ChatRoomItem";

export default function HomeScreen() {
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
  const [isSynced, setIsSynced] = useState<boolean | null>(false);

  // listener if sync DONE
  useEffect(() => {
    const listener = Hub.listen("datastore", async (hubData) => {
      const { event } = hubData.payload;
      if (event === "syncQueriesReady") {
        setIsSynced(true);
        fetchChatRooms();
      }
    });

    return () => listener();
  }, []);

  useEffect(() => {
    fetchChatRooms();
  }, []);

  useEffect(() => {
    if (!chatRooms) {
      return;
    }
    const subscription = DataStore.observe(ChatRoom).subscribe((msg) => {
      if (msg.model === ChatRoom && msg.opType === "INSERT" && isSynced) {
        setChatRooms((prev) => [msg.element, ...prev]);
      } else if (msg.model === ChatRoom && msg.opType === "DELETE") {
        setChatRooms(
          chatRooms.filter((chatroom) => chatroom.id != msg.element.id)
        );
      }
    });
    return () => subscription.unsubscribe();
  }, [chatRooms]);

  const fetchChatRooms = async () => {
    const userData = await Auth.currentAuthenticatedUser();
    const chatRoomUsers = await DataStore.query(ChatRoomUser);

    if (chatRoomUsers.length > 0) {
      const dbChatRooms = chatRoomUsers
        .filter(
          (chatRoomUser) => chatRoomUser.user.id === userData.attributes.sub
        )
        .map((chatRoomUser) => chatRoomUser.chatRoom);
      setChatRooms(dbChatRooms);
    }
  };

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
