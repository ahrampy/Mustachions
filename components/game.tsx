import React from "react";
import {
  Pressable,
  Image,
  Text,
  StyleSheet,
  View,
  ScrollView,
  ImageBackground,
} from "react-native";
import Screen from "../constants/screen";

export default () => {
  // * DOCS: https://reactnative.dev/docs/scrollview
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal={true}
        bounces={false}
      >
        <ImageBackground
          style={styles.bg}
          source={require("../assets/images/bg.jpg")}
        ></ImageBackground>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: Screen.height,
  },
  text: {
    fontSize: 20,
    fontFamily: "press-start",
  },
  bg: {
    height: Screen.height * 0.95,
    width: Screen.height * 0.95 * 1.125,
  },
});
