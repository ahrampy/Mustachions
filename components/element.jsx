import React from "react";
import { Image, Pressable, View } from "react-native";
import SCREEN from "../constants/screen";

export default function Element(props) {
  const { name, press, sizeDiv, position, tiles, frame, range, src } = props,
    height = SCREEN.height,
    width = SCREEN.height;
  const margin =
    frame > range.min && frame < range.max
      ? -(height / sizeDiv) * (frame % tiles)
      : 0;
  return (
    <Pressable
      style={{
        position: "absolute",
        top: height - height / position.top,
        left: width - width / position.left,
      }}
      onPressOut={press}
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
            height: (height / sizeDiv) * tiles,
            marginTop: margin,
          }}
          source={src}
        ></Image>
      </View>
    </Pressable>
  );
}
