import { View, Text, Pressable, Alert } from "react-native";
import React from "react";
import { Auth, DataStore } from "aws-amplify";
import { generateKeyPair } from "../utils/crypto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { User as UserModel } from "../src/models";

const Settings = () => {
  const logOut = async () => {
    await DataStore.clear();
    Auth.signOut();
  };

  const updateKeyPair = async () => {
    // generate private/public key
    const { publicKey, secretKey } = generateKeyPair();

    // fetch authUser
    const userData = await Auth.currentAuthenticatedUser();
    const dbUser = await DataStore.query(UserModel, userData.attributes.sub);
    if (!dbUser) {
      Alert.alert("User not found!");
      return;
    }

    // save private key to Async storage
    await AsyncStorage.setItem(`PRIVATE_KEY${dbUser.id}`, secretKey.toString());
    const key = await AsyncStorage.getItem(`PRIVATE_KEY${dbUser.id}`);
    console.log("setting key, userid : ", dbUser.id);
    console.log("secret key was saved : ", key);

    // save public key to UserModel in DB
    await DataStore.save(
      UserModel.copyOf(dbUser, (updated) => {
        updated.publicKey = publicKey.toString();
      })
    );

    Alert.alert("successfully updated the keypair");
  };

  return (
    <View>
      <Pressable
        onPress={updateKeyPair}
        style={{
          backgroundColor: "white",
          height: 50,
          margin: 10,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text>Update keypair</Text>
      </Pressable>

      <Pressable
        onPress={logOut}
        style={{
          backgroundColor: "white",
          height: 50,
          margin: 10,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text>Logout</Text>
      </Pressable>
    </View>
  );
};

export default Settings;
