import { View, Text, Image } from "react-native";
import React from "react";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  withSequence,
  runOnJS,
  useFrameCallback,
  cancelAnimation,
  useAnimatedRef,
  measure,
} from "react-native-reanimated";
import { ScreenSize } from "../../constants/size";

const Bird = ({ impact }) => {
  const BirdRef = useAnimatedRef();
  const offsetX = useSharedValue(0); // Shared value for X-axis
  const offsetY = useSharedValue(0); // Shared value for Y-axis
  const projectTileRange = useSharedValue(0);

  const ProjectionAngle = useSharedValue(0);
  const pressed = useSharedValue(false);
  const Velocity = useSharedValue({
    vx: 0,
    vy: 0,
  });

  // update object height and width in the animation
  useFrameCallback((frameInfo) => {
    const { timeSincePreviousFrame: dt, timeSinceFirstFrame: total_time } =
      frameInfo;
    const measurement = measure(BirdRef);
 
    
    if (dt == null || pressed.value == false) {
      return;
    }
    const total_distance = projectTileRange.value;

    if (offsetX.value >= total_distance) {
      console.log(measurement);
      
      pressed.value = false;
      offsetX.value = withTiming(0, { duration: 1000 });
      projectTileRange.value = 0;
      return;
    }
    offsetX.value += 5;
    offsetY.value =
      (1.5 * (offsetX.value ** 2 - total_distance * offsetX.value)) /
      projectTileRange.value;
  });

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
    // .onUpdate((event) => {
    //   // Update positions with current translation values (for visual feedback)
    //   offsetX.value = event.translationX;
    //   offsetY.value = event.translationY;
    // })
    .onEnd((event) => {
      // calculate projecton angle
      const maxRange = 0.8 * Math.max(ScreenSize.width, ScreenSize.height);
      projectTileRange.value = Math.abs(
        Math.round((event.translationX * 10) / 100) * 100
      );
      if (projectTileRange.value > maxRange) {
        projectTileRange.value = Math.round(maxRange / 100) * 100;
      }
      projectTileRange.value = Math.abs(projectTileRange.value);
      console.log(projectTileRange.value, maxRange);

      pressed.value = true;
    })
    .onFinalize((event) => {});

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View
        ref={BirdRef}
        style={[
          { alignSelf: "flex-end", marginBottom: 20, marginLeft: 50 },
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
