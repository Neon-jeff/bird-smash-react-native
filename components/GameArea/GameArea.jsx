import {
  View,
  ImageBackground,
  StyleSheet,
  SafeAreaView,
  Image,
} from "react-native";
import React, { useState } from "react";
import background_image from "../../assets/images/Game/scene.jpg";
import { ScreenSize } from "../../constants/size";
import Bird from "../Bird/Bird";
import Obstacle from "../Obstacle/Obstacle";
const GameArea = () => {
  const [score, setScore] = useState(0);

  // Example function to increase score (this could be tied to game logic)
  const increaseScore = () => {
    setScore(score + 10);
  };

  return (
    <View style={{ flex: 1, flexDirection: "row" }}>
      <Image
        source={background_image}
        style={{
          position: "absolute",
          height: "100%",
          width: "100%",
          resizeMode: "cover",
          left: 0,
        }}
      />
      <Bird />
      <Obstacle position={{ x: 400, y: 300 }} />
      <Obstacle position={{ x: 400, y: 300-50 }} />
      <Obstacle position={{ x: 400, y: 300-100 }} />
      <Obstacle position={{ x: 400, y: 300-150 }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
  },
  birdContainer: {
    position: "absolute",
    left: 50,
    bottom: 100,
  },
});

export default GameArea;
