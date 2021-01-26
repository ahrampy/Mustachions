import React from "react";
import { Image, Pressable, View } from "react-native";
import SCREEN from "../constants/screen";

export default function Element({
  name,
  press,
  size,
  position,
  tiles,
  frame,
  range,
  src,
}) {
  const height = SCREEN.height;
  const width = SCREEN.height * 1.125;
  const relHeight = size * height;
  const relWidth = size * width;
  let margin = 0;

  if (frame > range.min && frame < range.max) {
    margin = -relHeight * (frame % tiles);
  }
  return (
    <Pressable
      style={{
        position: "absolute",
        top: `${position.top}%`,
        left: `${position.left}%`,
        // transform: [{ translateX: -50 }, { translateY: -50 }],
      }}
      onPressOut={press}
    >
      <View
        style={{
          position: "absolute",
          overflow: "hidden",
          height: relHeight,
          width: relWidth,
        }}
      >
        <Image
          style={{
            height: relHeight * tiles,
            marginTop: margin,
          }}
          source={src}
        ></Image>
      </View>
    </Pressable>
  );
}
