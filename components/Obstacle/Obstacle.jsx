import { View, Image, StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withSequence } from 'react-native-reanimated';

const Obstacle = ({ position, crashed }) => {
  const crashOffsetY = useSharedValue(0);
  const crashOffsetX = useSharedValue(0);
  const crashRotation = useSharedValue(0);

  useEffect(() => {
    if (crashed) {
      crashOffsetY.value = withSequence(
        withTiming(100, { duration: 200 }),
        withTiming(0, { duration: 300 })
      );
      crashOffsetX.value = withSequence(
        withTiming(50, { duration: 200 }),
        withTiming(0, { duration: 300 })
      );
      crashRotation.value = withSequence(
        withTiming(15, { duration: 100 }),
        withTiming(-15, { duration: 100 }),
        withTiming(15, { duration: 100 }),
        withTiming(-15, { duration: 100 }),
        withTiming(0, { duration: 100 })
      );
    }
  }, [crashed, crashOffsetX, crashOffsetY, crashRotation]);

  const crashStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: crashOffsetY.value },
      { translateX: crashOffsetX.value },
      { rotate: `${crashRotation.value}deg` }
    ],
  }));

  return (
    <Animated.View style={[styles.container, { left: position.x, top: position.y }, crashStyle]}>
      <Image
        source={require('../../assets/images/Game/obstacle.png')}
        style={styles.image}
      />
    </Animated.View>
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
