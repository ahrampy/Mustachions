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
//* assets *//
// import { Sounds, Images } from "./assets"; // TODO move final assets

// * DOCS
//  * SCROLLVIEW: https://reactnative.dev/docs/scrollview
//  * GAME_ENGINE: https://www.npmjs.com/package/react-native-game-engine
// *

export default () => {
  const [introVisible, setIntroVisible] = useState(false); // needs to hatch
  const [daytime, setTime] = useState(true); // keep track of time
  const [mustachionType, setType] = useState(0);
  const [animClock, tick] = useState(null);
  const [frame, updateFrame] = useState(0);
  const [pause, countPause] = useState(0);
  const init = () => {};
  const update = ({ touches, screen, layout, time }) => {
    let press = touches.find((x) => x.type === "press");
    if (press) {
      // console.log(press);
    }
    animate(time);
  };
  const animate = (time) => {
    if (!animClock) tick(time.current);
    else if (time.current - animClock > 250) {
      // STATE.update(
      //   ["mustachion", "type"],
      //   (STATE.check(["mustachion", "type"]) + 1) % 3
      // );
      // setType(STATE.check(["mustachion", "type"]));
      tick(time.current);
      countPause((pause + 1) % 36);
      if (pause < 4 || (pause > 8 && pause < 16)) {
        updateFrame((frame + 1) % 4);
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
              source={daytime ? window.day : window.night}
            >
              <ImageBackground
                style={styles.backgroundImage}
                source={require("../assets/images/room_elements/bookshelf.png")}
              >
                <Pressable
                  style={[styles.pressable, styles.books]}
                  onPressOut={() => {
                    // alert("books");
                  }}
                >
                  <Image
                    style={styles.smallImage}
                    source={require("../assets/images/room_elements/books.png")}
                  ></Image>
                </Pressable>
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
                <Pressable
                  style={[styles.pressable, styles.fishbowl]}
                  onPressOut={() => {
                    alert("zoom fish");
                  }}
                >
                  <Image
                    style={styles.mediumImage}
                    source={require("../assets/images/room_elements/fish_bowl.png")}
                  ></Image>
                </Pressable>
                <Element
                  name={"plant"}
                  sizeDiv={12}
                  position={{ top: 1.51, left: 3.5 }}
                  frame={frame}
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
};

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
  books: {
    position: "absolute",
    top: SCREEN.height * 0.95 - (SCREEN.height * 0.95) / 1.45,
    left: SCREEN.height * 1.125 * 0.95 - (SCREEN.height * 1.125 * 0.95) / 1.035,
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
  fishbowl: {
    position: "absolute",
    top: SCREEN.height * 0.95 - (SCREEN.height * 0.95) / 2.2,
    left: SCREEN.height * 1.125 * 0.95 - (SCREEN.height * 1.125 * 0.95) / 7,
  },
});
