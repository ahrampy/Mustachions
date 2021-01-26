//* react *//
import React, { useState } from "react";
import { StyleSheet, View, Pressable, Image, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
//* constant *//
import SCREEN from "./constants/screen";
import STATE from "./constants/globalState";
//* components *//
import Menu from "./components/mainMenu";
import Store from "./components/store";
import Options from "./components/options";
import Game from "./components/game";
import Island from "./components/island";
//* assets *//
import { loadAssets, Images } from "./components/entities/assets";
//* expo *//
import { AppLoading } from "expo";
import * as Font from "expo-font";

export default function App() {
  const Stack = createStackNavigator();
  const [loaded, setLoaded] = useState(false);

  const fetchFont = () =>
    Font.loadAsync({
      "press-start": require("./assets/fonts/PressStart2P-Regular.ttf"),
    });

  const fetchAll = async () =>
    await Promise.all([fetchFont(), STATE.fetchStorage(), loadAssets()]);

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
          component={Menu}
          options={{
            headerStyle: [styles.defaultHeader, styles.menuHeader],
            headerTitle: "Mustachions",
          }}
        />
        <Stack.Screen name="Store" component={Store} />
        <Stack.Screen name="Options" component={Options} />
        <Stack.Screen
          name="Island"
          component={Island}
          options={() => ({
            headerStyle: [styles.defaultHeader, styles.islandHeader],
          })}
        />
        <Stack.Screen
          name="Game"
          component={Game}
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
    height: SCREEN.height * 0.1,
  },
  menuHeader: {
    // TODO change main menu header
  },
  gameHeader: {
    backgroundColor: "#101626",
  },
  islandHeader: {
    backgroundColor: "#C0BC95",
  },
  settings: {
    width: 35,
    height: 35,
    right: SCREEN.width * 0.02,
    tintColor: "white",
  },
});
