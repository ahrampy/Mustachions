import { Audio, Video } from "expo-av";

const Sounds = {
  greyDay: null,
  fishBowl: null,
};

const Images = {
  room: {
    windowDay: require("../../assets/images/room_elements/sunny_day_window.png"),
    windowNight: require("../../assets/images/room_elements/starry_night_window.png"),
  },
};

const loadAssets = async () => {
  Sounds.greyDay = await Audio.Sound.createAsync(
    require("../../assets/audio/grey_day.wav"),
    { shouldPlay: false, isLooping: true }
  );
  return true;
};

export { loadAssets, Sounds, Images };
