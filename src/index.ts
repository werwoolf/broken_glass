import { line } from "./types";
import { generateDividers } from "./utils/generateDividers";
import { getRandNumber } from "./utils/getRandNumber";
import { findShapeApexes } from "./utils/findShapeApexes";
import { findCleanLines } from "./utils/findCleanLines";
import { Shape } from "./Shape";
import { motion } from "./utils/motion";

const canvas = document.querySelector("canvas");

if (!canvas) {
  throw "Canvas not found"
}

const ctx = canvas.getContext("2d");

if (!ctx) {
  throw "Canvas context not found"
}

// const base: line = [{ x: 0, y: 250 }, { x: 400, y: 250 }];
//
// // left
// console.log(findAngle(base, [{ x: 400, y: 250 }, { x: 400, y: 0 }]))
//
// // straight
// console.log(findAngle(base, [{ x: 400, y: 250 }, { x: 500, y: 250 }]))
//
// // right
// console.log(findAngle(base, [{ x: 400, y: 250 }, { x: 400, y: 500 }]))

// console.log(findAngle(
//   [{ x: 447, y: 217 }, { x: 0, y: 390 }],
//   [{ x: 0, y: 390 }, { x: 0, y: 500 }]
// ))
//
// console.log(findAngle(
//   [{ x: 447, y: 217 }, { x: 0, y: 390 }],
//   [{ x: 0, y: 390 }, { x: 0, y: 0 }]
// ))

console.log(getRandNumber(1, 4))
console.log(getRandNumber(1, 4))
console.log(getRandNumber(1, 4))
console.log(getRandNumber(1, 4))

const { height: canvasHeight, width: canvasWidth } = canvas;

const width = canvasWidth / 2;
const height = canvasHeight / 2;

const xOffset = width / 2;
const yOffset = height / 2;

const MIN_DIVIDERS_COUNT = 30;
const MAX_DIVIDERS_COUNT = 30;

const ANIMATION_DURATION_MS = 1000;
const TARGET_FPS = 60;
const FRAMES_COUNT = (ANIMATION_DURATION_MS / 1000) * TARGET_FPS;
const FRAME_TIME_MS = 1000 / TARGET_FPS;

const TOP_LEFT_CORNER = { x: 0, y: 0 };
const TOP_RIGHT_CORNER = { x: width, y: 0 };
const BOTTOM_RIGHT_CORNER = { x: width, y: height };
const BOTTOM_LEFT_CORNER = { x: 0, y: height };

const SIDES_COORDS: Array<line> = [
  [TOP_LEFT_CORNER, TOP_RIGHT_CORNER], // top line
  [TOP_RIGHT_CORNER, BOTTOM_RIGHT_CORNER], // right line
  [BOTTOM_RIGHT_CORNER, BOTTOM_LEFT_CORNER], // bottom line
  [BOTTOM_LEFT_CORNER, TOP_LEFT_CORNER], // left line
];

const dividersCoords = generateDividers(
  getRandNumber(MIN_DIVIDERS_COUNT, MAX_DIVIDERS_COUNT),
  height,
  width,
  SIDES_COORDS
);

const allLines = [...SIDES_COORDS, ...dividersCoords];
const cleanLines = findCleanLines(allLines, width);

const shapes = cleanLines.map((line) => new Shape(
  findShapeApexes(line, cleanLines),
  ctx,
  { x: xOffset, y: yOffset }
));

motion(
  shapes, ctx, canvasWidth, canvasHeight, FRAMES_COUNT, FRAME_TIME_MS
);
