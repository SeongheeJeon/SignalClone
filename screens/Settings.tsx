import { StyleSheet, View, Text, Pressable, Alert, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { Auth, DataStore } from "aws-amplify";
import { generateKeyPair } from "../utils/crypto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { User } from "../src/models";
import { FontAwesome } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

export default function Settings() {
  const [authUser, setAuthUser] = useState<User | undefined>();
  const [userImage, setUserImage] = useState<string | undefined>();

  // fetchAuthUser
  useEffect(() => {
    const fetchAuthUser = async () => {
      const userData = await Auth.currentAuthenticatedUser();
      const dbUser = await DataStore.query(User, userData.attributes.sub);
      setAuthUser(dbUser);
      setUserImage(dbUser?.imageUri);
    };
    fetchAuthUser();
  }, []);

  const logOut = async () => {
    await DataStore.clear();
    Auth.signOut();
  };

  const updateKeyPair = async () => {
    // generate private/public key
    const { publicKey, secretKey } = generateKeyPair();

    // fetch authUser
    if (!authUser) {
      Alert.alert("User not found!");
      return;
    }

    // save private key to Async storage
    await AsyncStorage.setItem(
      `PRIVATE_KEY${authUser.id}`,
      secretKey.toString()
    );
    const key = await AsyncStorage.getItem(`PRIVATE_KEY${authUser.id}`);
    console.log("setting key, userid : ", authUser.id);
    console.log("secret key was saved : ", key);

    // save public key to UserModel in DB
    await DataStore.save(
      User.copyOf(authUser, (updated) => {
        updated.publicKey = publicKey.toString();
      })
    );

    Alert.alert("successfully updated the keypair");
  };

  const editImage = async () => {
    if (!authUser) {
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      await DataStore.save(
        User.copyOf(authUser, (updated) => {
          updated.imageUri = result.uri;
        })
      );
      setUserImage(result.uri);
    }
  };

  return (
    <View style={styles.container}>
      {authUser && (
        <View style={styles.profileContainer}>
          <Image
            source={{
              uri: userImage,
            }}
            style={styles.image}
          />
          <Text style={{ fontWeight: "bold", fontSize: 18 }}>
            {authUser.name}
          </Text>
        </View>
      )}
      <View style={styles.buttonsContainer}>
        <Pressable
          onPress={editImage}
          style={({ pressed }) => [
            styles.button,
            pressed ? styles.buttonPressed : {},
          ]}
        >
          <FontAwesome name="user-circle" size={30} color="black" />
          <Text style={styles.text}>Edit Profile Image</Text>
        </Pressable>
        <Pressable
          onPress={updateKeyPair}
          style={({ pressed }) => [
            styles.button,
            pressed ? styles.buttonPressed : {},
          ]}
        >
          <FontAwesome name="key" size={30} color="black" />
          <Text style={styles.text}>Update keypair</Text>
        </Pressable>

        <Pressable
          onPress={logOut}
          style={({ pressed }) => [
            styles.button,
            pressed ? styles.buttonPressed : {},
          ]}
        >
          <FontAwesome name="sign-out" size={30} color="black" />
          <Text style={styles.text}>Logout</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    padding: 15,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 20,
  },
  image: {
    height: 60,
    width: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  buttonsContainer: {
    padding: 15,
  },
  button: {
    height: 50,
    margin: 10,
    flexDirection: "row",
    alignItems: "center",
    fontSize: 20,
  },
  buttonPressed: {
    opacity: 0.3,
  },
  text: {
    marginLeft: 10,
    fontSize: 16,
  },
});
