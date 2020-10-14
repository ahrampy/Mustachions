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
      // console.log(press); // !
      // console.log(time); // !
    }
  }
  const [introVisible, setIntroVisible] = useState(true); // !! testing

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
          style={styles.image}
          source={require("../assets/images/temp/bg.jpg")}
          // source={require("../assets/images/room.jpg")}
        >
          <GameLoop onUpdate={update}>
            {/* <Image
              style={styles.image}
              source={require("../assets/images/room_elements/fish_bowl.png")}
            ></Image>
            <Image
              style={styles.image}
              source={require("../assets/images/room_elements/bookshelf.png")}
            ></Image> */}
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
  image: {
    height: Screen.height * 0.95,
    width: Screen.height * 1.125 * 0.95,
  },
});
