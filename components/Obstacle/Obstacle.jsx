import { View, Image, StyleSheet } from "react-native";
import React from "react";

const Obstacle = ({ position, thickness, level, hasCollided }) => {
  return (
    <View
      style={[styles.container, { alignItems: "center",left:position.x,top:position.y ,gap:10}]}
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
                style={{ height: 50, width: 50, backgroundColor: "green" }}
              >
                <Image
                  resizeMode="cover"
                  source={require("../../assets/images/Game/obstacle.png")}
                  style={[{ height: "100%", width: "100%", flex: 1, }]}
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
