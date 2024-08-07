import { View, Text } from "react-native";
import React from "react";
import GameArea from "../components/GameArea/GameArea";
import { SafeAreaView } from "react-native-safe-area-context";
import LoadingScreen from ".";

const Index = () => {
  return (
    <View style={{ flex: 1 }}>
      <GameArea />
      
    </View>
  );
};

export default Index;
