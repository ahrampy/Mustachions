import { Audio, Video } from "expo-av";

const Sounds = {
  greyDay: null,
  fishBowl: null,
};

const Images = {
  interface: {
    text: require("../../assets/images/text.png"),
    arrow: require("../../assets/images/interface/back_arrow.gif")
  },
  mustachions: {
    0: require("../../assets/images/mustachions/mustachion_1.png"),
    1: require("../../assets/images/mustachions/mustachion_2.png"),
    2: require("../../assets/images/mustachions/mustachion_3.png"),
  },
  room: {
    bgDay: require("../../assets/images/room.jpg"),
    bgNight: require("../../assets/images/room_dark.png"),
    windowDay: require("../../assets/images/room_elements/sunny_day_window.png"),
    windowNight: require("../../assets/images/room_elements/starry_night_window.png"),
  },
};

const Videos = {
  hatch: require("../../assets/videos/egg.mp4"),
};

const loadAssets = async () => {
  Sounds.greyDay = await Audio.Sound.createAsync(
    require("../../assets/audio/grey_day.wav"),
    { isLooping: true }
  );
  Sounds.fishBowl = await Audio.Sound.createAsync(
    require("../../assets/audio/fish_sound.wav"),
    { isLooping: true }
  );
  return true;
};

export { loadAssets, Sounds, Images, Videos };
