import { View, Text, Pressable } from "react-native";
import React from "react";
import { Auth, DataStore } from "aws-amplify";
import { generateKeyPair } from "../utils/crypto";

const Settings = () => {
  const logOut = async () => {
    await DataStore.clear();
    Auth.signOut();
  };

  const updateKeyPair = async () => {
    // generate private/public key
    const { publicKey, secretKey } = generateKeyPair();
    console.log(publicKey, secretKey);
    // save private key to Async storage
    // save public key to UserModel in DB
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
