import React from "react";
import styles from "./styles";
import { Image, View, Text, Pressable } from "react-native";

import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import { Feather } from "@expo/vector-icons";
uuidv4();

export default function UserItem({ user, onPress, isSelected }) {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <Image
        source={{
          uri: user.imageUri,
        }}
        style={styles.image}
      />

      <View style={styles.rightContainer}>
        <View style={styles.row}>
          <Text style={styles.name}>{user.name}</Text>
        </View>
      </View>
      {isSelected !== undefined && (
        <Feather
          name={isSelected ? "check-circle" : "circle"}
          size={20}
          color="#4f4f4f"
        />
      )}
    </Pressable>
  );
}
