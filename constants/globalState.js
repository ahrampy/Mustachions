import { AsyncStorage } from "react-native";

const STORE = {
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
    } catch (e) {
      console.log("local storage data fetch failed ~~ " + e.message);
    }
  },
  set: async () => {
    try {
      const jsonValue = JSON.stringify(STORE);
      await AsyncStorage.setItem("@game_Data", jsonValue);
    } catch (e) {
      console.log("error saving to local storage ~~ " + e.message);
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
  update: (path, value) => {
    let dest = STORE;
    while (path.length > 1) {
      dest = dest[path.shift()];
    }
    if (dest[path[0]]) {
      dest[path[0]] = value;
      return true;
    } else {
      return false;
    }
  },
  addItem: (category, type) => {
    const arr = STORE.items.owned[category];
    if (Array.isArray(arr)) {
      arr.push(type);
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
