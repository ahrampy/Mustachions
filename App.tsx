import React, { useState } from "react";
import { StyleSheet, View, TouchableOpacity, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Screen from "./constants/screen";
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

function GameScreen() {
  return (
    <View style={styles.container}>
      <Game></Game>
    </View>
  );
}

function OptionsScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Options navigation={navigation}></Options>
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
          headerTitleStyle: {
            fontFamily: "press-start",
          },
        }}
      >
        <Stack.Screen name="Menu" component={MenuScreen} />
        <Stack.Screen name="Options" component={OptionsScreen} />
        <Stack.Screen
          name="Game"
          component={GameScreen}
          options={({ navigation }) => ({
            headerRight: () => (
              <TouchableOpacity
                onPress={() => navigation.navigate("Options")}
                // color="#333"
              >
                <Image
                  source={require("./assets/images/settings.png")}
                  style={styles.settings}
                ></Image>
              </TouchableOpacity>
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
  settings: {
    width: 25,
    height: 25,
    right: Screen.width * 0.02,
  },
});
