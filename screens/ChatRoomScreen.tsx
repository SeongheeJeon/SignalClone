import React from "react";
import { FlatList, StyleSheet, View, SafeAreaView } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/core";
import Message from "../components/Message";
import ChatsData from "../assets/dummy-data/Chats";
import MessageInput from "../components/MessageInput";

export default function ChatRoomScreen() {
  const route = useRoute();
  const navigation = useNavigation();

  console.warn("displaying chat room : ", route.params?.id);

  navigation.setOptions({ title: route.params?.name });

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
