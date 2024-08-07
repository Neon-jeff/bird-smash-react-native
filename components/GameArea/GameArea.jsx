import { View, ImageBackground, StyleSheet, SafeAreaView } from "react-native";
import React, { useState } from "react";
import background_image from "../../assets/images/Game/scene.jpg";
import Bird from "../Bird/Bird";
import Obstacle from "../Obstacle/Obstacle";
import Scoreboard from "../ScoreBoard/ScoreBoard";

const obstacles = [
  { position: { x: 550, y: 160 } },
  { position: { x: 550, y: 200 } },
  { position: { x: 550, y: 240 } },
  // Add more obstacles with different positions as needed
];

const GameArea = () => {
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  // Example function to increase score (this could be tied to game logic)
  const increaseScore = () => {
    setScore(score + 10);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={background_image} style={styles.backgroundImage}>
        <View style={styles.birdContainer}>
          <Bird />
        </View>
        {obstacles.map((obs, index) => (
          <Obstacle key={index} position={obs.position} />
        ))}
        <Scoreboard score={score} highScore={highScore} />
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  birdContainer: {
    position: 'absolute',
    left: 50,
    bottom: 100,
  },
});

export default GameArea;
