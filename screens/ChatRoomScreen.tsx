import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import Message from "../components/Message";
import ChatsData from "../assets/dummy-data/Chats";

export default function ChatRoomScreen() {
  return (
    <View style={styles.page}>
      <FlatList
        data={ChatsData.messages}
        renderItem={({ item }) => <Message message={item} />}
        inverted
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
