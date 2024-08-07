import { View, Text, Image } from "react-native";
import React from "react";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import Animated, {
  withSpring,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
  runOnJS,
} from "react-native-reanimated";

const Bird = () => {
  const offset = useSharedValue({
    x: 0,
    y: 0,
  });

  const start = useSharedValue({ x: 0, y: 0 });
  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateY: offset.value.y }, { translateX: offset.value.x }],
  }));
  const gesture = Gesture.Pan()
    .onBegin((event) => {})
    .onEnd((event) => {
      // tangent value for projection angle
      const tangent = event.translationY / event.translationX;
      const projectionAngle = Math.atan(tangent);
      console.log(projectionAngle, event.translationY, event.translationX);

      // set up threshold value for x
      let x_distance = Math.abs(event.translationX) * 4;

      offset.value = withSequence(
        withTiming(
          {
            x: x_distance / 2 + offset.value.x,
            y: -Math.abs(x_distance * Math.sin(projectionAngle)),
          },
          { duration: 1000 }
        ),
        withTiming(
          {
            x: x_distance,
            y: 0,
          },
          { duration: 1000 }
        )
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
