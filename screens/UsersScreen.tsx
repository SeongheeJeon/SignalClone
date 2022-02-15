import React, { useState, useEffect } from "react";

import {
  StyleSheet,
  View,
  FlatList,
  Pressable,
  Text,
  SafeAreaView,
} from "react-native";
import UserItem from "../components/UserItem";
import NewGroupButton from "../components/NewGroupButton";
import { useNavigation } from "@react-navigation/native";

import { ChatRoom, User, ChatRoomUser } from "../src/models";
import { Auth, DataStore } from "aws-amplify";

export default function UsersScreen() {
  const [otherUsers, setOtherUsers] = useState<User[]>([]);
  const [isNewGroup, setIsNewGroup] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);

  const navigation = useNavigation();

  useEffect(() => {
    const fetchUsers = async () => {
      const authUser = await Auth.currentAuthenticatedUser();
      const dbUser = await DataStore.query(User, authUser.attributes.sub);

      const fetchedUsers = (await DataStore.query(User)).filter(
        (u) => u.id !== dbUser?.id
      );
      setOtherUsers(fetchedUsers);
    };
    fetchUsers();
  }, []);

  const addUserToChatRoom = async (user, chatroom) => {
    DataStore.save(
      new ChatRoomUser({
        user,
        chatRoom: chatroom,
        chatRoomID: chatroom.id,
        userID: user.id,
      })
    );
  };

  const createChatRoom = async (users) => {
    //TODO : if there is already a chat room between these 2 users
    // then redirect to the existing chat room
    // otherwise, create a new chatroom whit these users.

    //connect authenticated user with the chat room
    const authUser = await Auth.currentAuthenticatedUser();
    const dbUser = await DataStore.query(User, authUser.attributes.sub);

    //Create a chat room
    const newChatRoomData = {
      newMessages: 0,
      Admin: dbUser,
      name: "",
      imageUri: "",
    };
    if (users.length > 1) {
      newChatRoomData.name = "New Group";
      newChatRoomData.imageUri =
        "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/group.jpeg";
    }
    const newChatRoom = await DataStore.save(new ChatRoom(newChatRoomData));

    // console.log("newChatRoom");
    // console.log(newChatRoom);
    if (dbUser) {
      addUserToChatRoom(dbUser, newChatRoom);
    }

    //connect users with the chat room
    await Promise.all(
      users.map((user) => addUserToChatRoom(user, newChatRoom))
    );

    navigation.navigate("ChatRoom", { id: newChatRoom.id });
  };

  const isUserSelected = (user) => {
    return selectedUsers.some((selectedUser) => selectedUser.id === user.id);
  };

  const onUserPress = async (user) => {
    if (isNewGroup) {
      if (isUserSelected(user)) {
        // remove it from selected
        setSelectedUsers(
          selectedUsers.filter((selectedUser) => selectedUser.id !== user.id)
        );
      } else {
        setSelectedUsers([...selectedUsers, user]);
      }
    } else {
      await createChatRoom([user]);
    }
  };

  const saveGroup = () => {
    createChatRoom(selectedUsers);
  };

  return (
    <SafeAreaView style={styles.page}>
      <FlatList
        data={otherUsers}
        renderItem={({ item }) => (
          <UserItem
            user={item}
            onPress={() => onUserPress(item)}
            isSelected={isNewGroup ? isUserSelected(item) : undefined}
          />
        )}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => (
          <NewGroupButton onPress={() => setIsNewGroup(!isNewGroup)} />
        )}
      />
      {isNewGroup && (
        <Pressable style={styles.button} onPress={saveGroup}>
          <Text style={styles.buttonText}>
            Save Group ({selectedUsers.length})
          </Text>
        </Pressable>
      )}
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  page: {
    backgroundColor: "white",
    flex: 1,
  },
  button: {
    backgroundColor: "#3777f0",
    marginHorizontal: 10,
    padding: 10,
    alignItems: "center",
    borderRadius: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
