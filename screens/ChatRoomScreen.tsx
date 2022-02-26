import React, { useState, useEffect } from "react";
import {
  FlatList,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { useRoute } from "@react-navigation/core";
import { DataStore, SortDirection } from "@aws-amplify/datastore";
import {
  ChatRoom,
  ChatRoomUser,
  Message as MessageModel,
  User,
} from "../src/models";
import Message from "../components/Message";
import MessageInput from "../components/MessageInput";
import { Auth } from "aws-amplify";
import { box } from "tweetnacl";
import { getMySecretKey, stringToUint8Array } from "../utils/crypto";

export default function ChatRoomScreen() {
  const [authUser, setAuthUser] = useState<User | undefined>();
  const [chatRoom, setChatRoom] = useState<ChatRoom | null>(null);
  const [allUsers, setAllUsers] = useState<User[] | undefined>();
  const [messages, setMessages] = useState<MessageModel[]>([]);
  const [messageReplyTo, setMessageReplyTo] = useState<MessageModel | null>(
    null
  );
  const [sharedKeys, setSharedKeys] = useState<Object | undefined>();

  const route = useRoute();

  useEffect(() => {
    fetchAuthUser();
  }, []);

  useEffect(() => {
    route.params?.id && fetchChatRoom();
  }, [route.params?.id]);

  useEffect(() => {
    chatRoom && fetchAllUsers();
  }, [chatRoom]);

  useEffect(() => {
    authUser && allUsers && fetchSharedKeys();
  }, [authUser, allUsers]);

  useEffect(() => {
    chatRoom && authUser && fetchMessages();
  }, [chatRoom, authUser]);

  // subscripion for Message
  useEffect(() => {
    if (!authUser) {
      return;
    }
    const subscription = DataStore.observe(MessageModel).subscribe((msg) => {
      if (msg.model === MessageModel && msg.opType === "INSERT") {
        // console.log("forUserID : ", msg.element.forUserID);
        // console.log("userID : ", userID);

        if (msg.element.forUserID === authUser.id) {
          // console.log("set message");
          setMessages((existingMessage) => [msg.element, ...existingMessage]);
        }
      }
    });
    return () => subscription.unsubscribe();
  }, [authUser]);

  const fetchAuthUser = async () => {
    const authUser = await Auth.currentAuthenticatedUser();
    const dbUser = await DataStore.query(User, authUser.attributes.sub);
    setAuthUser(dbUser);
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

  const fetchAllUsers = async () => {
    if (!chatRoom) {
      console.log("chatRoom isn't set");
      return;
    }

    const fetchedUsers = (await DataStore.query(ChatRoomUser))
      .filter((chatRoomUser) => chatRoomUser.chatRoom.id === chatRoom.id)
      .map((chatRoomUser) => chatRoomUser.user);
    setAllUsers(fetchedUsers);
  };

  const fetchSharedKeys = async () => {
    if (!authUser || !allUsers) {
      console.log("authUser or allUsers isn't set");
      return;
    }

    const myKey = await getMySecretKey(authUser.id);
    if (!myKey) {
      console.log("no myKey");
      return;
    }

    allUsers.map((user) => {
      const sharedKey = box.before(stringToUint8Array(user.publicKey), myKey);
      setSharedKeys((prev) => {
        return { ...prev, [user.id]: sharedKey };
      });
    });
  };

  const fetchMessages = async () => {
    if (!chatRoom || !authUser) {
      console.log("no chatRoom or authUser");
      return;
    }

    const fetchedMessages = await DataStore.query(
      MessageModel,
      (message) =>
        message.chatroomID("eq", chatRoom.id).forUserID("eq", authUser.id),
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
            sharedKeys={sharedKeys}
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
