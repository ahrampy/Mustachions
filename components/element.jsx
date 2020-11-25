import React from "react";
import { Image, Pressable, View } from "react-native";
import SCREEN from "../constants/screen";

export default (props) => {
  let height = SCREEN.height * 0.95;
  let width = SCREEN.height * 1.125 * 0.95;
  let { name, press, sizeDiv, position, frame, src } = props;
  return (
    <Pressable
      style={{
        position: "absolute",
        top: height - height / position.top,
        left: width - width / position.left,
      }}
      onPressOut={() => alert(name)}
    >
      <View
        style={{
          position: "absolute",
          overflow: "hidden",
          height: height / sizeDiv,
          width: width / sizeDiv,
        }}
      >
        <Image
          style={{
            height: (height / sizeDiv) * 4,
            marginTop: -(height / sizeDiv) * frame,
          }}
          source={src}
        ></Image>
      </View>
    </Pressable>
  );
};
