import React from "react";
import { FlatList, StyleSheet, View, SafeAreaView } from "react-native";
import Message from "../components/Message";
import ChatsData from "../assets/dummy-data/Chats";
import MessageInput from "../components/MessageInput";

export default function ChatRoomScreen() {
  return (
    <SafeAreaView style={styles.page}>
      <FlatList
        data={ChatsData.messages}
        renderItem={({ item }) => <Message message={item} />}
        inverted
      />
      <MessageInput />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: "white",
    flex: 1,
  },
});
