import {
  View,
  ImageBackground,
  StyleSheet,
  SafeAreaView,
  Image,
  Text,
} from "react-native";
import React, { useState } from "react";
import background_image from "../../assets/images/Game/scene.jpg";
import { ScreenSize } from "../../constants/size";
import Bird from "../Bird/Bird";
import Obstacle from "../Obstacle/Obstacle";
import { useSharedValue } from "react-native-reanimated";
import ScoreBoard from "../ScoreBoard/ScoreBoard";


const GameArea = () => {
  const [score, setScore] = useState(0);
  const hasCollided = useSharedValue(false);
  const obstaclePosition = useSharedValue({});

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
      <Obstacle position={{ x: 500, y: 100 }} />
      {/* <ScoreBoard /> */}
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
  scoreContainer: {
    position: "absolute",
    top: 20,
    left: 20,
  },
  scoreText: {
    fontSize: 24,
    color: "white",
  },
});

export default GameArea;