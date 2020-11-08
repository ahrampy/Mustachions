import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  ImageBackground,
  Image,
  Pressable,
  Modal,
} from "react-native";
import Screen from "../constants/screen";
import { GameLoop } from "react-native-game-engine";

// * DOCS
//  * SCROLLVIEW: https://reactnative.dev/docs/scrollview
//  * GAME_ENGINE: https://www.npmjs.com/package/react-native-game-engine
// *

export default () => {
  function update({ touches, screen, layout, time }: any) {
    let press = touches.find((x: any) => x.type === "press");
    if (press) {
      // console.log(press);
      // console.log(time);
    }
  }
  const [introVisible, setIntroVisible] = useState(false); // needs to hatch
  const [daytime, setTime] = useState(true); // get local time?
  const [mustachionType, setType] = useState(0);
  const window = {
    day: require("../assets/images/room_elements/sunny_day_window.png"),
    night: require("../assets/images/room_elements/starry_night_window.png"),
  };
  const mustachions = [
    require("../assets/images/mustachions/mustachion_1.psd"),
    require("../assets/images/mustachions/mustachion_2.psd"),
    require("../assets/images/mustachions/mustachion_3.psd"),
  ];

  useEffect(() => {
    let closeIntro = setTimeout(() => {
      setIntroVisible(false);
    }, 9000);
    return () => {
      clearTimeout(closeIntro);
    };
  }, [introVisible]);

  return (
    <View style={styles.container}>
      <Modal style={styles.intro} visible={introVisible} animationType={"fade"}>
        <Image
          style={styles.gif}
          source={require("../assets/images/egg-no-repeat.gif")}
        ></Image>
      </Modal>
      <ScrollView horizontal={true} bounces={false}>
        <ImageBackground
          style={styles.backgroundImage}
          // source={require("../assets/images/temp/bg.jpg")}
          source={require("../assets/images/room.jpg")}
        >
          <GameLoop onUpdate={update}>
            <ImageBackground
              style={styles.backgroundImage}
              source={daytime ? window.day : window.night}
            >
              <ImageBackground
                style={styles.backgroundImage}
                source={require("../assets/images/room_elements/bookshelf.png")}
              >
                <Pressable style={styles.books} onPress={() => {alert("books")}}>
                  <Image
                    style={styles.smallImage}
                    source={require("../assets/images/room_elements/books.png")}
                  ></Image>
                </Pressable>
                <Pressable style={styles.mirror} onPress={() => {alert("mirror")}}>
                  <Image
                    style={styles.largeImage}
                    source={require("../assets/images/room_elements/mirror.png")}
                  ></Image>
                </Pressable>
                <Pressable style={styles.piano} onPress={() => {alert("piano")}}>
                  <Image
                    style={styles.longImage}
                    source={require("../assets/images/room_elements/piano.png")}
                  ></Image>
                </Pressable>
                <Pressable style={styles.speaker} onPress={() => {alert("speaker")}}>
                  <Image
                    style={styles.tallImage}
                    source={require("../assets/images/room_elements/speaker.png")}
                  ></Image>
                </Pressable>
                <Pressable style={styles.fishbowl} onPress={() => {alert("fishbowl")}}>
                  <Image
                    style={styles.mediumImage}
                    source={require("../assets/images/room_elements/fish_bowl.png")}
                  ></Image>
                </Pressable>
                <Pressable style={styles.plant} onPress={() => {alert("plant")}}>
                  <Image
                    style={styles.smallImage}
                    source={require("../assets/images/room_elements/plant.png")}
                  ></Image>
                </Pressable>
                <Pressable style={styles.mustachion} onPress={() => {setType((mustachionType + 1) % 3)}}>
                  <Image
                    style={styles.largeImage}
                    source={mustachions[mustachionType]}
                  ></Image>
                </Pressable>
              </ImageBackground>
            </ImageBackground>
          </GameLoop>
        </ImageBackground>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: Screen.height,
  },
  intro: {
    height: Screen.height,
    width: Screen.width,
  },
  gif: {
    width: "100%",
    height: "100%",
  },
  text: {
    fontSize: 20,
    fontFamily: "press-start",
  },
  backgroundImage: {
    height: Screen.height * 0.95,
    width: Screen.height * 1.125 * 0.95,
  },
  largeImage: {
    height: (Screen.height * 0.95) / 7,
    width: (Screen.height * 1.125 * 0.95) / 7,
  },
  mediumImage: {
    height: (Screen.height * 0.95) / 8,
    width: (Screen.height * 1.125 * 0.95) / 8,
  },
  smallImage: {
    height: (Screen.height * 0.95) / 12,
    width: (Screen.height * 1.125 * 0.95) / 12,
  },
  longImage: {
    height: (Screen.height * 0.95) / 8.5,
    width: (Screen.height * 1.125 * 0.95) / 4.5,
  },
  tallImage: {
    height: (Screen.height * 0.95) / 9,
    width: (Screen.height * 1.125 * 0.95) / 16,
  },
  mustachion: {
    position: "absolute",
    top: Screen.height * 0.95 - (Screen.height * 0.95) / 3,
    left: Screen.height * 1.125 * 0.95 - (Screen.height * 1.125 * 0.95) / 4.5,
  },
  books: {
    position: "absolute",
    top: Screen.height * 0.95 - (Screen.height * 0.95) / 1.45,
    left: Screen.height * 1.125 * 0.95 - (Screen.height * 1.125 * 0.95) / 1.035,
  },
  mirror: {
    position: "absolute",
    top: Screen.height * 0.95 - (Screen.height * 0.95) / 1.5,
    left: Screen.height * 1.125 * 0.95 - (Screen.height * 1.125 * 0.95) / 1.4,
  },
  piano: {
    position: "absolute",
    top: Screen.height * 0.95 - (Screen.height * 0.95) / 2.2,
    left: Screen.height * 1.125 * 0.95 - (Screen.height * 1.125 * 0.95) / 1.45,
  },
  speaker: {
    position: "absolute",
    top: Screen.height * 0.95 - (Screen.height * 0.95) / 2.28,
    left: Screen.height * 1.125 * 0.95 - (Screen.height * 1.125 * 0.95) / 2.15,
  },
  fishbowl: {
    position: "absolute",
    top: Screen.height * 0.95 - (Screen.height * 0.95) / 2.2,
    left: Screen.height * 1.125 * 0.95 - (Screen.height * 1.125 * 0.95) / 7,
  },
  plant: {
    position: "absolute",
    top: Screen.height * 0.95 - (Screen.height * 0.95) / 1.5,
    left: Screen.height * 1.125 * 0.95 - (Screen.height * 1.125 * 0.95) / 3.4,
  },
});
