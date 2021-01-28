import React from "react";
import { Image, Text, Pressable, StyleSheet, View } from "react-native";
import Grid from "react-native-grid-component";
import SCREEN from "../constants/screen";
import STATE from "../constants/globalState";
import { Images } from "./entities/assets";

const Item = ({ name }) => {
  return (
    <View style={styles.item}>
        <Image style={styles.itemImage} source={Images.items[name]}></Image>
    </View>
  );
};

const Category = (data, i) => {
  return (
    <View style={styles.category}>
      <Pressable onPress={() => {console.log(data[1]);}}>
        <Item name={data[1]} key={i} />
      </Pressable>
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
        keyExtractor={(item, n) => n}
      ></Grid>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: SCREEN.width * 0.8,
    // borderColor: "black",
    // borderWidth: 2,
  },
  grid: {
    flex: 1,
  },
  category: {
    flex: 1,
    borderColor: "black",
    borderWidth: 2,
    margin: 5,
  },
  item: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  itemImage: {
    width: 80,
    height: 80,
  },
});
