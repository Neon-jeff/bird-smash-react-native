import React from "react";
import { View, Text, StyleSheet } from "react-native";

const ScoreBoard = ({ score, highScore }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Scoreboard</Text>
      <View style={styles.scoresContainer}>
        <View style={styles.scoreBox}>
          <Text style={styles.label}>Score</Text>
          <Text style={styles.score}>{score}</Text>
        </View>
        <View style={styles.scoreBox}>
          <Text style={styles.label}>High Score</Text>
          <Text style={styles.score}>{highScore}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#ffde00',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    alignItems: 'center',
    width: '90%',
    marginTop: 50,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#d22828',
    marginBottom: 20,
  },
  scoresContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  scoreBox: {
    width: '45%',
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 3,
  },
  label: {
    fontSize: 20,
    fontWeight: '600',
    color: '#d22828',
    marginBottom: 5,
  },
  score: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
});

export default ScoreBoard;
