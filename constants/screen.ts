import { Dimensions } from "react-native";

const Screen: {
  width: number;
  height: number;
} = {
  width: Dimensions.get("screen").width,
  height: Dimensions.get("screen").height,
};

export default Screen;