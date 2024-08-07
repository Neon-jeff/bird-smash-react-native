import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Scoreboard = ({ score }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.scoreText}>Score: {score}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
    borderRadius: 5,
  },
  scoreText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Scoreboard;
