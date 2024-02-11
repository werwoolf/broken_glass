import { line } from "./types";
import { generateDividers } from "./utils/generateDividers";
import { getRandNumber } from "./utils/getRandNumber";
import { findShapeApexes } from "./utils/findShapeApexes";
import { findCleanLines } from "./utils/findCleanLines";
import { Shape } from "./Shape";
import { motion } from "./utils/motion";

const canvas = document.querySelector("canvas");

if (!canvas) throw "Canvas not found";

const ctx = canvas.getContext("2d");

if (!ctx) throw "Canvas context not found";

const { height: canvasHeight, width: canvasWidth } = canvas;

// initial field size (1/4 from full area)
const width = canvasWidth / 2;
const height = canvasHeight / 2;

// offset to put initial picture in centre
const xOffset = width / 2;
const yOffset = height / 2;

// config
const MIN_DIVIDERS_COUNT = 35;
const MAX_DIVIDERS_COUNT = 40;
const ANIMATION_DURATION_MS = 1000;
const TARGET_FPS = 60;
const FRAMES_COUNT = (ANIMATION_DURATION_MS / 1000) * TARGET_FPS;
const FRAME_TIME_MS = 1000 / TARGET_FPS;

// field apexes
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

// generate random lines to divide canvas
const dividersCoords = generateDividers(
  getRandNumber(MIN_DIVIDERS_COUNT, MAX_DIVIDERS_COUNT),
  height,
  width,
  SIDES_COORDS
);

const allLines = [...SIDES_COORDS, ...dividersCoords];
const cleanLines = findCleanLines(allLines, width);

// create shapes using lines
const shapes = cleanLines.map((line) => new Shape(
  findShapeApexes(line, cleanLines),
  ctx,
  { x: xOffset, y: yOffset }
));

// move shapes
motion(shapes, ctx, canvasWidth, canvasHeight, FRAMES_COUNT, FRAME_TIME_MS);
