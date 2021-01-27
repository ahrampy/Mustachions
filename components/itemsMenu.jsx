import React from "react";
import { Image, Text, Pressable, StyleSheet, View } from "react-native";
import Grid from "react-native-grid-component";
import SCREEN from "../constants/screen";
import STATE from "../constants/globalState";
import { Images } from "./entities/assets"; 


const item = (data, i) => {
  return (
    <View style={styles.item} key={i}>
      {/* <Image source={}></Image> */}
    </View>
  );
};

export default function itemsMenu() {
  return (
    <View style={styles.container}>
      <Grid
        data={Object.entries(STATE.get("items/current"))}
        renderItem={item}
        numColumns={2}
        style={styles.grid}
      ></Grid>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // height: SCREEN.height * 0.5,
    width: SCREEN.width * 0.8,
    borderColor: "black",
    borderWidth: 2,
  },
  grid: {
    flex: 1,
  },
  item: {
    flex: 1,
  },
});
