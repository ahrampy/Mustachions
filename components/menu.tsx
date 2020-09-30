import React from "react";
import { TouchableOpacity, Image, Text, StyleSheet, View } from "react-native";
import Screen from "../constants/screen";

export default () => {
  return (
    <View style={[styles.center, styles.container]}>
      <View style={[styles.center, styles.menu]}>
        <TouchableOpacity style={[styles.center, styles.button]}>
          <Text style={styles.text}>Start</Text>
        </TouchableOpacity>
      </View>
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
    width: Screen.width,
    height: Screen.height,
    backgroundColor: "white",
  },
  menu: {
    width: `${Screen.width * 0.6}px`,
    height: `${Screen.height * 0.8}px`,
    backgroundColor: "rgba(250, 250, 250, .8)",
    borderRadius: 5,
  },
  button: {
    width: "80%",
    height: "25%",
    borderWidth: 5,
    // borderRadius: 5
  },
  text: {
    fontSize: 50,
    fontFamily: "press-start",
  },
});
