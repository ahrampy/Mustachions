import React from "react";
import { Pressable, Image, Text, StyleSheet, View } from "react-native";
import SCREEN from "../constants/screen";

export default (props: any) => {
  return (
    <View style={[styles.center, styles.container]}>
      <View style={[styles.center, styles.menu]}>
        <Text style={styles.text}>Nothing here yet!!!</Text>
        <Pressable
          style={[styles.center, styles.button]}
          onPress={() => props.navigation.popToTop()}
        >
          <Text style={styles.text}>Main Menu</Text>
        </Pressable>
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
    width: SCREEN.width,
    height: SCREEN.height,
    backgroundColor: "white",
  },
  menu: {
    width: SCREEN.width * 0.8,
    height: SCREEN.height * 0.8,
    borderRadius: 5,
  },
  button: {
    width: "100%",
    height: "5%",
    // padding: 15,
    margin: 15,
    borderWidth: 2,
    // borderRadius: 5
  },
  text: {
    fontSize: 12,
    fontFamily: "press-start",
  },
});
