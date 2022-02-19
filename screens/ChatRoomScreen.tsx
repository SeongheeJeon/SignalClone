import React, { useState, useEffect } from "react";
import {
  FlatList,
  StyleSheet,
  View,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/core";
import { DataStore, SortDirection } from "@aws-amplify/datastore";
import { ChatRoom, Message as MessageModel } from "../src/models";
import Message from "../components/Message";
import MessageInput from "../components/MessageInput";
import { Auth } from "aws-amplify";

export default function ChatRoomScreen() {
  const [chatRoom, setChatRoom] = useState<ChatRoom | null>(null);
  const [messages, setMessages] = useState<MessageModel[]>([]);
  const [messageReplyTo, setMessageReplyTo] = useState<MessageModel | null>(
    null
  );
  const [userID, setUserID] = useState<String>();

  const route = useRoute();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ title: route.params?.name });
  }, []);

  useEffect(() => {
    fetchUser();
    fetchChatRoom();
  }, []);

  useEffect(() => {
    fetchMessages();
  }, [chatRoom]);

  useEffect(() => {
    if (!userID) {
      return;
    }
    const subscription = DataStore.observe(MessageModel).subscribe((msg) => {
      if (msg.model === MessageModel && msg.opType === "INSERT") {
        // console.log("forUserID : ", msg.element.forUserID);
        // console.log("userID : ", userID);

        if (msg.element.forUserID === userID) {
          // console.log("set message");
          setMessages((existingMessage) => [msg.element, ...existingMessage]);
        }
      }
    });
    return () => subscription.unsubscribe();
  }, [userID]);

  const fetchUser = async () => {
    const fetchedUser = await Auth.currentAuthenticatedUser();
    setUserID(fetchedUser.attributes.sub);
  };

  const fetchChatRoom = async () => {
    if (!route.params?.id) {
      console.warn("No Chatroom id provided");
      return;
    }
    const fetchedChatRoom = await DataStore.query(ChatRoom, route.params.id);
    if (!fetchedChatRoom) {
      console.error("Couldn't find a chat room with this id");
    } else {
      setChatRoom(fetchedChatRoom);
    }
  };

  const fetchMessages = async () => {
    if (!chatRoom) {
      return;
    }

    const authUser = await Auth.currentAuthenticatedUser();
    const myID = authUser.attributes.sub;

    const fetchedMessages = await DataStore.query(
      MessageModel,
      (message) => message.chatroomID("eq", chatRoom?.id).forUserID("eq", myID),
      {
        sort: (message) => message.createdAt(SortDirection.DESCENDING),
      }
    );

    setMessages(fetchedMessages);
  };

  if (!chatRoom) {
    return <ActivityIndicator />;
  }

  return (
    <SafeAreaView style={styles.page}>
      <FlatList
        data={messages}
        renderItem={({ item }) => (
          <Message
            message={item}
            setAsMessageReply={() => setMessageReplyTo(item)}
          />
        )}
        inverted
      />
      <MessageInput
        chatRoom={chatRoom}
        messageReplyTo={messageReplyTo}
        removeMessageReplyTo={() => setMessageReplyTo(null)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: "white",
    flex: 1,
  },
});
