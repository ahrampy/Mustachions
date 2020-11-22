import { Dimensions } from "react-native";

const SCREEN: {
  width: number;
  height: number;
} = {
  width: Dimensions.get("screen").width,
  height: Dimensions.get("screen").height,
};

export default SCREEN;