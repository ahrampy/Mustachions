import React from "react";
import { TouchableOpacity, Image, Text, StyleSheet, View } from "react-native";
import Screen from "../constants/screen";

export default (props: any) => {
  return (
    <View style={[styles.center, styles.container]}>
      <View style={[styles.center, styles.menu]}>
        <Text style={styles.text}>Some</Text>
        <Text style={styles.text}>Options</Text>
        <Text style={styles.text}>Might</Text>
        <Text style={styles.text}>Go</Text>
        <Text style={styles.text}>Here</Text>
        <TouchableOpacity
          style={[styles.center, styles.button]}
          onPress={() => props.navigation.popToTop()}
        >
          <Text style={styles.text}>Main Menu</Text>
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
    width: Screen.width * 0.8,
    height: Screen.height * 0.8,
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
