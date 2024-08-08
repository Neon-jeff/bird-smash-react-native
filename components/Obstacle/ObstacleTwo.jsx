import { View } from "react-native";
import React from "react";
import Animated from "react-native-reanimated";

const TargetTest = ({ position, size }) => {
  return (
    <Animated.View
      style={{
        position: "absolute",
        left: position.x,
        top: position.y,
        width: size.width,
        height: size.height,
        backgroundColor: "red",
      }}
    />
  );
};

export default TargetTest;
