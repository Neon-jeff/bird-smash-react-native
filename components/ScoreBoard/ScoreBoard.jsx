import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";

const ScoreBoard = () => {
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  // useEffect(() => {
  //   async function getScores() {
  //     const scores = await fetchScores();
  //     setScore(scores.score);
  //     setHighScore(scores.highScore);
  //   }
  //   getScores();
  // }, []);

  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>Scoreboard</Text> */}
      <View style={styles.scoresContainer}>
        <View style={styles.scoreBox}>
          <Text style={styles.label}>Score : {score}</Text>
        </View>
        <View style={styles.scoreBox}>
          <Text style={styles.label}>High Score : {highScore}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderRadius: 10,
    shadowColor: "#ffffff",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 1,
    elevation: 5,
    alignItems: "center",
    right:20,
    position: "absolute",
    top: 0,
    zIndex: 1,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#d22828",
    marginBottom: 20,
  },
  scoresContainer: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    gap: 20,
  },
  scoreBox: {
    alignItems: "center",
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  label: {
    fontSize: 23,
    fontWeight: "800",
    color: "#ffffff",
    marginBottom: 5,
  },
  score: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#000",
  },
});

export default ScoreBoard;
