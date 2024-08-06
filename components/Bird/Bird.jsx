import { View, Text, Image } from "react-native";
import React from "react";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import Animated, {
  withSpring,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from "react-native-reanimated";

const Bird = () => {
  const offsetY = useSharedValue(0);
  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateY: offsetY.value }],
  }));
  const gesture = Gesture.Pan()
    .onBegin((event) => {})
    .onEnd((event) => {
      offsetY.value = withSequence(
        withTiming(event.translationY, { duration: 1000 }),
        withTiming(0, { duration: 1000 })
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
