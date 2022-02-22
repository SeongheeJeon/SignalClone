import React, { useEffect, useState } from "react";
import { View, Image, Text, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Auth, DataStore, Hub } from "aws-amplify";
import { User } from "../src/models";

import { Feather } from "@expo/vector-icons";

function HomeHeader() {
  const navigation = useNavigation();

  const [user, setUser] = useState<User | undefined>();

  // fetch user when 'syncQueriesReady'
  useEffect(() => {
    const listener = Hub.listen("datastore", async (hubData) => {
      const { event } = hubData.payload;
      if (event === "syncQueriesReady") {
        fetchUser();
      }
    });
    return () => listener();
  }, []);

  // fetch user when 'syncQueriesReady' has already done and component is mounted.
  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    if (user) {
      return;
    }
    const authUser = await Auth.currentAuthenticatedUser();
    const dbUser = await DataStore.query(User, authUser.attributes.sub);
    setUser(dbUser);
  };

  return (
    <View
      style={{
        flexDirection: "row",
        marginRight: 30,
        alignItems: "center",
      }}
    >
      <Image
        source={{
          uri: user?.imageUri,
        }}
        style={{ width: 30, height: 30, borderRadius: 30 }}
      />

      <Text
        style={{
          flex: 1,
          textAlign: "center",
          marginLeft: 50,
          fontWeight: "bold",
          fontSize: 16,
        }}
      >
        Signal
      </Text>

      <Pressable onPress={() => navigation.navigate("Settings")}>
        <Feather
          name="settings"
          size={24}
          color="black"
          style={{ marginHorizontal: 10 }}
        />
      </Pressable>

      <Pressable onPress={() => navigation.navigate("UsersScreen")}>
        <Feather
          name="edit-2"
          size={24}
          color="black"
          style={{ marginHorizontal: 10 }}
        />
      </Pressable>
    </View>
  );
}

export default HomeHeader;
