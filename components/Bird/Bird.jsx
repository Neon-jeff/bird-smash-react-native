import { View, Text, Image } from "react-native";
import React from "react";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  withSequence,
  runOnJS,
} from "react-native-reanimated";

const Bird = () => {
  const offsetX = useSharedValue(0); // Shared value for X-axis
  const offsetY = useSharedValue(0); // Shared value for Y-axis

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [
      { translateX: offsetX.value }, // Apply X-axis translation
      { translateY: offsetY.value }, // Apply Y-axis translation
    ],
  }));

  const gesture = Gesture.Pan()
    .onBegin((event) => {
      // Optionally initialize or reset values here if needed
    })
    .onUpdate((event) => {
      // Update positions with current translation values (for visual feedback)
      offsetX.value = event.translationX;
      offsetY.value = event.translationY;
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
        withTiming(forwardDistance, {
          duration: 1000, // Time to move forward
        }),
        withTiming(forwardDistance * 2, {
          duration: 800, // Continue moving forward
        }),
        withTiming(0, {
          duration: 800, // Return to starting point
        })
      );

      offsetY.value = withSequence(
        withTiming(-peakHeight, {
          duration: 1000, // Time to reach the peak
          easing: (t) => t * (2 - t), // Easing function for smooth ascent
        }),
        withTiming(0, {
          duration: 1000, // Time to return to starting point
          easing: (t) => t * (2 - t), // Easing function for smooth descent
        })
      );
    });

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View
        style={[
          { alignSelf: "flex-end", paddingBottom: 20, paddingLeft: 50 },
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
