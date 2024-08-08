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
} from "react-native-reanimated";

const Bird = () => {
  // ANIMATION PERIOD IN MILLISECONDS
  const ANIMATION_PERIOD = 1000;
  // DAMPING FACTOR
  const DAMPINGFACTOR = 0.5;
  // Gravity
  const GRAVITY = 9.8;
  const offsetX = useSharedValue(0); // Shared value for X-axis
  const offsetY = useSharedValue(0); // Shared value for Y-axis

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

    if (dt == null || pressed.value == false) {
      return;
    }
    const total_distance = 400;
    if (offsetX.value >= total_distance) {
      pressed.value = false;
      return;
    }
    offsetX.value += 2;
    offsetY.value = (offsetX.value ** 2 - total_distance * offsetX.value) / 200;
    console.log(offsetX.value, offsetY.value);
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
      const _projectionAngle = Math.atan(
        event.translationY / event.translationX
      );
      ProjectionAngle.value = _projectionAngle;
      Velocity.value = {
        vx: event.velocityX,
        vy: event.velocityY,
      };
      pressed.value = true;

      // Calculate the distance and velocity of the swipe
      const swipeDistance = Math.sqrt(
        event.translationX ** 2 + event.translationY ** 2
      );

      const peakHeight = swipeDistance * 0.5; // Height of the peak
      const forwardDistance = swipeDistance * 1.5; // Forward distance

      // // Create a smooth, parabolic trajectory
      // offsetX.value = withSequence(
      //   withTiming(forwardDistance, {
      //     duration: 1000, // Time to move forward
      //   }),
      //   withTiming(forwardDistance * 2, {
      //     duration: 800, // Continue moving forward
      //   }),
      //   withTiming(0, {
      //     duration: 800, // Return to starting point
      //   })
      // );

      // offsetY.value = withSequence(
      //   withTiming(-peakHeight, {
      //     duration: 1000, // Time to reach the peak
      //     easing: (t) => t * (2 - t), // Easing function for smooth ascent
      //   }),
      //   withTiming(0, {
      //     duration: 1000, // Time to return to starting point
      //     easing: (t) => t * (2 - t), // Easing function for smooth descent
      //   })
      // );
    })
    .onFinalize((event) => {});

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
