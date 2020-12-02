//* react *//
import React, { useState } from "react";
import { StyleSheet, View, Pressable, Image, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
//* constant *//
import SCREEN from "./constants/screen";
import STATE from "./constants/globalState";
//* components *//
import Menu from "./components/menu";
import Store from "./components/store";
import Options from "./components/options";
import Game from "./components/game";
import Island from "./components/island";
//* assets *//
import { loadAssets, Images } from "./components/entities/assets";
//* expo *//
import { AppLoading } from "expo";
import * as Font from "expo-font";

const Stack = createStackNavigator();

// TODO change stack navigator safe zone
// TODO move Screen wrappers to components

function MenuScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Menu navigation={navigation}></Menu>
    </View>
  );
}

function GameScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Game navigation={navigation}></Game>
    </View>
  );
}

function IslandScreen() {
  return (
    <View style={styles.container}>
      <Island></Island>
    </View>
  );
}

function StoreScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Store navigation={navigation}></Store>
    </View>
  );
}

function OptionsScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Options navigation={navigation}></Options>
    </View>
  );
}

export default function App() {
  const [loaded, setLoaded] = useState(false);

  const fetchFont = () =>
    Font.loadAsync({
      "press-start": require("./assets/fonts/PressStart2P-Regular.ttf"),
    });

  const fetchData = () => STATE.fetchStorage();

  const fetchAll = async () => {
    await Promise.all([fetchFont(), fetchData(), loadAssets()]);
  };

  if (!loaded) {
    return (
      <AppLoading startAsync={fetchAll} onFinish={() => setLoaded(true)} />
    );
  }

  return (
    <NavigationContainer>
      <StatusBar hidden />

      <Stack.Navigator
        initialRouteName="Menu"
        screenOptions={{
          headerStyle: styles.defaultHeader,
          headerTitleStyle: {
            fontFamily: "press-start",
          },
          headerBackTitleVisible: false,
          headerBackImage: () => <Image source={Images.interface.arrow} />,
        }}
      >
        <Stack.Screen
          name="Menu"
          component={MenuScreen}
          options={{
            headerStyle: [styles.defaultHeader, styles.menuHeader],
            headerTitle: "Mustachions",
          }}
        />
        <Stack.Screen name="Store" component={StoreScreen} />
        <Stack.Screen name="Options" component={OptionsScreen} />
        <Stack.Screen
          name="Island"
          component={IslandScreen}
          options={() => ({
            headerStyle: [styles.defaultHeader, styles.islandHeader],
          })}
        />
        <Stack.Screen
          name="Game"
          component={GameScreen}
          options={({ navigation }) => ({
            headerStyle: [styles.defaultHeader, styles.gameHeader],
            gestureEnabled: false,
            headerRight: () => (
              <Pressable onPress={() => navigation.navigate("Options")}>
                <Image
                  source={require("./assets/images/settings.png")}
                  style={styles.settings}
                ></Image>
              </Pressable>
            ),
            headerLeft: () => <View></View>,
            headerTitle: () => <View></View>,
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    fontFamily: "press-start",
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  defaultHeader: {
    elevation: 0,
    shadowOpacity: 0,
    borderBottomWidth: 0,
  },
  menuHeader: {
    height: SCREEN.height * 0.1,
  },
  gameHeader: {
    backgroundColor: "#101626",
  },
  islandHeader: {
    backgroundColor: "#C0BC95",
  },
  settings: {
    width: 25,
    height: 25,
    right: SCREEN.width * 0.02,
  },
});
