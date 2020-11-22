import { AsyncStorage } from "react-native";

const UPDATE = {
  get: async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@game_Data");
      const data = jsonValue != null ? JSON.parse(jsonValue) : null;
      if (!data) STORE.set();
      else UPDATE.map(data, STORE);
    } catch (e) {
      console.log("data fetch failed: " + e);
    }
  },
  set: async () => {
    try {
      const jsonValue = JSON.stringify(STORE);
      await AsyncStorage.setItem("@game_Data", jsonValue);
    } catch (e) {
      console.log("error saving: " + e);
    }
  },
  map: (data, obj) => {
    for (let key in data) {
      console.log(key);
    }
  },
};

const STORE = {
  UPDATE: UPDATE,
  mustachion: {
    type: 0,
    age: 0,
  },
  previous: [],
  items: {
    current: {
      bookshelf: "brown",
      books: "standard",
      wall: "mirror",
      music: "",
      animal: "fish",
      plant: "seeds",
    },
    owned: {
      bookshelf: ["brown", "black"],
      books: ["standard"],
      wall: ["mirror"],
      music: [],
      animal: ["fish"],
      plant: ["seeds"],
    },
  },
  settings: {},
};

export default STORE;
