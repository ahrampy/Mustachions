import React from "react";
import { Image, Text, Pressable, StyleSheet, View } from "react-native";
import Grid from "react-native-grid-component";
import SCREEN from "../constants/screen";
import STATE from "../constants/globalState";
import { Images } from "./entities/assets";

const Item = (name) => {
  return (
    <View style={styles.item}>
      {/* <Text>{name}</Text> */}
    </View>
  );
};

const Category = (data, i) => {
  return (
    <View style={styles.category} key={i}>
      <Item name={data[1]} />
      <Text>{data[0]}</Text>
    </View>
  );
};

export default function ItemsMenu() {
  return (
    <View style={styles.container}>
      <Grid
        data={Object.entries(STATE.get("items/current"))}
        renderItem={Category}
        numColumns={3}
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
  category: {
    flex: 1,
  },
  item: {
    flex: 1,
    width: "100%",
    height: "100%"
  },
});
