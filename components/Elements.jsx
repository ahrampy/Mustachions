import React from "react";
import { Image, Pressable, View } from "react-native";
import SCREEN from "../constants/screen";
//* assets *//
import { Images } from "./entities/assets";
//* element objects *//
import { ELEMENTS } from "./entities/elements";

function Elements({ eles, frame, mode, fullscreen }) {
  if (!eles) return [];
  const components = Object.values(eles).map((ele, i) => {
    const { modes, src, size, position, tiles, range, press } = ELEMENTS[ele];
    const source = modes ? (mode === "day" ? src[0] : src[1]) : src[0];
    return (
      <Element
        key={i}
        name={ele}
        size={size}
        position={position}
        tiles={tiles}
        range={range}
        frame={frame}
        press={fullscreen[press]}
        src={Images.items[source]}
      ></Element>
    );
  });
  return components;
}

function Element({ name, press, size, position, tiles, frame, range, src }) {
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
        transform: [{ translateX: -50 }, { translateY: -50 }],
      }}
      onPressOut={press}
    >
      <View
        style={{
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

export { Element, Elements };
