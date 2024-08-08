import React, { useEffect } from "react";
import { View, Image } from "react-native";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  useFrameCallback,
} from "react-native-reanimated";

const BirdTest = ({ onPositionChange }) => {
  const offsetX = useSharedValue(0);
  const offsetY = useSharedValue(0);

  useFrameCallback(() => {
    if (onPositionChange && typeof onPositionChange === "function") {
      const position = {
        x: offsetX.value,
        y: offsetY.value,
        width: 40,
        height: 40,
      };
      console.log("Bird position in frame callback:", position); // Debugging log
      onPositionChange(position);
    }
  });

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateX: offsetX.value }, { translateY: offsetY.value }],
  }));

  const gesture = Gesture.Pan().onUpdate((event) => {
    offsetX.value = event.translationX;
    offsetY.value = event.translationY;
  });

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View
        style={[
          animatedStyles,
          { position: "absolute", bottom: 100, left: 50 },
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

export default BirdTest;
