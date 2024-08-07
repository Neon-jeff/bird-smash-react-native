import { View, Image } from "react-native";
import React, { useEffect } from "react";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  withSequence,
  runOnJS,
  withSpring,
} from "react-native-reanimated";

const Bird = ({ onCollision, obstaclePosition }) => {
  const offsetX = useSharedValue(50); // Starting X position
  const offsetY = useSharedValue(100); // Starting Y position

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [
      { translateX: offsetX.value }, // Apply X-axis translation
      { translateY: offsetY.value }, // Apply Y-axis translation
    ],
    zIndex: 2, // Ensure the bird is rendered on top
  }));

  const gesture = Gesture.Pan()
    .onBegin(() => {
      // Optionally initialize or reset values here if needed
    })
    .onUpdate((event) => {
      // Update positions with current translation values (for visual feedback)
      offsetX.value = 50 + event.translationX;
      offsetY.value = 100 + event.translationY;
    })
    .onEnd((event) => {
      // Calculate the distance and velocity of the swipe
      const swipeDistance = Math.sqrt(
        event.translationX ** 2 + event.translationY ** 2
      );

      const peakHeight = swipeDistance * 0.5; // Height of the peak
      const forwardDistance = swipeDistance * 1.5; // Forward distance

      // Create a smooth, parabolic trajectory
      offsetX.value = withSequence(
        withTiming(50 + forwardDistance, {
          duration: 1000, // Time to move forward
        }),
        withTiming(50 + forwardDistance * 2, {
          duration: 800, // Continue moving forward
        }),
        withTiming(50, {
          duration: 800, // Return to starting point
        })
      );

      offsetY.value = withSequence(
        withTiming(100 - peakHeight, {
          duration: 1000, // Time to reach the peak
          easing: (t) => t * (2 - t), // Easing function for smooth ascent
        }),
        withTiming(100, {
          duration: 1000, // Time to return to starting point
          easing: (t) => t * (2 - t), // Easing function for smooth descent
        })
      );
    });

  useEffect(() => {
    const interval = setInterval(() => {
      runOnJS(onCollision)(offsetX.value, offsetY.value);
    }, 100);
    return () => clearInterval(interval);
  }, [offsetX, offsetY, onCollision]);

  useEffect(() => {
    // Check for collision with the obstacle
    const checkCollision = () => {
      if (
        Math.abs(offsetX.value - (obstaclePosition.x - 50)) < 20 &&
        Math.abs(offsetY.value - (obstaclePosition.y - 50)) < 20
      ) {
        // Handle collision
        offsetX.value = withTiming(offsetX.value + 50, { duration: 200 });
        offsetY.value = withTiming(offsetY.value + 50, { duration: 200 });
        runOnJS(onCollision)(offsetX.value, offsetY.value);
      }
    };
    const interval = setInterval(checkCollision, 50);
    return () => clearInterval(interval);
  }, [obstaclePosition, offsetX, offsetY, onCollision]);

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View
        style={[
          { alignSelf: "flex-end", paddingBottom: 120, paddingLeft: 50 },
          animatedStyles,
        ]}
      >
        <Image
          source={require("../../assets/images/Game/bird.png")}
          style={{ height: 40, width: 40, resizeMode: "contain" }}
        />
      </Animated.View>
    </GestureDetector>
  );
};

export default Bird;
