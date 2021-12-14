import React, { useEffect, useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { Audio, AVPlaybackStatus } from "expo-av";

const AudioPlayer = ({ soundURI }) => {
  const [paused, setPaused] = useState(true);
  const [audioProgress, setAudioProgress] = useState(0);
  const [audioDuration, setAudioDuration] = useState(0);
  const [sound, setSound] = useState<Audio.Sound | null>(null);

  useEffect(() => {
    const loadSound = async () => {
      if (!soundURI) {
        return;
      }
      const { sound } = await Audio.Sound.createAsync(
        { uri: soundURI },
        {},
        onPlaybackStatusUpdate
      );
      setSound(sound);
    };
    loadSound();
    () => {
      // unload sound when this component unmounted
      if (sound) {
        sound.unloadAsync();
        console.log("sound unloaded");
      }
    };
  }, [soundURI]);

  const onPlaybackStatusUpdate = (status: AVPlaybackStatus) => {
    // console.log(status);
    if (!status.isLoaded) {
      return;
    }
    setAudioProgress(status.positionMillis / (status.durationMillis || 1));
    setPaused(!status.isPlaying);
    setAudioDuration(status.durationMillis || 0);
  };

  const playPauseSound = async () => {
    if (!sound) {
      return;
    }
    if (paused) {
      await sound.playFromPositionAsync(0);
    } else {
      await sound.pauseAsync();
    }
  };

  const getDuration = () => {
    const minutes = Math.floor(audioDuration / (60 * 1000));
    const seconds = Math.floor((audioDuration % (60 * 1000)) / 1000);

    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <View style={styles.sendAudioContainer}>
      <Pressable onPressOut={playPauseSound}>
        <Feather name={paused ? "play" : "pause"} size={24} color="grey" />
      </Pressable>

      <View style={styles.audioProgressBG}>
        <View
          style={[styles.audioProgressFG, { left: `${audioProgress * 100}%` }]}
        />
      </View>
      <Text>{getDuration()}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  sendAudioContainer: {
    flexDirection: "row",
    marginVertical: 10,
    padding: 10,
    alignItems: "center",
    alignSelf: "stretch",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 10,
  },
  audioProgressBG: {
    height: 3,
    flex: 1,
    backgroundColor: "grey",
    borderRadius: 5,
    margin: 10,
  },
  audioProgressFG: {
    width: 10,
    height: 10,
    borderRadius: 10,
    backgroundColor: "#3777f0",

    position: "absolute",
    top: -3,
  },
});

export default AudioPlayer;
