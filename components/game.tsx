import React from "react";
import { TouchableOpacity, Image, Text, StyleSheet, View } from "react-native";
import Screen from "../constants/screen";

export default (props: any) => {
  return (
    <View style={[styles.center, styles.container]}>
      <Text style={styles.text}>Game</Text>
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
  // menu: {
  //   width: Screen.width * 0.6,
  //   height: Screen.height * 0.8,
  //   backgroundColor: "rgba(250, 250, 250, .8)",
  //   borderRadius: 5,
  // },
  // button: {
  //   width: "100%",
  //   height: "15%",
  //   padding: 15,
  //   margin: 15,
  //   borderWidth: 5,
  //   // borderRadius: 5
  // },
  text: {
    fontSize: 20,
    fontFamily: "press-start",
  },
});
