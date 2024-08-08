import React, { useEffect, useRef } from "react";
import { View, Text, Alert } from "react-native";
import { Slot } from "expo-router";
import * as Orientation from "expo-screen-orientation";
import * as NavigationBar from "expo-navigation-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as Updates from "expo-updates";
import { Stack } from "expo-router";
import { Audio } from "expo-av"; // Oceeboi added this import

const RootLayout = () => {
  const sound = useRef(new Audio.Sound()); // Oceeboi added this ref

  useEffect(() => {
    const loadAndPlayMusic = async () => {
      try {
        await sound.current.loadAsync(
          require("../assets/audio/backgroundmusic.mp3"),
          {
            shouldPlay: true, // Automatically play when loaded
            isLooping: true, // Loop the music
          }
        );
      } catch (error) {
        console.error("Error loading sound", error);
      }
    };

    loadAndPlayMusic();

    // Clean up sound on component unmount
    return () => {
      sound.current.unloadAsync();
    };
  }, []); // Oceeboi added this useEffect

  useEffect(() => {
    onFetchUpdateAsync();
    SwitchScreenToLandscape();
    HideNavigationBar();
  }, []);

  const SwitchScreenToLandscape = async () => {
    await Orientation.lockAsync(Orientation.OrientationLock.LANDSCAPE_RIGHT);
  };

  const HideNavigationBar = async () => {
    await NavigationBar.setVisibilityAsync("hidden");
    await NavigationBar.setBehaviorAsync("overlay-swipe");
  };

  async function onFetchUpdateAsync() {
    try {
      const update = await Updates.checkForUpdateAsync();

      if (update.isAvailable) {
        Alert.alert(
          "Fetching Updates",
          "Downloading new update, reopen your app if it closes"
        );
        await Updates.fetchUpdateAsync();
        await Updates.reloadAsync();
      }
    } catch (error) {
      alert(`Error fetching latest Expo update: ${error}`);
    }
  }

  return (
    <GestureHandlerRootView>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="game" />
        <Stack.Screen name="index" />
      </Stack>
    </GestureHandlerRootView>
  );
};

export default RootLayout;
