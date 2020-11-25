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
//* constant *//
import SCREEN from "../constants/screen";
import STATE from "../constants/globalState";
//* sub-components *//
import Element from "./element";
//* game engine *//
import { GameLoop } from "react-native-game-engine";
//* expo *//
import { Audio } from "expo-av";
import { min } from "react-native-reanimated";
//* assets *//
// import { Sounds, Images } from "./assets"; // TODO move final assets

// * DOCS
//  * SCROLLVIEW: https://reactnative.dev/docs/scrollview
//  * GAME_ENGINE: https://www.npmjs.com/package/react-native-game-engine
// *

export default function Game() {
  const [introVisible, setIntroVisible] = useState(false); // needs to hatch
  const [mustachionType, setType] = useState(0);
  const [seconds, tick] = useState(0);
  const [minutes, tock] = useState(0);
  const [hours, ding] = useState(0);
  const [days, dong] = useState(0);
  const [frame, updateFrame] = useState(0);
  const [timeOfDay, setTime] = useState(STATE.get("timeOfDay")); // keep track of time
  // const [pause, countPause] = useState(0);
  const init = () => {};
  const update = ({ touches, screen, layout, time }) => {
    let press = touches.find((x) => x.type === "press");
    if (press) {
      // console.log(press);
    }
    animate(time);
  };
  const animate = (time) => {
    if (time.current - seconds > 250) {
      // STATE.set("mustachion/type", (STATE.get("mustachion/type") + 1) % 3);
      // setType(STATE.get("mustachion/type"));
      tick(time.current);
      tock(minutes + 1);
      updateFrame((frame + 1) % 32);
    }
    if (minutes >= 60) {
      tock(0);
      ding(hours + 1);
      console.log(hours);
      STATE.set("timeOfDay", timeOfDay);
      if (hours === 12) {
        setTime((timeOfDay + 1) % 2);
      } else if (hours >= 24) {
        setTime((timeOfDay + 1) % 2);
        ding(0);
        dong(days + 1);
      }
    }
  };
  const sounds = {
    // grey_day: new Audio("../assets/sounds/grey_day.wav"),
  };
  const window = {
    day: require("../assets/images/room_elements/sunny_day_window.png"),
    night: require("../assets/images/room_elements/starry_night_window.png"),
  };
  const mustachions = [
    require("../assets/images/mustachions/mustachion_1.png"),
    require("../assets/images/mustachions/mustachion_2.png"),
    require("../assets/images/mustachions/mustachion_3.png"),
  ];

  useEffect(() => {
    init();
  }, []);

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
          source={require("../assets/images/room.jpg")}
        >
          <GameLoop onUpdate={update}>
            <ImageBackground
              style={styles.backgroundImage}
              source={timeOfDay === 0 ? window.day : window.night}
            >
              <ImageBackground
                style={styles.backgroundImage}
                source={require("../assets/images/room_elements/bookshelf.png")}
              >
                <Element
                  name={"books"}
                  sizeDiv={7.5}
                  position={{ top: 1.365, left: 1.04 }}
                  tiles={1}
                  frame={frame}
                  range={{ min: 0, max: 0 }}
                  src={require("../assets/images/room_elements/books.png")}
                />
                <Pressable
                  style={[styles.pressable, styles.mirror]}
                  onPressOut={() => {
                    // alert("mirror");
                  }}
                >
                  <Image
                    style={styles.mediumImage}
                    source={require("../assets/images/room_elements/mirror.png")}
                  ></Image>
                </Pressable>
                <Pressable
                  style={[styles.pressable, styles.piano]}
                  onPressOut={() => {
                    alert("zoom piano");
                  }}
                >
                  <Image
                    style={styles.longImage}
                    source={require("../assets/images/room_elements/piano.png")}
                  ></Image>
                </Pressable>
                <Pressable
                  style={[styles.pressable, styles.speaker]}
                  onPressOut={() => {
                    // alert("speaker");
                  }}
                >
                  <Image
                    style={styles.tallImage}
                    source={require("../assets/images/room_elements/speaker.png")}
                  ></Image>
                </Pressable>
                <Element
                  name={"fish"}
                  sizeDiv={8}
                  position={{ top: 2.1, left: 13 }}
                  tiles={1}
                  frame={frame}
                  range={{ min: 0, max: 0 }}
                  src={require("../assets/images/room_elements/fish_bowl.png")}
                />
                <Element
                  name={"plant"}
                  // press={}
                  sizeDiv={12}
                  position={{ top: 1.468, left: 4.3 }}
                  tiles={4}
                  frame={frame}
                  range={{ min: 0, max: 12 }}
                  src={require("../assets/images/room_elements/plant_1_sheet.png")}
                />
                <Pressable
                  style={[styles.pressable, styles.mustachion]}
                  onPressOut={() => {
                    setType((mustachionType + 1) % 3);
                  }}
                >
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: SCREEN.height,
  },
  intro: {
    height: SCREEN.height,
    width: SCREEN.width,
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
    height: SCREEN.height * 0.95,
    width: SCREEN.height * 1.125 * 0.95,
  },
  largeImage: {
    height: (SCREEN.height * 0.95) / 6,
    width: (SCREEN.height * 1.125 * 0.95) / 6,
  },
  mediumImage: {
    height: (SCREEN.height * 0.95) / 8,
    width: (SCREEN.height * 1.125 * 0.95) / 8,
  },
  longImage: {
    height: (SCREEN.height * 0.95) / 8.5,
    width: (SCREEN.height * 1.125 * 0.95) / 4.5,
  },
  tallImage: {
    height: (SCREEN.height * 0.95) / 9,
    width: (SCREEN.height * 1.125 * 0.95) / 16,
  },
  mustachion: {
    position: "absolute",
    top: SCREEN.height * 0.95 - (SCREEN.height * 0.95) / 3.4,
    left: SCREEN.height * 1.125 * 0.95 - (SCREEN.height * 1.125 * 0.95) / 4.5,
  },
  mirror: {
    position: "absolute",
    top: SCREEN.height * 0.95 - (SCREEN.height * 0.95) / 1.5,
    left: SCREEN.height * 1.125 * 0.95 - (SCREEN.height * 1.125 * 0.95) / 1.4,
  },
  piano: {
    position: "absolute",
    top: SCREEN.height * 0.95 - (SCREEN.height * 0.95) / 2.2,
    left: SCREEN.height * 1.125 * 0.95 - (SCREEN.height * 1.125 * 0.95) / 1.45,
  },
  speaker: {
    position: "absolute",
    top: SCREEN.height * 0.95 - (SCREEN.height * 0.95) / 2.28,
    left: SCREEN.height * 1.125 * 0.95 - (SCREEN.height * 1.125 * 0.95) / 2.15,
  },
});
