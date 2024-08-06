import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { Slot } from "expo-router";
import * as Orientation from "expo-screen-orientation";
import * as NavigationBar from "expo-navigation-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as Updates from "expo-updates";
const RootLayout = () => {
  useEffect(() => {
    onFetchUpdateAsync();
    SwitchScreenToLandscape();
    HideNavigationBar();
  }, []);

  //   change screen orientation to landscape
  const SwitchScreenToLandscape = async () => {
    await Orientation.lockAsync(Orientation.OrientationLock.LANDSCAPE_RIGHT);
  };
  // hide navigation bar
  const HideNavigationBar = async () => {
    await NavigationBar.setVisibilityAsync("hidden");
    await NavigationBar.setBehaviorAsync("overlay-swipe");
  };

  // check for updates
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
      // You can also add an alert() to see the error message in case of an error when fetching updates.
      alert(`Error fetching latest Expo update: ${error}`);
    }
  }
  return (
    <GestureHandlerRootView>
      <Slot />
    </GestureHandlerRootView>
  );
};

export default RootLayout;
