interface ELEMENTS {
 [key: string]: {
   modes: boolean,
   size: number,
   tiles: number,
   position: object,
   range: object,
   src: object,
 }
}

const ELEMENTS = {
  books: {
    modes: false,
    size: 0.14,
    tiles: 1,
    position: { top: 34, left: 9 },
    range: { min: 0, max: 0 },
    src: ["books"],
  },
  mirror: {
    modes: false,
    size: 0.13,
    tiles: 1,
    position: { top: 35, left: 35 },
    range: { min: 0, max: 0 },
    src: ["mirror"],
  },
  piano: {
    modes: false,
    size: 0.35,
    tiles: 1,
    position: { top: 50, left: 35 },
    range: { min: 0, max: 0 },
    src: ["piano"],
  },
  speaker: {
    modes: false,
    size: 0.18,
    tiles: 1,
    position: { top: 53, left: 45 },
    range: { min: 0, max: 0 },
    src: ["speaker"],
  },
  lamp: {
    modes: true,
    size: 0.5,
    tiles: 1,
    position: { top: 35, left: 60 },
    range: { min: 0, max: 0 },
    src: ["lampDay", "lampNight"],
  },
  fish: {
    modes: false,
    size: 0.15,
    tiles: 1,
    position: { top: 60, left: 92 },
    range: { min: 0, max: 0 },
    src: ["fish"],
  },
  seeds: {
    modes: false,
    size: 0.08,
    tiles: 4,
    position: { top: 39.5, left: 77 },
    range: { min: 0, max: 12 },
    src: ["seeds"],
  },
  computer: {
    modes: true,
    size: 0.22,
    tiles: 1,
    position: { top: 55, left: 35 },
    range: { min: 0, max: 0 },
    src: ["computerDay", "computerNight"],
  },
};

export { ELEMENTS };
