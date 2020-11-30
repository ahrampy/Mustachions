import { AsyncStorage } from "react-native";

const STORE = {
  timeOfDay: 0,
  days: 0,
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
  fetchStorage: async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@game_Data");
      const data = jsonValue != null ? JSON.parse(jsonValue) : null;
      if (!data) {
        STATE.updateStorage();
      } else {
        STATE.mapState(data, STORE);
      }
      return true;
    } catch (e) {
      console.log("local storage data fetchStorage failed ~~ " + e.message);
      return false;
    }
  },
  updateStorage: async () => {
    try {
      const jsonValue = JSON.stringify(STORE);
      await AsyncStorage.setItem("@game_Data", jsonValue);
      return true;
    } catch (e) {
      console.log("error saving to local storage ~~ " + e.message);
      return false;
    }
  },
  mapState: (data, obj) => {
    for (let key in data) {
      if (Array.isArray(data[key])) {
        obj[key] = data[key].slice(0);
      } else if (typeof data[key] === "object" && data[key] !== null) {
        STATE.mapState(data[key], obj[key]);
      } else {
        obj[key] = data[key];
      }
    }
  },
  get: (path) => {
    path = path.split("/");
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
  set: (path, value) => {
    path = path.split("/");
    let dest = STORE;
    while (path.length > 1) {
      dest = dest[path.shift()];
    }
    if (dest[path[0]] !== undefined) {
      dest[path[0]] = value;
      STATE.updateStorage();
      return true;
    } else {
      return false;
    }
  },
  addItem: (category, type) => {
    const arr = STORE.items.owned[category];
    if (Array.isArray(arr)) {
      arr.push(type);
      STATE.updateStorage();
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
