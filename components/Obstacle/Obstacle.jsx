import { View, Image, StyleSheet } from "react-native";
import React from "react";
import { useAnimatedReaction,useSharedValue,useAnimatedStyle } from "react-native-reanimated";

const Obstacle = ({ position, thickness, level, hasCollided }) => {
  const collisionReactionAngle=useSharedValue('0deg')
  // observe collision action boolean
  useAnimatedReaction(
    () => hasCollided.value,
    (curr, prev) => {
      console.log(curr, prev);
    }
  );
  console.log(hasCollided.value);
  const animatedStyles=useAnimatedStyle(()=>({
      transform:[
        {
          rotateZ:collisionReactionAngle.value
        }
      ]
  }))
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
      onLayout={(event) => {
        console.log(event.nativeEvent);
      }}
    >
      {[...Array(4).keys()].map((item) => {
        return (
          <View key={item} style={{ flexDirection: "row" }}>
            {[...Array(item).keys()].map((subItem) => (
              <View
                key={subItem}
                style={[{ height: 50, width: 50, backgroundColor: "green" },animatedStyles]}
              >
                <Image
                  resizeMode="cover"
                  source={require("../../assets/images/Game/obstacle.png")}
                  style={[{ height: "100%", width: "100%", flex: 1 }]}
                />
              </View>
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
