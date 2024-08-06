import { View, Text, Image } from "react-native";
import React from "react";
import background_image from "../../assets/images/Game/scene.jpg";
import { ScreenSize } from "../../constants/size";
import { scale } from "@shopify/react-native-skia";
import Bird from "../Bird/Bird";


const GameArea = () => {
  return (
    <View style={{ flex: 1, flexDirection: "row" }}>
      <Image
        source={background_image}
        style={{
          position: "absolute",
          height: ScreenSize.height,
          width: ScreenSize.width,
          resizeMode: "cover",
          left: 0,
        }}
      />
      <Bird />
      
    </View>
  );
};

export default GameArea;
