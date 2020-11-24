import { AsyncStorage } from "react-native";

const STORE = {
  timeOfDay: 0,
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

const STATE = {
  get: async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@game_Data");
      const data = jsonValue != null ? JSON.parse(jsonValue) : null;
      if (!data) STATE.set();
      else STATE.map(data, STORE);
      return true;
    } catch (e) {
      console.log("local storage data fetch failed ~~ " + e.message);
      return false;
    }
  },
  set: async () => {
    try {
      const jsonValue = JSON.stringify(STORE);
      await AsyncStorage.setItem("@game_Data", jsonValue);
      return true;
    } catch (e) {
      console.log("error saving to local storage ~~ " + e.message);
      return false;
    }
  },
  map: (data, obj) => {
    for (let key in data) {
      if (Array.isArray(data[key])) {
        obj[key] = data[key].slice(0);
      } else if (typeof data[key] === "object" && data[key] !== null) {
        STATE.map(data[key], obj[key]);
      } else {
        obj[key] = data[key];
      }
    }
  },
  check: (path) => {
    let dest = STORE;
    while (path.length > 1) {
      dest = dest[path.shift()];
    }
    if (dest[path[0]] !== undefined) {
      return dest[path[0]];
    } else {
      return false;
    }
  },
  update: (path, value) => {
    let dest = STORE;
    while (path.length > 1) {
      dest = dest[path.shift()];
    }
    if (dest[path[0]] !== undefined) {
      dest[path[0]] = value;
      STATE.set();
      return true;
    } else {
      return false;
    }
  },
  addItem: (category, type) => {
    const arr = STORE.items.owned[category];
    if (Array.isArray(arr)) {
      arr.push(type);
      STATE.set();
      return true;
    } else {
      return false;
    }
  },
  checkItems: (category, type) => {
    const arr = STORE.items.owned[category];
    if (Array.isArray(arr) && arr.includes(type)) {
      return true;
    } else {
      return false;
    }
  },
};

export default STATE;
