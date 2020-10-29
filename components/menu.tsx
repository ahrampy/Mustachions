import React from "react";
import { Pressable, Image, Text, StyleSheet, View, Modal } from "react-native";
import Screen from "../constants/screen";

export default (props: any) => {
  // TODO hide island until needed, hide store until unlocked
  return (
    <View style={[styles.center, styles.container]}>
      {/* <Modal visible={!props.isSignedIn}>
        // TODO pass down auth prop as isSignedIn
      </Modal> */}
      <View style={[styles.center, styles.menu]}>
        <Pressable
          style={[styles.center, styles.button]}
          onPress={() => props.navigation.navigate("Game")}
        >
          <Text style={styles.text}>Start</Text>
        </Pressable>
        <Pressable
          style={[styles.center, styles.button]}
          onPress={() => props.navigation.navigate("Store")}
        >
          <Text style={styles.text}>Store</Text>
        </Pressable>
        <Pressable
          style={[styles.center, styles.button]}
          onPress={() => props.navigation.navigate("Options")}
        >
          <Text style={styles.text}>Options</Text>
        </Pressable>
        <Pressable
          style={[styles.center, styles.button]}
          onPress={() => props.navigation.navigate("Island")}
        >
          <Text style={styles.text}>Island</Text>
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
    width: Screen.width,
    height: Screen.height,
    backgroundColor: "white",
  },
  menu: {
    width: Screen.width * 0.6,
    height: Screen.height * 0.8,
    // backgroundColor: "rgba(150, 150, 150, .8)",
    borderRadius: 5,
  },
  button: {
    width: "100%",
    height: "15%",
    padding: 15,
    margin: 15,
    borderWidth: 2,
    // borderRadius: 5
  },
  text: {
    // fontSize: 20,
    fontFamily: "press-start",
  },
});
