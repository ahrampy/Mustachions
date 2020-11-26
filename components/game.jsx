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
import { Audio, Video } from "expo-av";
import { min } from "react-native-reanimated";
//* assets *//
// import { Sounds, Images } from "./assets"; // TODO move final assets

// * DOCS
//  * SCROLLVIEW: https://reactnative.dev/docs/scrollview
//  * GAME_ENGINE: https://www.npmjs.com/package/react-native-game-engine
// *

export default function Game() {
  const [introVisible, setIntroVisible] = useState(true); // needs to hatch // TODO add to STATE
  const [fishBowlVisible, setFishBowlVisible] = useState(false);
  const [mustMoving, moveMust] = useState(false);
  //* keep time *//
  const [seconds, tick] = useState(0);
  const [minutes, tock] = useState(0);
  const [hours, ding] = useState(0);
  const [days, dong] = useState(0);
  const [frame, updateFrame] = useState(0);
  const [timeOfDay, setTime] = useState(STATE.get("timeOfDay"));
  //* animations and time of day *//
  const update = ({ touches, screen, layout, time }) => {
    // let press = touches.find((x) => x.type === "press");
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
  //* temp assets *//
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

  //* on load *//
  // useEffect(() => {
  //   init();
  // }, []);

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
      <Modal style={styles.modal} visible={introVisible} animationType={"fade"}>
        {/* <Image
          style={styles.closeUp}
          source={require("../assets/videos/egg-no-repeat.gif")}
        ></Image> */}
        <Video
          source={require("../assets/videos/egg.mp4")}
          rate={1.0}
          resizeMode="cover"
          shouldPlay
          style={styles.closeUp}
        />
      </Modal>
      <Modal
        style={styles.modal}
        visible={fishBowlVisible}
        animationType={"fade"}
      >
        <Video
          source={require("../assets/videos/goldfish_animation.mp4")}
          rate={1.0}
          resizeMode="cover"
          shouldPlay
          isLooping
          style={styles.closeUp}
        />
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
                <Element
                  name={"mirror"}
                  sizeDiv={8}
                  position={{ top: 1.5, left: 1.45 }}
                  tiles={1}
                  frame={frame}
                  range={{ min: 0, max: 0 }}
                  src={require("../assets/images/room_elements/mirror.png")}
                />
                <Element
                  name={"piano"}
                  sizeDiv={3}
                  position={{ top: 1.7, left: 1.5 }}
                  tiles={1}
                  frame={frame}
                  range={{ min: 0, max: 0 }}
                  src={require("../assets/images/room_elements/piano.png")}
                />
                <Element
                  name={"speaker"}
                  sizeDiv={7}
                  position={{ top: 2.09, left: 2.1 }}
                  tiles={1}
                  frame={frame}
                  range={{ min: 0, max: 0 }}
                  src={require("../assets/images/room_elements/speaker.png")}
                />
                <Element
                  name={"fish"}
                  press={() => setFishBowlVisible(true)}
                  sizeDiv={8}
                  position={{ top: 2.1, left: 13 }}
                  tiles={1}
                  frame={frame}
                  range={{ min: 0, max: 0 }}
                  src={require("../assets/images/room_elements/fish_bowl.png")}
                />
                <Element
                  name={"plant"}
                  sizeDiv={12}
                  position={{ top: 1.468, left: 4.3 }}
                  tiles={4}
                  frame={frame}
                  range={{ min: 0, max: 12 }}
                  src={require("../assets/images/room_elements/plant_1_sheet.png")}
                />
                <Element
                  name={"mustachion"}
                  press={() => {
                    moveMust(true);
                    setTimeout(() => {
                      moveMust(false);
                    }, 2000);
                  }}
                  sizeDiv={5.5}
                  position={{ top: 3.4, left: 4.5 }}
                  tiles={4}
                  frame={frame}
                  range={{ min: 0, max: mustMoving ? 32 : 0 }}
                  src={mustachions[STATE.get("mustachion/type")]}
                />
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
  modal: {
    height: SCREEN.height,
    width: SCREEN.width,
  },
  closeUp: {
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
});