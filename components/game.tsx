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
        contentContainerStyle={{ flexGrow: 1 }}
        horizontal={true}
        bounces={false}
      >
        <Image
          style={styles.bg}
          source={require("../assets/images/bg.jpg")}
        ></Image>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  // center: {
  //   display: "flex",
  //   justifyContent: "center",
  //   alignItems: "center",
  // },
  container: {
    flex: 1,
    // width: Screen.width,
    height: Screen.height,
    // backgroundColor: "#C0BC95",
  },
  text: {
    fontSize: 20,
    fontFamily: "press-start",
  },
  bg: {
    resizeMode: "cover",
    height: Screen.height * 0.95,
    width: Screen.height * 0.95 * 1.125,
  },
});
