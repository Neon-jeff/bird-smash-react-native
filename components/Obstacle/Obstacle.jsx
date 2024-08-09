import { View, Image, StyleSheet } from "react-native";
import React from "react";
import Animated, {
  useAnimatedReaction,
  useSharedValue,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from "react-native-reanimated";

const Obstacle = ({ position, thickness, level, hasCollided }) => {
  const collisionReactionAngle = useSharedValue("0deg");
  const collisionReactionFallDistance = useSharedValue(0);
  // observe collision action boolean
  const collided = useDerivedValue(() => {
    const updatedCollisionState = hasCollided.value;
    return updatedCollisionState;
  });
  useAnimatedReaction(
    () => collided.value,
    (curr) => {
      if (curr) {
        collisionReactionAngle.value = withTiming("360deg", { duration: 1000 });
        collisionReactionFallDistance.value = withTiming(100, {
          duration: 1000,
        });
      }
    }
  );

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [
      {
        rotateZ: collisionReactionAngle.value,
      },
      {
        translateY: collisionReactionFallDistance.value,
      },
    ],
  }));
  return (
    <View
      style={[
        styles.container,
        {
          alignItems: "center",
          left: position.value.x,
          top: position.value.y,
          gap: 10,
        },
      ]}
    >
      {[...Array(4).keys()].map((item) => {
        return (
          <View key={item} style={{ flexDirection: "row" }}>
            {[...Array(item).keys()].map((subItem) => (
              <Animated.View
                key={subItem}
                style={[{ height: 50, width: 50 }, animatedStyles]}
              >
                <Image
                  resizeMode="cover"
                  source={require("../../assets/images/Game/obstacle.png")}
                  style={[{ height: "100%", width: "100%", flex: 1 }]}
                />
              </Animated.View>
            ))}
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    position: "absolute",
  },
  image: {
    height: "100%",
    width: "100%",
  },
});

export default Obstacle;
