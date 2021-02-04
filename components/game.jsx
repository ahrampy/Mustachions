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
import Element from "./Element";
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
  const [introVisible, setIntroVisible] = useState(true); // needs to hatch // TODO add to STATE
  const [fishBowlVisible, setFishBowlVisible] = useState(false);
  //* actions *//
  const [mustMoving, moveMust] = useState(false);
  const [frame, updateFrame] = useState(0);
  //* time *//
  const [seconds, tick] = useState(0);
  const [minutes, tock] = useState(STATE.get("minutes"));
  const [hours, ding] = useState(STATE.get("hours"));
  const [days, dong] = useState(STATE.get("days"));
  //* start *//
  const init = () => {
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
    }
    if (hours >= 24) {
      ding(0);
      STATE.set("hours", hours);
      dong(days + 1);
      STATE.set("days", days);
    }
    // console.log(`${days} : ${hours} : ${minutes} : ${seconds}`);
  };

  //* on load *//
  useEffect(() => {
    const subs = init();
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

  const showFishBowl = () => {
    Sounds.greyDay.sound.pauseAsync();
    Sounds.fishBowl.sound.playAsync();
    setFishBowlVisible(true);
  };

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
        <Pressable onLongPress={() => hideFishBowl()}>
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
        <ImageBackground
          style={styles.backgroundImage}
          source={hours < 12 ? Images.room.bgDay : Images.room.bgNight}
        >
          <GameLoop onUpdate={update}>
            <ImageBackground
              style={styles.backgroundImage}
              source={
                hours < 12 ? Images.room.windowDay : Images.room.windowNight
              }
            >
              <ImageBackground
                style={styles.backgroundImage}
                source={
                  hours < 12
                    ? Images.room.bookshelfDay
                    : Images.room.bookshelfNight
                }
              >
                <Element
                  name={"books"}
                  size={0.14}
                  position={{ top: 28, left: 4 }}
                  tiles={1}
                  frame={frame}
                  range={{ min: 0, max: 0 }}
                  src={Images.items.books}
                />
                <Element
                  name={"mirror"}
                  size={0.13}
                  position={{ top: 30, left: 30 }}
                  tiles={1}
                  frame={frame}
                  range={{ min: 0, max: 0 }}
                  src={Images.items.mirror}
                />
                <Element
                  name={"piano"}
                  size={0.35}
                  position={{ top: 44, left: 26 }}
                  tiles={1}
                  frame={frame}
                  range={{ min: 0, max: 0 }}
                  src={Images.items.piano}
                />
                <Element
                  name={"speaker"}
                  size={0.18}
                  position={{ top: 53, left: 45 }}
                  tiles={1}
                  frame={frame}
                  range={{ min: 0, max: 0 }}
                  src={Images.items.speaker}
                />
                <Element
                  name={"light"}
                  size={0.5}
                  position={{ top: 28, left: 50 }}
                  tiles={1}
                  frame={frame}
                  range={{ min: 0, max: 0 }}
                  src={
                    hours < 12
                      ? Images.items.lampOff1
                      : Images.items.lampOn1
                  }
                />
                <Element
                  name={"fish"}
                  press={() => showFishBowl()}
                  size={0.15}
                  position={{ top: 55, left: 87 }}
                  tiles={1}
                  frame={frame}
                  range={{ min: 0, max: 0 }}
                  src={Images.items.fish}
                />
                <Element
                  name={"plant"}
                  size={0.08}
                  position={{ top: 34, left: 72 }}
                  tiles={4}
                  frame={frame}
                  range={{ min: 0, max: 12 }}
                  src={Images.items.seedsSheet}
                />
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
                  src={Images.mustachions[STATE.get("mustachion/type")]}
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
    height: SCREEN.height,
    width: SCREEN.height * 1.125,
  },
});
