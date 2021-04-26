import React, { useState } from "react";
import { FlatList, Image, Pressable, StyleSheet, View } from "react-native";
import SCREEN from "../constants/screen";
import STATE from "../constants/globalState";
import { ELEMENTS } from "./entities/elements";
import { Images } from "./entities/assets";

export default function ItemsMenu() {
  const [menu, changeMenu] = useState(0);
  const [selected, selectItem] = useState(null);

  const Item = ({ name }) => {
    const { tiles, size, src } = ELEMENTS[name];
    const margin = tiles > 1 ? size * SCREEN.height * tiles - 40 : 0;

    return (
      <View style={styles.item}>
        <Image
          style={{ width: 80, height: 80 * tiles, marginTop: margin }}
          source={Images.items[src[0]]}
        ></Image>
      </View>
    );
  };

  const SelectedGridEle = ({ item, index }) => {
    return (
      <View style={styles.gridBox}>
        <Pressable
          onPress={() => {
            STATE.set(`items/current/${selected}`, item);
            selectItem(null);
            changeMenu(0);
          }}
        >
          <Item name={item} key={index} />
        </Pressable>
      </View>
    );
  };

  const CategoryGridEle = ({ item, index }) => {
    return (
      <View style={styles.gridBox}>
        <Pressable
          onPress={() => {
            selectItem(item[0]);
            changeMenu(1);
          }}
        >
          <Item name={item[1]} key={index} />
        </Pressable>
      </View>
    );
  };

  const CategorySelected = () => {
    return (
      <View style={styles.container}>
        <FlatList
          data={STATE.get(`items/owned/${selected}`)}
          renderItem={SelectedGridEle}
          numColumns={3}
          keyExtractor={(item, n) => n}
          style={styles.grid}
        ></FlatList>
      </View>
    );
  };

  const CategoryMenu = () => {
    return (
      <View style={styles.container}>
        <FlatList
          data={Object.entries(STATE.get("items/current"))}
          renderItem={CategoryGridEle}
          numColumns={3}
          style={styles.grid}
          keyExtractor={(item, n) => n}
          style={styles.grid}
        ></FlatList>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {menu === 0 ? (
        <CategoryMenu></CategoryMenu>
      ) : (
        <CategorySelected></CategorySelected>
      )}
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
  gridBox: {
    flex: 1,
    borderColor: "black",
    borderWidth: 2,
    margin: 5,
  },
  item: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    height: 100,
  },
});
