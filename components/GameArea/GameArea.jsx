import { View, ImageBackground, StyleSheet, SafeAreaView } from "react-native";
import React, { useState, useCallback } from "react";
import background_image from "../../assets/images/Game/scene.jpg";
import Bird from "../Bird/Bird";
import Obstacle from "../Obstacle/Obstacle";
import Scoreboard from "../ScoreBoard/ScoreBoard";

const initialObstacles = [
  { position: { x: 550, y: 160 }, crashed: false, score: 5 }, // Topmost obstacle
  { position: { x: 550, y: 200 }, crashed: false, score: 10 }, // Middle obstacle
  { position: { x: 550, y: 240 }, crashed: false, score: 15 }, // Bottom obstacle
  // Add more obstacles with different positions and scores as needed
];

const GameArea = () => {
  const [obstacles, setObstacles] = useState(initialObstacles);
  const [score, setScore] = useState(0);

  const handleCollision = useCallback((birdX, birdY) => {
    setObstacles((prevObstacles) =>
      prevObstacles.map((obs) => {
        if (
          !obs.crashed &&
          birdX >= obs.position.x - 35 &&
          birdX <= obs.position.x + 35 &&
          birdY >= obs.position.y - 35 &&
          birdY <= obs.position.y + 35
        ) {
          setScore((prevScore) => prevScore + obs.score);
          return { ...obs, crashed: true };
        }
        return obs;
      })
    );
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={background_image} style={styles.backgroundImage}>
        {obstacles.map((obs, index) => (
          <Obstacle key={index} position={obs.position} crashed={obs.crashed} />
        ))}
        <View style={styles.birdContainer}>
          <Bird 
            onCollision={handleCollision} 
            obstaclePosition={obstacles[0]?.position || { x: 0, y: 0 }}
          />
        </View>
        <Scoreboard score={score} />
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
    zIndex: 1,
  },
});

export default GameArea;
