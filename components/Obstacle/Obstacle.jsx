import { View, Image, StyleSheet } from 'react-native';
import React from 'react';

const Obstacle = ({ position }) => {
  return (
    <View style={[styles.container, { left: position.x, top: position.y }]}>
      <Image
        source={require('../../assets/images/Game/obstacle.png')}
        style={styles.image}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
  },
  image: {
    height: 70,
    width: 70,
    resizeMode: 'contain',
  },
});

export default Obstacle;
