import React, { useState, useCallback, useEffect } from "react";
import { View, Image, StyleSheet, Text } from "react-native";
import background_image from "../../assets/images/Game/scene.jpg";

import Obstacle from "../Obstacle/Obstacle";
import { isColliding } from "../../utils/collisionDetection";
import BirdTest from "../Bird/BirdLife";

const GameArea = () => {
  const [birdPosition, setBirdPosition] = useState({
    x: 0,
    y: 0,
    width: 40,
    height: 40,
  });
  const [score, setScore] = useState(0);

  const handleBirdPositionChange = useCallback((position) => {
    if (position && typeof position === "object") {
      console.log("Bird position changed:", position); // Debugging log
      setBirdPosition(position);
    }
  }, []);

  const checkCollisions = () => {
    const obstacles = [
      { x: 400, y: 300, width: 50, height: 50 },
      { x: 400, y: 300 - 50, width: 50, height: 50 },
      { x: 400, y: 300 - 100, width: 50, height: 50 },
      { x: 400, y: 300 - 150, width: 50, height: 50 },
    ];

    // console.log("Checking collisions..."); // Debugging log

    for (const obstacle of obstacles) {
      const collisionDetected = isColliding(birdPosition, obstacle);
      //   console.log(
      //     `Checking collision with obstacle at (${obstacle.x}, ${obstacle.y})`,
      //     { birdPosition, collisionDetected }
      //   ); // Debugging log

      if (collisionDetected) {
        console.log("Collision detected!"); // Debugging log
        setScore((prevScore) => prevScore + 10);
        break;
      }
    }
  };

  useEffect(() => {
    const interval = setInterval(checkCollisions, 100);
    return () => clearInterval(interval);
  }, [birdPosition]);

  return (
    <View style={styles.container}>
      <Image source={background_image} style={styles.backgroundImage} />
      <BirdTest onPositionChange={handleBirdPositionChange} />
      <Obstacle position={{ x: 400, y: 300 }} />
      <Obstacle position={{ x: 400, y: 300 - 50 }} />
      <Obstacle position={{ x: 400, y: 300 - 100 }} />
      <Obstacle position={{ x: 400, y: 300 - 150 }} />
      <View style={styles.scoreContainer}>
        <Text style={styles.scoreText}>Score: {score}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative", // Ensure that children with position absolute are positioned relative to this
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
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
