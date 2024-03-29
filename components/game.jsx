import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  ImageBackground,
  Pressable,
  Modal,
} from "react-native";
//* constant *//
import SCREEN from "../constants/screen";
import STATE from "../constants/globalState";
//* sub-components *//
import { Element, Elements } from "./Elements";
//* game engine *//
import { GameLoop } from "react-native-game-engine";
//* expo *//
import { Video } from "expo-av";
//* assets *//
import { Sounds, Images, Videos } from "./entities/assets";

// * DOCS
//  * SCROLLVIEW: https://reactnative.dev/docs/scrollview
//  * GAME_ENGINE: https://www.npmjs.com/package/react-native-game-engine
// *

export default function Game(props) {
  //* modals *//
  const [introVisible, setIntroVisible] = useState(false); // needs to hatch
  const [fishBowlVisible, setFishBowlVisible] = useState(false);
  //* actions *//
  const [mustMoving, moveMust] = useState(false);
  const [frame, updateFrame] = useState(0);
  //* elements *//
  const [must, getCurrMust] = useState(STATE.get("mustachion/type"));
  const [currEles, getCurrEles] = useState(STATE.get("items/current"));
  //* time *//
  const [seconds, tick] = useState(0);
  const [minutes, tock] = useState(STATE.get("minutes"));
  const [hours, ding] = useState(STATE.get("hours"));
  const [days, dong] = useState(STATE.get("days"));
  const [mode, switchMode] = useState(hours < 12 ? "day" : "night");
  // const {}
  //* start *//
  const addAudioSubscriptions = () => {
    const subs = [];
    subs.push(
      props.navigation.addListener("focus", () =>
        Sounds.greyDay.sound.playAsync()
      )
    );
    subs.push(
      props.navigation.addListener("blur", () =>
        Sounds.greyDay.sound.pauseAsync()
      )
    );
    return subs;
  };
  //* animations and time of day *//
  const update = ({ touches, screen, layout, time }) => {
    // let press = touches.find((x) => x.type === "press");
    // if (press && (introVisible || fishBowlVisible)) {
    //   setIntroVisible(false)
    //   setFishBowlVisible(false)
    // }
    animate(time);
  };
  const animate = (time) => {
    if (time.current - seconds > 250) {
      // STATE.set("mustachion/type", (STATE.get("mustachion/type") + 1) % 3);
      // setType(STATE.get("mustachion/type"));
      tick(time.current);
      tock(minutes + 1);
      updateFrame((frame + 1) % 32);
      STATE.set("minutes", minutes);
    }
    if (minutes >= 60) {
      tock(0);
      STATE.set("minutes", minutes);
      ding(hours + 1);
      STATE.set("hours", hours);
      if (hours == 12) switchMode("night");
    }
    if (hours >= 24) {
      switchMode("day");
      ding(0);
      STATE.set("hours", hours);
      dong(days + 1);
      STATE.set("days", days);
    }
    // console.log(mode);
    // console.log(`${days} : ${hours} : ${minutes} : ${seconds}`);
  };

  //* on load *//
  useEffect(() => {
    // STATE.set("mustachion/hatched", false); //! for testing
    if (!STATE.get("mustachion/hatched")) {
      setIntroVisible(true);
      STATE.set("mustachion/hatched", true);
    }
    const subs = addAudioSubscriptions();
    return () => subs.forEach((unsub) => unsub());
  }, []);

  useEffect(() => {
    let closeIntro = setTimeout(() => {
      setIntroVisible(false);
    }, 9000);
    return () => {
      clearTimeout(closeIntro);
    };
  }, [introVisible]);

  //* onPressZooms *//
  const fullscreen = {
    showFishBowl: () => {
      Sounds.greyDay.sound.pauseAsync();
      Sounds.fishBowl.sound.playAsync();
      setFishBowlVisible(true);
    },
  };

  //* onPressZoomOuts *//
  const hideFishBowl = () => {
    Sounds.fishBowl.sound.pauseAsync();
    Sounds.greyDay.sound.playAsync();
    setFishBowlVisible(false);
  };

  return (
    <View style={styles.container}>
      <Modal style={styles.modal} visible={introVisible} animationType={"fade"}>
        <Pressable onLongPress={() => setIntroVisible(false)}>
          <Video
            source={Videos.hatch}
            rate={1.0}
            resizeMode="cover"
            shouldPlay
            style={styles.closeUp}
          />
        </Pressable>
      </Modal>
      <Modal
        style={styles.modal}
        visible={fishBowlVisible}
        animationType={"fade"}
      >
        <Pressable onLongPress={hideFishBowl}>
          <Video
            source={Videos.goldfish}
            rate={1.0}
            resizeMode="cover"
            shouldPlay
            isLooping
            style={styles.closeUp}
          />
        </Pressable>
      </Modal>
      <ScrollView horizontal={true} bounces={false}>
        <GameLoop onUpdate={update}>
          <ImageBackground
            style={styles.backgroundImage}
            source={mode === "day" ? Images.room.bgDay : Images.room.bgNight}
          >
            <ImageBackground
              style={styles.backgroundImage}
              source={
                mode === "day" ? Images.room.windowDay : Images.room.windowNight
              }
            >
              <ImageBackground
                style={styles.backgroundImage}
                source={
                  mode === "day"
                    ? Images.room.bookshelfDay
                    : Images.room.bookshelfNight
                }
              >
                <Elements
                  eles={currEles}
                  frame={frame}
                  mode={mode}
                  fullscreen={fullscreen}
                ></Elements>
                <Element
                  name={"mustachion"}
                  press={() => {
                    moveMust(true);
                    setTimeout(() => {
                      moveMust(false);
                    }, 2000);
                  }}
                  size={0.2}
                  position={{ top: 65, left: 25 }}
                  tiles={4}
                  frame={frame}
                  range={{ min: 0, max: mustMoving ? 32 : 0 }}
                  src={Images.mustachions[must]}
                />
              </ImageBackground>
            </ImageBackground>
          </ImageBackground>
        </GameLoop>
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
    height: SCREEN.height,
    width: SCREEN.height * 1.125,
  },
});
