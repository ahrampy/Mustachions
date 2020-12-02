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
import Element from "./element";
//* game engine *//
import { GameLoop } from "react-native-game-engine";
//* expo *//
import { Video } from "expo-av";
//* assets *//
import { Sounds, Images } from "./entities/assets"; // TODO move final assets

// * DOCS
//  * SCROLLVIEW: https://reactnative.dev/docs/scrollview
//  * GAME_ENGINE: https://www.npmjs.com/package/react-native-game-engine
// *

export default function Game(props) {
  //* modals *//
  const [introVisible, setIntroVisible] = useState(false); // needs to hatch // TODO add to STATE
  const [fishBowlVisible, setFishBowlVisible] = useState(false);
  //* actions *//
  const [mustMoving, moveMust] = useState(false);
  const [frame, updateFrame] = useState(0);
  //* time *//
  const [seconds, tick] = useState(0);
  const [minutes, tock] = useState(0);
  const [hours, ding] = useState(0);
  const [days, dong] = useState(STATE.get("days"));
  const [timeOfDay, setTime] = useState(STATE.get("timeOfDay"));
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
    let press = touches.find((x) => x.type === "press");
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
    }
    if (minutes >= 60) {
      tock(0);
      ding(hours + 1);
      STATE.set("timeOfDay", timeOfDay);
      if (hours === 12) {
        setTime((timeOfDay + 1) % 24);
      } else if (hours >= 24) {
        setTime((timeOfDay + 1) % 24);
        ding(0);
        dong(days + 1);
        STATE.set("days", days);
      }
    }
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
            source={require("../assets/videos/egg.mp4")}
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
            source={require("../assets/videos/goldfish_animation.mp4")}
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
          source={require("../assets/images/room.jpg")}
        >
          <GameLoop onUpdate={update}>
            <ImageBackground
              style={styles.backgroundImage}
              source={
                timeOfDay > 12 ? Images.room.windowDay : Images.room.windowNight
              }
            >
              <ImageBackground
                style={styles.backgroundImage}
                source={require("../assets/images/room_elements/bookshelf.png")}
              >
                <Element
                  name={"books"}
                  sizeDiv={7.5}
                  position={{ top: 1.4, left: 1.045 }}
                  tiles={1}
                  frame={frame}
                  range={{ min: 0, max: 0 }}
                  src={require("../assets/images/room_elements/books.png")}
                />
                <Element
                  name={"mirror"}
                  sizeDiv={8}
                  position={{ top: 1.5, left: 1.55 }}
                  tiles={1}
                  frame={frame}
                  range={{ min: 0, max: 0 }}
                  src={require("../assets/images/room_elements/mirror.png")}
                />
                <Element
                  name={"piano"}
                  sizeDiv={3}
                  position={{ top: 1.8, left: 1.5 }}
                  tiles={1}
                  frame={frame}
                  range={{ min: 0, max: 0 }}
                  src={require("../assets/images/room_elements/piano.png")}
                />
                <Element
                  name={"speaker"}
                  sizeDiv={7}
                  position={{ top: 2.23, left: 2.1 }}
                  tiles={1}
                  frame={frame}
                  range={{ min: 0, max: 0 }}
                  src={require("../assets/images/room_elements/speaker.png")}
                />
                <Element
                  name={"fish"}
                  press={() => showFishBowl()}
                  sizeDiv={8}
                  position={{ top: 2.3, left: 30 }}
                  tiles={1}
                  frame={frame}
                  range={{ min: 0, max: 0 }}
                  src={require("../assets/images/room_elements/fish_bowl.png")}
                />
                <Element
                  name={"plant"}
                  sizeDiv={12}
                  position={{ top: 1.51, left: 5.5 }}
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
