import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Menu from "./components/menu";
import Options from "./components/options";
import Game from "./components/game";
import * as Font from "expo-font";
import { AppLoading } from "expo";

const fetchFonts = () => {
  return Font.loadAsync({
    "press-start": require("./assets/fonts/PressStart2P-Regular.ttf"),
  });
};

const Stack = createStackNavigator();

function MenuScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Menu navigation={navigation}></Menu>
    </View>
  );
}

function GameScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Game navigation={navigation}></Game>
    </View>
  );
}

function OptionsScreen() {
  return (
    <View style={styles.container}>
      <Options></Options>
    </View>
  );
}

export default function App() {
  const [dataLoaded, setDataLoaded] = useState(false);

  if (!dataLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setDataLoaded(true)}
      />
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Menu"
        screenOptions={{
          // headerStyle: {
          //   backgroundColor: "#f4511e",
          // },
          // headerTintColor: "#fff",
          headerTitleStyle: {
            fontFamily: "press-start",
          },
        }}
      >
        <Stack.Screen name="Menu" component={MenuScreen} />
        <Stack.Screen name="Options" component={OptionsScreen} />
        <Stack.Screen name="Game" component={GameScreen} />
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
});
