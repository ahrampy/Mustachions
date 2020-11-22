import React from "react";
import { Pressable, Image, Text, StyleSheet, View } from "react-native";
import SCREEN from "../constants/screen";

export default () => {
  return (
    <View style={[styles.center, styles.container]}>
      <Text>oh no where am i?</Text>
      <Image
        style={styles.gif}
        source={require("../assets/images/test.gif")}
      ></Image>
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: SCREEN.width,
    height: SCREEN.height,
    backgroundColor: "#C0BC95",
  },
  text: {
    fontSize: 20,
    fontFamily: "press-start",
  },
  gif: {
    height: SCREEN.height * 0.5,
  },
});
