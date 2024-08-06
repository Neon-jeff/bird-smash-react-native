import { useWindowDimensions, Dimensions } from "react-native";

const { height, width } = Dimensions.get("screen");

export const ScreenSize = { height, width };

export { height, width };
