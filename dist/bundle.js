/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/utils/Shape.ts":
/*!****************************!*\
  !*** ./src/utils/Shape.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Shape = void 0;
const rand_1 = __webpack_require__(/*! ./rand */ "./src/utils/rand.ts");
class Shape {
    constructor(apexes, canvasCtx, initOffset) {
        this.apexes = apexes;
        this.canvasCtx = canvasCtx;
        this.initOffset = initOffset;
        this.color = this.generateColor();
        this.avgCenterOffset = this.findAvgCenterOffset();
    }
    draw(offset) {
        const { x: xOffset, y: yOffset } = offset;
        this.apexes.forEach(({ x, y }, index) => {
            if (index === 0) {
                this.canvasCtx.beginPath();
                this.canvasCtx.moveTo(x + xOffset, y + yOffset);
            }
            else {
                this.canvasCtx.lineTo(x + xOffset, y + yOffset);
            }
        });
        this.canvasCtx.fillStyle = this.color;
        this.canvasCtx.fill();
    }
    move(offsetPercent) {
        const resolveXOffset = this.initOffset.x + (this.avgCenterOffset.x * offsetPercent);
        const resolveYOffset = this.initOffset.y + (this.avgCenterOffset.y * offsetPercent);
        this.draw({
            x: resolveXOffset,
            y: resolveYOffset
        });
    }
    findAvgCoords() {
        const xs = this.apexes.map(({ x }) => x);
        const ys = this.apexes.map(({ y }) => y);
        const minX = Math.min(...xs);
        const maxX = Math.max(...xs);
        const minY = Math.min(...ys);
        const maxY = Math.max(...ys);
        const averageX = (minX + maxX) / 2;
        const averageY = (minY + maxY) / 2;
        return { x: averageX, y: averageY };
    }
    findAvgCenterOffset() {
        const avgCords = this.findAvgCoords();
        const isTouchedXLeftBorder = this.apexes.some(({ x }) => x === 0);
        const isTouchedXRightBorder = this.apexes.some(({ x }) => x === this.initOffset.x * 2);
        const isTouchedYTopBorder = this.apexes.some(({ y }) => y === 0);
        const isTouchedYBottomBorder = this.apexes.some(({ y }) => y === this.initOffset.y * 2);
        let xOffset = avgCords.x - this.initOffset.x;
        let yOffset = avgCords.y - this.initOffset.y;
        if (isTouchedXLeftBorder)
            xOffset = -this.initOffset.x;
        if (isTouchedXRightBorder)
            xOffset = this.initOffset.x;
        if (isTouchedYTopBorder)
            yOffset = -this.initOffset.y;
        if (isTouchedYBottomBorder)
            yOffset = this.initOffset.y;
        return { x: xOffset, y: yOffset };
    }
    generateColor() {
        return `rgb(${(0, rand_1.getRand)(0, 255)}, ${(0, rand_1.getRand)(0, 255)}, ${(0, rand_1.getRand)(0, 255)})`;
    }
}
exports.Shape = Shape;


/***/ }),

/***/ "./src/utils/findAngle.ts":
/*!********************************!*\
  !*** ./src/utils/findAngle.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.findAngle = void 0;
function findAngle(line1, _line2) {
    const line2 = [
        _line2.find(({ x, y }) => x === line1[1].x && y === line1[1].y) || _line2[0],
        _line2.find(({ x, y }) => x !== line1[1].x || y !== line1[1].y) || _line2[1]
    ];
    let vector1 = { x: line1[1].x - line1[0].x, y: line1[1].y - line1[0].y };
    let vector2 = { x: line2[1].x - line2[0].x, y: line2[1].y - line2[0].y };
    // Длины векторов
    let length1 = Math.sqrt(vector1.x * vector1.x + vector1.y * vector1.y);
    let length2 = Math.sqrt(vector2.x * vector2.x + vector2.y * vector2.y);
    // Скалярное произведение векторов
    let dotProduct = vector1.x * vector2.x + vector1.y * vector2.y;
    // Косинус угла между векторами
    let cosAngle = dotProduct / (length1 * length2);
    // Угол в радианах
    let angleRad = Math.acos(cosAngle);
    // Угол в градусах
    let angleDeg = angleRad * (180 / Math.PI);
    // Определение направления поворота и знака угла
    let crossProduct = vector1.x * vector2.y - vector1.y * vector2.x;
    let sign = Math.sign(crossProduct);
    // Перевод угла в диапазон от -179 до 179
    if (angleDeg > 179) {
        angleDeg -= 360;
    }
    // Учитываем знак направления поворота
    return angleDeg * sign;
    // const vector1 = { x: line1[1].x - line1[0].x, y: line1[1].y - line1[0].y };
    // const vector2 = { x: line2[1].x - line2[0].x, y: line2[1].y - line2[0].y };
    //
    // const dotProduct = vector1.x * vector2.x + vector1.y * vector2.y;
    // const magnitude1 = Math.sqrt(vector1.x ** 2 + vector1.y ** 2);
    // const magnitude2 = Math.sqrt(vector2.x ** 2 + vector2.y ** 2);
    // const cosTheta = dotProduct / (magnitude1 * magnitude2);
    //
    // const radians = Math.acos(cosTheta);
    //
    // const degrees = radians * (180 / Math.PI);
    //
    // const crossProduct = vector1.x * vector2.y - vector1.y * vector2.x;
    // const sign = crossProduct < 0 ? -1 : 1;
    //
    // return degrees * sign;
    // const { x: x1, y: y1 } = line1[0];
    // const { x: x2, y: y2 } = line1[1];
    // const { x: x3, y: y3 } = line2[0];
    // const { x: x4, y: y4 } = line2[1];
    //
    // const dx1 = x2 - x1;
    // const dy1 = y2 - y1;
    // const dx2 = x4 - x3;
    // const dy2 = y4 - y3;
    //
    // const radians1 = Math.atan2(dy1, dx1);
    // const radians2 = Math.atan2(dy2, dx2);
    //
    //
    // let angleDegrees = (radians2 - radians1) * (180 / Math.PI);
    //
    // if (angleDegrees < 0) angleDegrees = Math.abs(angleDegrees);
    //
    // // if (angleDegrees < 0) angleDegrees += 360;
    //
    // return angleDegrees;
    // const vector1 = {
    //   x: line1[0].x - line1[1].x,
    //   y: line1[0].y - line1[1].y
    // };
    // const vector2 = {
    //   x: line2[0].x - line2[1].x,
    //   y: line2[0].y - line2[1].y
    // };
    //
    // const dotProduct = vector1.x * vector2.x + vector1.y * vector2.y;
    // const magnitude1 = Math.sqrt(vector1.x * vector1.x + vector1.y * vector1.y);
    // const magnitude2 = Math.sqrt(vector2.x * vector2.x + vector2.y * vector2.y);
    // const cosTheta = dotProduct / (magnitude1 * magnitude2);
    //
    // const angleRadians = Math.acos(cosTheta);
    //
    // // const angleRadians = Math.atan2(vector2.y, vector2.x) - Math.atan2(vector1.y, vector1.x);
    //
    // return  angleRadians * (180 / Math.PI);
}
exports.findAngle = findAngle;


/***/ }),

/***/ "./src/utils/findCleanLines.ts":
/*!*************************************!*\
  !*** ./src/utils/findCleanLines.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.findCleanLines = void 0;
const findLineIntersections_1 = __webpack_require__(/*! ./findLineIntersections */ "./src/utils/findLineIntersections.ts");
function findCleanLines(lines, maxCoord) {
    const res = [];
    lines.forEach((_, index) => {
        const lineIntersections = (0, findLineIntersections_1.findLineIntersections)(lines, index, maxCoord);
        let startCoord = lineIntersections[0];
        lineIntersections.slice(1).forEach(({ x, y }) => {
            if (startCoord && (startCoord.x !== x || startCoord.y !== y)) {
                res.push([startCoord, { x, y }]);
                startCoord = { x, y };
            }
        });
    });
    return res;
}
exports.findCleanLines = findCleanLines;


/***/ }),

/***/ "./src/utils/findLineIntersections.ts":
/*!********************************************!*\
  !*** ./src/utils/findLineIntersections.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.findLineIntersections = void 0;
function findLineIntersections(lines, index, maxCoord) {
    const res = [];
    const line = lines[index];
    const resolveLinesToCheck = [...lines];
    resolveLinesToCheck.splice(index, 1);
    resolveLinesToCheck.forEach((line2) => {
        const { x: x1A, y: y1A } = line[0];
        const { x: x1B, y: y1B } = line[1];
        const { x: x2C, y: y2C } = line2[0];
        const { x: x2D, y: y2D } = line2[1];
        const isVertical1 = x1A === x1B;
        const isVertical2 = x2C === x2D;
        let point;
        if (isVertical1 && isVertical2) {
            point = { x: x1A, y: y1A };
        }
        else if (isVertical1) {
            const slope2 = (y2D - y2C) / (x2D - x2C);
            const yIntercept2 = y2C - slope2 * x2C;
            const x = x1A;
            const y = slope2 * x + yIntercept2;
            point = { x, y };
        }
        else if (isVertical2) {
            const slope1 = (y1B - y1A) / (x1B - x1A);
            const yIntercept1 = y1A - slope1 * x1A;
            const x = x2C;
            const y = slope1 * x + yIntercept1;
            point = { x, y };
        }
        else {
            const slope1 = (y1B - y1A) / (x1B - x1A);
            const slope2 = (y2D - y2C) / (x2D - x2C);
            if (slope1 === slope2) {
                return null;
            }
            const yIntercept1 = y1A - slope1 * x1A;
            const yIntercept2 = y2C - slope2 * x2C;
            const x = (yIntercept2 - yIntercept1) / (slope1 - slope2);
            const yIntersection = slope1 * x + yIntercept1;
            point = { x: x, y: yIntersection };
        }
        const isValidX = point.x >= 0 && point.x <= maxCoord;
        const isValidY = point.y >= 0 && point.y <= maxCoord;
        if (isValidX && isValidY) {
            res.push(point);
        }
    });
    const stringified = res.map(({ x, y }) => `${x}/${y}`);
    const clear = [...new Set(stringified)].map(point => {
        const [x, y] = point.split("/");
        return { x: Math.ceil(+x), y: Math.ceil(+y) };
    });
    clear.sort(({ x: x1 }, { x: x2 }) => x1 - x2);
    clear.sort(({ y: y1 }, { y: y2 }) => y1 - y2);
    return clear;
}
exports.findLineIntersections = findLineIntersections;


/***/ }),

/***/ "./src/utils/findShapeApexes.ts":
/*!**************************************!*\
  !*** ./src/utils/findShapeApexes.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.findShapeApexes = void 0;
const findAngle_1 = __webpack_require__(/*! ./findAngle */ "./src/utils/findAngle.ts");
function findShapeApexes(startLine, cleanLines) {
    var _a, _b;
    const firstApex = startLine[0];
    const secondApex = startLine[1];
    const shapeApexes = [firstApex, secondApex];
    let count = 0; // todo: delete
    while ((firstApex.x !== ((_a = shapeApexes.at(-1)) === null || _a === void 0 ? void 0 : _a.x) || firstApex.y !== ((_b = shapeApexes.at(-1)) === null || _b === void 0 ? void 0 : _b.y)) && count < 25) {
        const previousApex = shapeApexes.at(-2) || { x: 0, y: 0 };
        const lastApex = shapeApexes.at(-1) || { x: 0, y: 0 };
        const touchedLines = cleanLines.filter(([point1, point2]) => {
            const isPoint1Matches = point1.x === (lastApex === null || lastApex === void 0 ? void 0 : lastApex.x) && point1.y === (lastApex === null || lastApex === void 0 ? void 0 : lastApex.y);
            const isPoint2Matches = point2.x === (lastApex === null || lastApex === void 0 ? void 0 : lastApex.x) && point2.y === (lastApex === null || lastApex === void 0 ? void 0 : lastApex.y);
            const isPoint1MatchesPrevious = point1.x === (previousApex === null || previousApex === void 0 ? void 0 : previousApex.x) && point1.y === (previousApex === null || previousApex === void 0 ? void 0 : previousApex.y);
            const isPoint2MatchesPrevious = point2.x === (previousApex === null || previousApex === void 0 ? void 0 : previousApex.x) && point2.y === (previousApex === null || previousApex === void 0 ? void 0 : previousApex.y);
            return (isPoint1Matches || isPoint2Matches) && !isPoint1MatchesPrevious && !isPoint2MatchesPrevious;
        });
        if (!touchedLines.length) {
            break;
        }
        const nextLine = touchedLines.reduce((res, curr) => {
            const resAngle = (0, findAngle_1.findAngle)([previousApex, lastApex], res);
            const currAngle = (0, findAngle_1.findAngle)([previousApex, lastApex], curr);
            if (resAngle === 0)
                return curr;
            // if (resAngle > 0) {
            return currAngle !== 0 && currAngle > resAngle
                ? curr
                : res;
            // } else {
            //   return currAngle !== 0 && currAngle < resAngle
            //     ? curr
            //     : res
            // }
        });
        const nextApex = (nextLine === null || nextLine === void 0 ? void 0 : nextLine.find(({ x, y }) => (lastApex === null || lastApex === void 0 ? void 0 : lastApex.x) !== x || (lastApex === null || lastApex === void 0 ? void 0 : lastApex.y) !== y)) || { x: 0, y: 0 };
        if (shapeApexes.some(({ x, y }) => nextApex.x === x && nextApex.y === y)) {
            break;
        }
        shapeApexes.push(nextApex);
        count++;
    }
    // console.log(count)
    return shapeApexes;
}
exports.findShapeApexes = findShapeApexes;


/***/ }),

/***/ "./src/utils/generateDividerSides.ts":
/*!*******************************************!*\
  !*** ./src/utils/generateDividerSides.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.generateDividerSides = void 0;
const rand_1 = __webpack_require__(/*! ./rand */ "./src/utils/rand.ts");
function generateDividerSides(SIDES_COORDS) {
    const firstSide = (0, rand_1.getRand)(1, SIDES_COORDS.length + 1);
    let secondSide = (0, rand_1.getRand)(1, SIDES_COORDS.length + 1);
    while (secondSide === firstSide) {
        secondSide = (0, rand_1.getRand)(1, SIDES_COORDS.length + 1);
    }
    return [SIDES_COORDS[firstSide - 1], SIDES_COORDS[secondSide - 1]];
}
exports.generateDividerSides = generateDividerSides;


/***/ }),

/***/ "./src/utils/generateDividers.ts":
/*!***************************************!*\
  !*** ./src/utils/generateDividers.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.generateDividers = void 0;
const generateDividerSides_1 = __webpack_require__(/*! ./generateDividerSides */ "./src/utils/generateDividerSides.ts");
const rand_1 = __webpack_require__(/*! ./rand */ "./src/utils/rand.ts");
function generateDividers(count, canvasHeight, canvasWidth, SIDES_COORDS) {
    const sides = Array(count).fill(null).map(() => (0, generateDividerSides_1.generateDividerSides)(SIDES_COORDS));
    const res = [];
    for (const [firstSide, secondSide] of sides) {
        const firstSideAdjustedSide = firstSide[0].x === firstSide[1].x
            ? "y"
            : "x";
        const secondSideAdjustedSide = secondSide[0].x === secondSide[1].x
            ? "y"
            : "x";
        const firstSideX = firstSideAdjustedSide === "x"
            ? (0, rand_1.getRand)(0, canvasWidth)
            : firstSide[0].x;
        const firstSideY = firstSideAdjustedSide === "y"
            ? (0, rand_1.getRand)(0, canvasHeight)
            : firstSide[0].y;
        const secondSideX = secondSideAdjustedSide === "x"
            ? (0, rand_1.getRand)(0, canvasWidth)
            : secondSide[0].x;
        const secondSideY = secondSideAdjustedSide === "y"
            ? (0, rand_1.getRand)(0, canvasHeight)
            : secondSide[0].y;
        res.push([
            { x: firstSideX, y: firstSideY },
            { x: secondSideX, y: secondSideY }
        ]);
    }
    return res;
}
exports.generateDividers = generateDividers;


/***/ }),

/***/ "./src/utils/rand.ts":
/*!***************************!*\
  !*** ./src/utils/rand.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getRand = void 0;
function getRand(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
exports.getRand = getRand;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const generateDividers_1 = __webpack_require__(/*! ./utils/generateDividers */ "./src/utils/generateDividers.ts");
const rand_1 = __webpack_require__(/*! ./utils/rand */ "./src/utils/rand.ts");
const findShapeApexes_1 = __webpack_require__(/*! ./utils/findShapeApexes */ "./src/utils/findShapeApexes.ts");
const findCleanLines_1 = __webpack_require__(/*! ./utils/findCleanLines */ "./src/utils/findCleanLines.ts");
const Shape_1 = __webpack_require__(/*! ./utils/Shape */ "./src/utils/Shape.ts");
const canvas = document.querySelector("canvas");
if (!canvas) {
    throw "Canvas not found";
}
const ctx = canvas.getContext("2d");
if (!ctx) {
    throw "Canvas context not found";
}
console.time("t");
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
const { height: canvasHeight, width: canvasWidth } = canvas;
const width = canvasWidth / 2;
const height = canvasHeight / 2;
const xOffset = width / 2;
const yOffset = height / 2;
const MIN_DIVIDERS_COUNT = 100;
const MAX_DIVIDERS_COUNT = 100;
const ANIMATION_DURATION_MS = 1000;
const TARGET_FPS = 60;
const FRAMES_COUNT = (ANIMATION_DURATION_MS / 1000) * TARGET_FPS;
const FRAME_TIME_MS = 1000 / TARGET_FPS;
const TOP_LEFT_CORNER = { x: 0, y: 0 };
const TOP_RIGHT_CORNER = { x: width, y: 0 };
const BOTTOM_RIGHT_CORNER = { x: width, y: height };
const BOTTOM_LEFT_CORNER = { x: 0, y: height };
const SIDES_COORDS = [
    [TOP_LEFT_CORNER, TOP_RIGHT_CORNER], // top line
    [TOP_RIGHT_CORNER, BOTTOM_RIGHT_CORNER], // right line
    [BOTTOM_RIGHT_CORNER, BOTTOM_LEFT_CORNER], // bottom line
    [BOTTOM_LEFT_CORNER, TOP_LEFT_CORNER], // left line
];
// const dividersCoords: Array<line> = [
//   [
//     {
//       "x": 63,
//       "y": 0
//     },
//     {
//       "x": 0,
//       "y": 107
//     }
//   ],
//   [
//     {
//       "x": 250,
//       "y": 8
//     },
//     {
//       "x": 59,
//       "y": 250
//     }
//   ],
//   [
//     {
//       "x": 0,
//       "y": 58
//     },
//     {
//       "x": 139,
//       "y": 0
//     }
//   ],
//   [
//     {
//       "x": 11,
//       "y": 250
//     },
//     {
//       "x": 0,
//       "y": 194
//     }
//   ],
//   [
//     {
//       "x": 250,
//       "y": 193
//     },
//     {
//       "x": 0,
//       "y": 24
//     }
//   ]
// ]
const dividersCoords = (0, generateDividers_1.generateDividers)((0, rand_1.getRand)(MIN_DIVIDERS_COUNT, MAX_DIVIDERS_COUNT), height, width, SIDES_COORDS);
console.log(dividersCoords);
const allLines = [...SIDES_COORDS, ...dividersCoords];
const cleanLines = (0, findCleanLines_1.findCleanLines)(allLines, width);
const shapes = cleanLines.map((line) => new Shape_1.Shape((0, findShapeApexes_1.findShapeApexes)(line, cleanLines), ctx, { x: xOffset, y: yOffset }));
shapes.forEach((shape) => {
    shape.draw({ x: xOffset, y: yOffset });
});
let i = 0;
const interval = setInterval(() => {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    shapes.forEach(shape => shape.move(i / FRAMES_COUNT));
    i++;
    if (i > FRAMES_COUNT) {
        clearInterval(interval);
    }
}, FRAME_TIME_MS);
console.timeEnd("t");
// drawDividers(ctx, [...dividersCoords, ...[...SIDES_COORDS, ...dividersCoords]])

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QzNCLDhCQUE4QjtBQUM5Qiw2QkFBNkI7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwySEFBMkgsd0JBQXdCO0FBQ25KO0FBQ0EsaUJBQWlCLHdCQUF3QjtBQUN6QyxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYnJva2VuZ2xhc3MvLi9zcmMvdXRpbHMvU2hhcGUudHMiLCJ3ZWJwYWNrOi8vYnJva2VuZ2xhc3MvLi9zcmMvdXRpbHMvZmluZEFuZ2xlLnRzIiwid2VicGFjazovL2Jyb2tlbmdsYXNzLy4vc3JjL3V0aWxzL2ZpbmRDbGVhbkxpbmVzLnRzIiwid2VicGFjazovL2Jyb2tlbmdsYXNzLy4vc3JjL3V0aWxzL2ZpbmRMaW5lSW50ZXJzZWN0aW9ucy50cyIsIndlYnBhY2s6Ly9icm9rZW5nbGFzcy8uL3NyYy91dGlscy9maW5kU2hhcGVBcGV4ZXMudHMiLCJ3ZWJwYWNrOi8vYnJva2VuZ2xhc3MvLi9zcmMvdXRpbHMvZ2VuZXJhdGVEaXZpZGVyU2lkZXMudHMiLCJ3ZWJwYWNrOi8vYnJva2VuZ2xhc3MvLi9zcmMvdXRpbHMvZ2VuZXJhdGVEaXZpZGVycy50cyIsIndlYnBhY2s6Ly9icm9rZW5nbGFzcy8uL3NyYy91dGlscy9yYW5kLnRzIiwid2VicGFjazovL2Jyb2tlbmdsYXNzL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2Jyb2tlbmdsYXNzLy4vc3JjL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5TaGFwZSA9IHZvaWQgMDtcbmNvbnN0IHJhbmRfMSA9IHJlcXVpcmUoXCIuL3JhbmRcIik7XG5jbGFzcyBTaGFwZSB7XG4gICAgY29uc3RydWN0b3IoYXBleGVzLCBjYW52YXNDdHgsIGluaXRPZmZzZXQpIHtcbiAgICAgICAgdGhpcy5hcGV4ZXMgPSBhcGV4ZXM7XG4gICAgICAgIHRoaXMuY2FudmFzQ3R4ID0gY2FudmFzQ3R4O1xuICAgICAgICB0aGlzLmluaXRPZmZzZXQgPSBpbml0T2Zmc2V0O1xuICAgICAgICB0aGlzLmNvbG9yID0gdGhpcy5nZW5lcmF0ZUNvbG9yKCk7XG4gICAgICAgIHRoaXMuYXZnQ2VudGVyT2Zmc2V0ID0gdGhpcy5maW5kQXZnQ2VudGVyT2Zmc2V0KCk7XG4gICAgfVxuICAgIGRyYXcob2Zmc2V0KSB7XG4gICAgICAgIGNvbnN0IHsgeDogeE9mZnNldCwgeTogeU9mZnNldCB9ID0gb2Zmc2V0O1xuICAgICAgICB0aGlzLmFwZXhlcy5mb3JFYWNoKCh7IHgsIHkgfSwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIGlmIChpbmRleCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuY2FudmFzQ3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICAgICAgICAgIHRoaXMuY2FudmFzQ3R4Lm1vdmVUbyh4ICsgeE9mZnNldCwgeSArIHlPZmZzZXQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jYW52YXNDdHgubGluZVRvKHggKyB4T2Zmc2V0LCB5ICsgeU9mZnNldCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmNhbnZhc0N0eC5maWxsU3R5bGUgPSB0aGlzLmNvbG9yO1xuICAgICAgICB0aGlzLmNhbnZhc0N0eC5maWxsKCk7XG4gICAgfVxuICAgIG1vdmUob2Zmc2V0UGVyY2VudCkge1xuICAgICAgICBjb25zdCByZXNvbHZlWE9mZnNldCA9IHRoaXMuaW5pdE9mZnNldC54ICsgKHRoaXMuYXZnQ2VudGVyT2Zmc2V0LnggKiBvZmZzZXRQZXJjZW50KTtcbiAgICAgICAgY29uc3QgcmVzb2x2ZVlPZmZzZXQgPSB0aGlzLmluaXRPZmZzZXQueSArICh0aGlzLmF2Z0NlbnRlck9mZnNldC55ICogb2Zmc2V0UGVyY2VudCk7XG4gICAgICAgIHRoaXMuZHJhdyh7XG4gICAgICAgICAgICB4OiByZXNvbHZlWE9mZnNldCxcbiAgICAgICAgICAgIHk6IHJlc29sdmVZT2Zmc2V0XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBmaW5kQXZnQ29vcmRzKCkge1xuICAgICAgICBjb25zdCB4cyA9IHRoaXMuYXBleGVzLm1hcCgoeyB4IH0pID0+IHgpO1xuICAgICAgICBjb25zdCB5cyA9IHRoaXMuYXBleGVzLm1hcCgoeyB5IH0pID0+IHkpO1xuICAgICAgICBjb25zdCBtaW5YID0gTWF0aC5taW4oLi4ueHMpO1xuICAgICAgICBjb25zdCBtYXhYID0gTWF0aC5tYXgoLi4ueHMpO1xuICAgICAgICBjb25zdCBtaW5ZID0gTWF0aC5taW4oLi4ueXMpO1xuICAgICAgICBjb25zdCBtYXhZID0gTWF0aC5tYXgoLi4ueXMpO1xuICAgICAgICBjb25zdCBhdmVyYWdlWCA9IChtaW5YICsgbWF4WCkgLyAyO1xuICAgICAgICBjb25zdCBhdmVyYWdlWSA9IChtaW5ZICsgbWF4WSkgLyAyO1xuICAgICAgICByZXR1cm4geyB4OiBhdmVyYWdlWCwgeTogYXZlcmFnZVkgfTtcbiAgICB9XG4gICAgZmluZEF2Z0NlbnRlck9mZnNldCgpIHtcbiAgICAgICAgY29uc3QgYXZnQ29yZHMgPSB0aGlzLmZpbmRBdmdDb29yZHMoKTtcbiAgICAgICAgY29uc3QgaXNUb3VjaGVkWExlZnRCb3JkZXIgPSB0aGlzLmFwZXhlcy5zb21lKCh7IHggfSkgPT4geCA9PT0gMCk7XG4gICAgICAgIGNvbnN0IGlzVG91Y2hlZFhSaWdodEJvcmRlciA9IHRoaXMuYXBleGVzLnNvbWUoKHsgeCB9KSA9PiB4ID09PSB0aGlzLmluaXRPZmZzZXQueCAqIDIpO1xuICAgICAgICBjb25zdCBpc1RvdWNoZWRZVG9wQm9yZGVyID0gdGhpcy5hcGV4ZXMuc29tZSgoeyB5IH0pID0+IHkgPT09IDApO1xuICAgICAgICBjb25zdCBpc1RvdWNoZWRZQm90dG9tQm9yZGVyID0gdGhpcy5hcGV4ZXMuc29tZSgoeyB5IH0pID0+IHkgPT09IHRoaXMuaW5pdE9mZnNldC55ICogMik7XG4gICAgICAgIGxldCB4T2Zmc2V0ID0gYXZnQ29yZHMueCAtIHRoaXMuaW5pdE9mZnNldC54O1xuICAgICAgICBsZXQgeU9mZnNldCA9IGF2Z0NvcmRzLnkgLSB0aGlzLmluaXRPZmZzZXQueTtcbiAgICAgICAgaWYgKGlzVG91Y2hlZFhMZWZ0Qm9yZGVyKVxuICAgICAgICAgICAgeE9mZnNldCA9IC10aGlzLmluaXRPZmZzZXQueDtcbiAgICAgICAgaWYgKGlzVG91Y2hlZFhSaWdodEJvcmRlcilcbiAgICAgICAgICAgIHhPZmZzZXQgPSB0aGlzLmluaXRPZmZzZXQueDtcbiAgICAgICAgaWYgKGlzVG91Y2hlZFlUb3BCb3JkZXIpXG4gICAgICAgICAgICB5T2Zmc2V0ID0gLXRoaXMuaW5pdE9mZnNldC55O1xuICAgICAgICBpZiAoaXNUb3VjaGVkWUJvdHRvbUJvcmRlcilcbiAgICAgICAgICAgIHlPZmZzZXQgPSB0aGlzLmluaXRPZmZzZXQueTtcbiAgICAgICAgcmV0dXJuIHsgeDogeE9mZnNldCwgeTogeU9mZnNldCB9O1xuICAgIH1cbiAgICBnZW5lcmF0ZUNvbG9yKCkge1xuICAgICAgICByZXR1cm4gYHJnYigkeygwLCByYW5kXzEuZ2V0UmFuZCkoMCwgMjU1KX0sICR7KDAsIHJhbmRfMS5nZXRSYW5kKSgwLCAyNTUpfSwgJHsoMCwgcmFuZF8xLmdldFJhbmQpKDAsIDI1NSl9KWA7XG4gICAgfVxufVxuZXhwb3J0cy5TaGFwZSA9IFNoYXBlO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmZpbmRBbmdsZSA9IHZvaWQgMDtcbmZ1bmN0aW9uIGZpbmRBbmdsZShsaW5lMSwgX2xpbmUyKSB7XG4gICAgY29uc3QgbGluZTIgPSBbXG4gICAgICAgIF9saW5lMi5maW5kKCh7IHgsIHkgfSkgPT4geCA9PT0gbGluZTFbMV0ueCAmJiB5ID09PSBsaW5lMVsxXS55KSB8fCBfbGluZTJbMF0sXG4gICAgICAgIF9saW5lMi5maW5kKCh7IHgsIHkgfSkgPT4geCAhPT0gbGluZTFbMV0ueCB8fCB5ICE9PSBsaW5lMVsxXS55KSB8fCBfbGluZTJbMV1cbiAgICBdO1xuICAgIGxldCB2ZWN0b3IxID0geyB4OiBsaW5lMVsxXS54IC0gbGluZTFbMF0ueCwgeTogbGluZTFbMV0ueSAtIGxpbmUxWzBdLnkgfTtcbiAgICBsZXQgdmVjdG9yMiA9IHsgeDogbGluZTJbMV0ueCAtIGxpbmUyWzBdLngsIHk6IGxpbmUyWzFdLnkgLSBsaW5lMlswXS55IH07XG4gICAgLy8g0JTQu9C40L3RiyDQstC10LrRgtC+0YDQvtCyXG4gICAgbGV0IGxlbmd0aDEgPSBNYXRoLnNxcnQodmVjdG9yMS54ICogdmVjdG9yMS54ICsgdmVjdG9yMS55ICogdmVjdG9yMS55KTtcbiAgICBsZXQgbGVuZ3RoMiA9IE1hdGguc3FydCh2ZWN0b3IyLnggKiB2ZWN0b3IyLnggKyB2ZWN0b3IyLnkgKiB2ZWN0b3IyLnkpO1xuICAgIC8vINCh0LrQsNC70Y/RgNC90L7QtSDQv9GA0L7QuNC30LLQtdC00LXQvdC40LUg0LLQtdC60YLQvtGA0L7QslxuICAgIGxldCBkb3RQcm9kdWN0ID0gdmVjdG9yMS54ICogdmVjdG9yMi54ICsgdmVjdG9yMS55ICogdmVjdG9yMi55O1xuICAgIC8vINCa0L7RgdC40L3Rg9GBINGD0LPQu9CwINC80LXQttC00YMg0LLQtdC60YLQvtGA0LDQvNC4XG4gICAgbGV0IGNvc0FuZ2xlID0gZG90UHJvZHVjdCAvIChsZW5ndGgxICogbGVuZ3RoMik7XG4gICAgLy8g0KPQs9C+0Lsg0LIg0YDQsNC00LjQsNC90LDRhVxuICAgIGxldCBhbmdsZVJhZCA9IE1hdGguYWNvcyhjb3NBbmdsZSk7XG4gICAgLy8g0KPQs9C+0Lsg0LIg0LPRgNCw0LTRg9GB0LDRhVxuICAgIGxldCBhbmdsZURlZyA9IGFuZ2xlUmFkICogKDE4MCAvIE1hdGguUEkpO1xuICAgIC8vINCe0L/RgNC10LTQtdC70LXQvdC40LUg0L3QsNC/0YDQsNCy0LvQtdC90LjRjyDQv9C+0LLQvtGA0L7RgtCwINC4INC30L3QsNC60LAg0YPQs9C70LBcbiAgICBsZXQgY3Jvc3NQcm9kdWN0ID0gdmVjdG9yMS54ICogdmVjdG9yMi55IC0gdmVjdG9yMS55ICogdmVjdG9yMi54O1xuICAgIGxldCBzaWduID0gTWF0aC5zaWduKGNyb3NzUHJvZHVjdCk7XG4gICAgLy8g0J/QtdGA0LXQstC+0LQg0YPQs9C70LAg0LIg0LTQuNCw0L/QsNC30L7QvSDQvtGCIC0xNzkg0LTQviAxNzlcbiAgICBpZiAoYW5nbGVEZWcgPiAxNzkpIHtcbiAgICAgICAgYW5nbGVEZWcgLT0gMzYwO1xuICAgIH1cbiAgICAvLyDQo9GH0LjRgtGL0LLQsNC10Lwg0LfQvdCw0Log0L3QsNC/0YDQsNCy0LvQtdC90LjRjyDQv9C+0LLQvtGA0L7RgtCwXG4gICAgcmV0dXJuIGFuZ2xlRGVnICogc2lnbjtcbiAgICAvLyBjb25zdCB2ZWN0b3IxID0geyB4OiBsaW5lMVsxXS54IC0gbGluZTFbMF0ueCwgeTogbGluZTFbMV0ueSAtIGxpbmUxWzBdLnkgfTtcbiAgICAvLyBjb25zdCB2ZWN0b3IyID0geyB4OiBsaW5lMlsxXS54IC0gbGluZTJbMF0ueCwgeTogbGluZTJbMV0ueSAtIGxpbmUyWzBdLnkgfTtcbiAgICAvL1xuICAgIC8vIGNvbnN0IGRvdFByb2R1Y3QgPSB2ZWN0b3IxLnggKiB2ZWN0b3IyLnggKyB2ZWN0b3IxLnkgKiB2ZWN0b3IyLnk7XG4gICAgLy8gY29uc3QgbWFnbml0dWRlMSA9IE1hdGguc3FydCh2ZWN0b3IxLnggKiogMiArIHZlY3RvcjEueSAqKiAyKTtcbiAgICAvLyBjb25zdCBtYWduaXR1ZGUyID0gTWF0aC5zcXJ0KHZlY3RvcjIueCAqKiAyICsgdmVjdG9yMi55ICoqIDIpO1xuICAgIC8vIGNvbnN0IGNvc1RoZXRhID0gZG90UHJvZHVjdCAvIChtYWduaXR1ZGUxICogbWFnbml0dWRlMik7XG4gICAgLy9cbiAgICAvLyBjb25zdCByYWRpYW5zID0gTWF0aC5hY29zKGNvc1RoZXRhKTtcbiAgICAvL1xuICAgIC8vIGNvbnN0IGRlZ3JlZXMgPSByYWRpYW5zICogKDE4MCAvIE1hdGguUEkpO1xuICAgIC8vXG4gICAgLy8gY29uc3QgY3Jvc3NQcm9kdWN0ID0gdmVjdG9yMS54ICogdmVjdG9yMi55IC0gdmVjdG9yMS55ICogdmVjdG9yMi54O1xuICAgIC8vIGNvbnN0IHNpZ24gPSBjcm9zc1Byb2R1Y3QgPCAwID8gLTEgOiAxO1xuICAgIC8vXG4gICAgLy8gcmV0dXJuIGRlZ3JlZXMgKiBzaWduO1xuICAgIC8vIGNvbnN0IHsgeDogeDEsIHk6IHkxIH0gPSBsaW5lMVswXTtcbiAgICAvLyBjb25zdCB7IHg6IHgyLCB5OiB5MiB9ID0gbGluZTFbMV07XG4gICAgLy8gY29uc3QgeyB4OiB4MywgeTogeTMgfSA9IGxpbmUyWzBdO1xuICAgIC8vIGNvbnN0IHsgeDogeDQsIHk6IHk0IH0gPSBsaW5lMlsxXTtcbiAgICAvL1xuICAgIC8vIGNvbnN0IGR4MSA9IHgyIC0geDE7XG4gICAgLy8gY29uc3QgZHkxID0geTIgLSB5MTtcbiAgICAvLyBjb25zdCBkeDIgPSB4NCAtIHgzO1xuICAgIC8vIGNvbnN0IGR5MiA9IHk0IC0geTM7XG4gICAgLy9cbiAgICAvLyBjb25zdCByYWRpYW5zMSA9IE1hdGguYXRhbjIoZHkxLCBkeDEpO1xuICAgIC8vIGNvbnN0IHJhZGlhbnMyID0gTWF0aC5hdGFuMihkeTIsIGR4Mik7XG4gICAgLy9cbiAgICAvL1xuICAgIC8vIGxldCBhbmdsZURlZ3JlZXMgPSAocmFkaWFuczIgLSByYWRpYW5zMSkgKiAoMTgwIC8gTWF0aC5QSSk7XG4gICAgLy9cbiAgICAvLyBpZiAoYW5nbGVEZWdyZWVzIDwgMCkgYW5nbGVEZWdyZWVzID0gTWF0aC5hYnMoYW5nbGVEZWdyZWVzKTtcbiAgICAvL1xuICAgIC8vIC8vIGlmIChhbmdsZURlZ3JlZXMgPCAwKSBhbmdsZURlZ3JlZXMgKz0gMzYwO1xuICAgIC8vXG4gICAgLy8gcmV0dXJuIGFuZ2xlRGVncmVlcztcbiAgICAvLyBjb25zdCB2ZWN0b3IxID0ge1xuICAgIC8vICAgeDogbGluZTFbMF0ueCAtIGxpbmUxWzFdLngsXG4gICAgLy8gICB5OiBsaW5lMVswXS55IC0gbGluZTFbMV0ueVxuICAgIC8vIH07XG4gICAgLy8gY29uc3QgdmVjdG9yMiA9IHtcbiAgICAvLyAgIHg6IGxpbmUyWzBdLnggLSBsaW5lMlsxXS54LFxuICAgIC8vICAgeTogbGluZTJbMF0ueSAtIGxpbmUyWzFdLnlcbiAgICAvLyB9O1xuICAgIC8vXG4gICAgLy8gY29uc3QgZG90UHJvZHVjdCA9IHZlY3RvcjEueCAqIHZlY3RvcjIueCArIHZlY3RvcjEueSAqIHZlY3RvcjIueTtcbiAgICAvLyBjb25zdCBtYWduaXR1ZGUxID0gTWF0aC5zcXJ0KHZlY3RvcjEueCAqIHZlY3RvcjEueCArIHZlY3RvcjEueSAqIHZlY3RvcjEueSk7XG4gICAgLy8gY29uc3QgbWFnbml0dWRlMiA9IE1hdGguc3FydCh2ZWN0b3IyLnggKiB2ZWN0b3IyLnggKyB2ZWN0b3IyLnkgKiB2ZWN0b3IyLnkpO1xuICAgIC8vIGNvbnN0IGNvc1RoZXRhID0gZG90UHJvZHVjdCAvIChtYWduaXR1ZGUxICogbWFnbml0dWRlMik7XG4gICAgLy9cbiAgICAvLyBjb25zdCBhbmdsZVJhZGlhbnMgPSBNYXRoLmFjb3MoY29zVGhldGEpO1xuICAgIC8vXG4gICAgLy8gLy8gY29uc3QgYW5nbGVSYWRpYW5zID0gTWF0aC5hdGFuMih2ZWN0b3IyLnksIHZlY3RvcjIueCkgLSBNYXRoLmF0YW4yKHZlY3RvcjEueSwgdmVjdG9yMS54KTtcbiAgICAvL1xuICAgIC8vIHJldHVybiAgYW5nbGVSYWRpYW5zICogKDE4MCAvIE1hdGguUEkpO1xufVxuZXhwb3J0cy5maW5kQW5nbGUgPSBmaW5kQW5nbGU7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuZmluZENsZWFuTGluZXMgPSB2b2lkIDA7XG5jb25zdCBmaW5kTGluZUludGVyc2VjdGlvbnNfMSA9IHJlcXVpcmUoXCIuL2ZpbmRMaW5lSW50ZXJzZWN0aW9uc1wiKTtcbmZ1bmN0aW9uIGZpbmRDbGVhbkxpbmVzKGxpbmVzLCBtYXhDb29yZCkge1xuICAgIGNvbnN0IHJlcyA9IFtdO1xuICAgIGxpbmVzLmZvckVhY2goKF8sIGluZGV4KSA9PiB7XG4gICAgICAgIGNvbnN0IGxpbmVJbnRlcnNlY3Rpb25zID0gKDAsIGZpbmRMaW5lSW50ZXJzZWN0aW9uc18xLmZpbmRMaW5lSW50ZXJzZWN0aW9ucykobGluZXMsIGluZGV4LCBtYXhDb29yZCk7XG4gICAgICAgIGxldCBzdGFydENvb3JkID0gbGluZUludGVyc2VjdGlvbnNbMF07XG4gICAgICAgIGxpbmVJbnRlcnNlY3Rpb25zLnNsaWNlKDEpLmZvckVhY2goKHsgeCwgeSB9KSA9PiB7XG4gICAgICAgICAgICBpZiAoc3RhcnRDb29yZCAmJiAoc3RhcnRDb29yZC54ICE9PSB4IHx8IHN0YXJ0Q29vcmQueSAhPT0geSkpIHtcbiAgICAgICAgICAgICAgICByZXMucHVzaChbc3RhcnRDb29yZCwgeyB4LCB5IH1dKTtcbiAgICAgICAgICAgICAgICBzdGFydENvb3JkID0geyB4LCB5IH07XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICAgIHJldHVybiByZXM7XG59XG5leHBvcnRzLmZpbmRDbGVhbkxpbmVzID0gZmluZENsZWFuTGluZXM7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuZmluZExpbmVJbnRlcnNlY3Rpb25zID0gdm9pZCAwO1xuZnVuY3Rpb24gZmluZExpbmVJbnRlcnNlY3Rpb25zKGxpbmVzLCBpbmRleCwgbWF4Q29vcmQpIHtcbiAgICBjb25zdCByZXMgPSBbXTtcbiAgICBjb25zdCBsaW5lID0gbGluZXNbaW5kZXhdO1xuICAgIGNvbnN0IHJlc29sdmVMaW5lc1RvQ2hlY2sgPSBbLi4ubGluZXNdO1xuICAgIHJlc29sdmVMaW5lc1RvQ2hlY2suc3BsaWNlKGluZGV4LCAxKTtcbiAgICByZXNvbHZlTGluZXNUb0NoZWNrLmZvckVhY2goKGxpbmUyKSA9PiB7XG4gICAgICAgIGNvbnN0IHsgeDogeDFBLCB5OiB5MUEgfSA9IGxpbmVbMF07XG4gICAgICAgIGNvbnN0IHsgeDogeDFCLCB5OiB5MUIgfSA9IGxpbmVbMV07XG4gICAgICAgIGNvbnN0IHsgeDogeDJDLCB5OiB5MkMgfSA9IGxpbmUyWzBdO1xuICAgICAgICBjb25zdCB7IHg6IHgyRCwgeTogeTJEIH0gPSBsaW5lMlsxXTtcbiAgICAgICAgY29uc3QgaXNWZXJ0aWNhbDEgPSB4MUEgPT09IHgxQjtcbiAgICAgICAgY29uc3QgaXNWZXJ0aWNhbDIgPSB4MkMgPT09IHgyRDtcbiAgICAgICAgbGV0IHBvaW50O1xuICAgICAgICBpZiAoaXNWZXJ0aWNhbDEgJiYgaXNWZXJ0aWNhbDIpIHtcbiAgICAgICAgICAgIHBvaW50ID0geyB4OiB4MUEsIHk6IHkxQSB9O1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGlzVmVydGljYWwxKSB7XG4gICAgICAgICAgICBjb25zdCBzbG9wZTIgPSAoeTJEIC0geTJDKSAvICh4MkQgLSB4MkMpO1xuICAgICAgICAgICAgY29uc3QgeUludGVyY2VwdDIgPSB5MkMgLSBzbG9wZTIgKiB4MkM7XG4gICAgICAgICAgICBjb25zdCB4ID0geDFBO1xuICAgICAgICAgICAgY29uc3QgeSA9IHNsb3BlMiAqIHggKyB5SW50ZXJjZXB0MjtcbiAgICAgICAgICAgIHBvaW50ID0geyB4LCB5IH07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoaXNWZXJ0aWNhbDIpIHtcbiAgICAgICAgICAgIGNvbnN0IHNsb3BlMSA9ICh5MUIgLSB5MUEpIC8gKHgxQiAtIHgxQSk7XG4gICAgICAgICAgICBjb25zdCB5SW50ZXJjZXB0MSA9IHkxQSAtIHNsb3BlMSAqIHgxQTtcbiAgICAgICAgICAgIGNvbnN0IHggPSB4MkM7XG4gICAgICAgICAgICBjb25zdCB5ID0gc2xvcGUxICogeCArIHlJbnRlcmNlcHQxO1xuICAgICAgICAgICAgcG9pbnQgPSB7IHgsIHkgfTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IHNsb3BlMSA9ICh5MUIgLSB5MUEpIC8gKHgxQiAtIHgxQSk7XG4gICAgICAgICAgICBjb25zdCBzbG9wZTIgPSAoeTJEIC0geTJDKSAvICh4MkQgLSB4MkMpO1xuICAgICAgICAgICAgaWYgKHNsb3BlMSA9PT0gc2xvcGUyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCB5SW50ZXJjZXB0MSA9IHkxQSAtIHNsb3BlMSAqIHgxQTtcbiAgICAgICAgICAgIGNvbnN0IHlJbnRlcmNlcHQyID0geTJDIC0gc2xvcGUyICogeDJDO1xuICAgICAgICAgICAgY29uc3QgeCA9ICh5SW50ZXJjZXB0MiAtIHlJbnRlcmNlcHQxKSAvIChzbG9wZTEgLSBzbG9wZTIpO1xuICAgICAgICAgICAgY29uc3QgeUludGVyc2VjdGlvbiA9IHNsb3BlMSAqIHggKyB5SW50ZXJjZXB0MTtcbiAgICAgICAgICAgIHBvaW50ID0geyB4OiB4LCB5OiB5SW50ZXJzZWN0aW9uIH07XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgaXNWYWxpZFggPSBwb2ludC54ID49IDAgJiYgcG9pbnQueCA8PSBtYXhDb29yZDtcbiAgICAgICAgY29uc3QgaXNWYWxpZFkgPSBwb2ludC55ID49IDAgJiYgcG9pbnQueSA8PSBtYXhDb29yZDtcbiAgICAgICAgaWYgKGlzVmFsaWRYICYmIGlzVmFsaWRZKSB7XG4gICAgICAgICAgICByZXMucHVzaChwb2ludCk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICBjb25zdCBzdHJpbmdpZmllZCA9IHJlcy5tYXAoKHsgeCwgeSB9KSA9PiBgJHt4fS8ke3l9YCk7XG4gICAgY29uc3QgY2xlYXIgPSBbLi4ubmV3IFNldChzdHJpbmdpZmllZCldLm1hcChwb2ludCA9PiB7XG4gICAgICAgIGNvbnN0IFt4LCB5XSA9IHBvaW50LnNwbGl0KFwiL1wiKTtcbiAgICAgICAgcmV0dXJuIHsgeDogTWF0aC5jZWlsKCt4KSwgeTogTWF0aC5jZWlsKCt5KSB9O1xuICAgIH0pO1xuICAgIGNsZWFyLnNvcnQoKHsgeDogeDEgfSwgeyB4OiB4MiB9KSA9PiB4MSAtIHgyKTtcbiAgICBjbGVhci5zb3J0KCh7IHk6IHkxIH0sIHsgeTogeTIgfSkgPT4geTEgLSB5Mik7XG4gICAgcmV0dXJuIGNsZWFyO1xufVxuZXhwb3J0cy5maW5kTGluZUludGVyc2VjdGlvbnMgPSBmaW5kTGluZUludGVyc2VjdGlvbnM7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuZmluZFNoYXBlQXBleGVzID0gdm9pZCAwO1xuY29uc3QgZmluZEFuZ2xlXzEgPSByZXF1aXJlKFwiLi9maW5kQW5nbGVcIik7XG5mdW5jdGlvbiBmaW5kU2hhcGVBcGV4ZXMoc3RhcnRMaW5lLCBjbGVhbkxpbmVzKSB7XG4gICAgdmFyIF9hLCBfYjtcbiAgICBjb25zdCBmaXJzdEFwZXggPSBzdGFydExpbmVbMF07XG4gICAgY29uc3Qgc2Vjb25kQXBleCA9IHN0YXJ0TGluZVsxXTtcbiAgICBjb25zdCBzaGFwZUFwZXhlcyA9IFtmaXJzdEFwZXgsIHNlY29uZEFwZXhdO1xuICAgIGxldCBjb3VudCA9IDA7IC8vIHRvZG86IGRlbGV0ZVxuICAgIHdoaWxlICgoZmlyc3RBcGV4LnggIT09ICgoX2EgPSBzaGFwZUFwZXhlcy5hdCgtMSkpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS54KSB8fCBmaXJzdEFwZXgueSAhPT0gKChfYiA9IHNoYXBlQXBleGVzLmF0KC0xKSkgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLnkpKSAmJiBjb3VudCA8IDI1KSB7XG4gICAgICAgIGNvbnN0IHByZXZpb3VzQXBleCA9IHNoYXBlQXBleGVzLmF0KC0yKSB8fCB7IHg6IDAsIHk6IDAgfTtcbiAgICAgICAgY29uc3QgbGFzdEFwZXggPSBzaGFwZUFwZXhlcy5hdCgtMSkgfHwgeyB4OiAwLCB5OiAwIH07XG4gICAgICAgIGNvbnN0IHRvdWNoZWRMaW5lcyA9IGNsZWFuTGluZXMuZmlsdGVyKChbcG9pbnQxLCBwb2ludDJdKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBpc1BvaW50MU1hdGNoZXMgPSBwb2ludDEueCA9PT0gKGxhc3RBcGV4ID09PSBudWxsIHx8IGxhc3RBcGV4ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBsYXN0QXBleC54KSAmJiBwb2ludDEueSA9PT0gKGxhc3RBcGV4ID09PSBudWxsIHx8IGxhc3RBcGV4ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBsYXN0QXBleC55KTtcbiAgICAgICAgICAgIGNvbnN0IGlzUG9pbnQyTWF0Y2hlcyA9IHBvaW50Mi54ID09PSAobGFzdEFwZXggPT09IG51bGwgfHwgbGFzdEFwZXggPT09IHZvaWQgMCA/IHZvaWQgMCA6IGxhc3RBcGV4LngpICYmIHBvaW50Mi55ID09PSAobGFzdEFwZXggPT09IG51bGwgfHwgbGFzdEFwZXggPT09IHZvaWQgMCA/IHZvaWQgMCA6IGxhc3RBcGV4LnkpO1xuICAgICAgICAgICAgY29uc3QgaXNQb2ludDFNYXRjaGVzUHJldmlvdXMgPSBwb2ludDEueCA9PT0gKHByZXZpb3VzQXBleCA9PT0gbnVsbCB8fCBwcmV2aW91c0FwZXggPT09IHZvaWQgMCA/IHZvaWQgMCA6IHByZXZpb3VzQXBleC54KSAmJiBwb2ludDEueSA9PT0gKHByZXZpb3VzQXBleCA9PT0gbnVsbCB8fCBwcmV2aW91c0FwZXggPT09IHZvaWQgMCA/IHZvaWQgMCA6IHByZXZpb3VzQXBleC55KTtcbiAgICAgICAgICAgIGNvbnN0IGlzUG9pbnQyTWF0Y2hlc1ByZXZpb3VzID0gcG9pbnQyLnggPT09IChwcmV2aW91c0FwZXggPT09IG51bGwgfHwgcHJldmlvdXNBcGV4ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBwcmV2aW91c0FwZXgueCkgJiYgcG9pbnQyLnkgPT09IChwcmV2aW91c0FwZXggPT09IG51bGwgfHwgcHJldmlvdXNBcGV4ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBwcmV2aW91c0FwZXgueSk7XG4gICAgICAgICAgICByZXR1cm4gKGlzUG9pbnQxTWF0Y2hlcyB8fCBpc1BvaW50Mk1hdGNoZXMpICYmICFpc1BvaW50MU1hdGNoZXNQcmV2aW91cyAmJiAhaXNQb2ludDJNYXRjaGVzUHJldmlvdXM7XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoIXRvdWNoZWRMaW5lcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IG5leHRMaW5lID0gdG91Y2hlZExpbmVzLnJlZHVjZSgocmVzLCBjdXJyKSA9PiB7XG4gICAgICAgICAgICBjb25zdCByZXNBbmdsZSA9ICgwLCBmaW5kQW5nbGVfMS5maW5kQW5nbGUpKFtwcmV2aW91c0FwZXgsIGxhc3RBcGV4XSwgcmVzKTtcbiAgICAgICAgICAgIGNvbnN0IGN1cnJBbmdsZSA9ICgwLCBmaW5kQW5nbGVfMS5maW5kQW5nbGUpKFtwcmV2aW91c0FwZXgsIGxhc3RBcGV4XSwgY3Vycik7XG4gICAgICAgICAgICBpZiAocmVzQW5nbGUgPT09IDApXG4gICAgICAgICAgICAgICAgcmV0dXJuIGN1cnI7XG4gICAgICAgICAgICAvLyBpZiAocmVzQW5nbGUgPiAwKSB7XG4gICAgICAgICAgICByZXR1cm4gY3VyckFuZ2xlICE9PSAwICYmIGN1cnJBbmdsZSA+IHJlc0FuZ2xlXG4gICAgICAgICAgICAgICAgPyBjdXJyXG4gICAgICAgICAgICAgICAgOiByZXM7XG4gICAgICAgICAgICAvLyB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gICByZXR1cm4gY3VyckFuZ2xlICE9PSAwICYmIGN1cnJBbmdsZSA8IHJlc0FuZ2xlXG4gICAgICAgICAgICAvLyAgICAgPyBjdXJyXG4gICAgICAgICAgICAvLyAgICAgOiByZXNcbiAgICAgICAgICAgIC8vIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnN0IG5leHRBcGV4ID0gKG5leHRMaW5lID09PSBudWxsIHx8IG5leHRMaW5lID09PSB2b2lkIDAgPyB2b2lkIDAgOiBuZXh0TGluZS5maW5kKCh7IHgsIHkgfSkgPT4gKGxhc3RBcGV4ID09PSBudWxsIHx8IGxhc3RBcGV4ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBsYXN0QXBleC54KSAhPT0geCB8fCAobGFzdEFwZXggPT09IG51bGwgfHwgbGFzdEFwZXggPT09IHZvaWQgMCA/IHZvaWQgMCA6IGxhc3RBcGV4LnkpICE9PSB5KSkgfHwgeyB4OiAwLCB5OiAwIH07XG4gICAgICAgIGlmIChzaGFwZUFwZXhlcy5zb21lKCh7IHgsIHkgfSkgPT4gbmV4dEFwZXgueCA9PT0geCAmJiBuZXh0QXBleC55ID09PSB5KSkge1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgc2hhcGVBcGV4ZXMucHVzaChuZXh0QXBleCk7XG4gICAgICAgIGNvdW50Kys7XG4gICAgfVxuICAgIC8vIGNvbnNvbGUubG9nKGNvdW50KVxuICAgIHJldHVybiBzaGFwZUFwZXhlcztcbn1cbmV4cG9ydHMuZmluZFNoYXBlQXBleGVzID0gZmluZFNoYXBlQXBleGVzO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmdlbmVyYXRlRGl2aWRlclNpZGVzID0gdm9pZCAwO1xuY29uc3QgcmFuZF8xID0gcmVxdWlyZShcIi4vcmFuZFwiKTtcbmZ1bmN0aW9uIGdlbmVyYXRlRGl2aWRlclNpZGVzKFNJREVTX0NPT1JEUykge1xuICAgIGNvbnN0IGZpcnN0U2lkZSA9ICgwLCByYW5kXzEuZ2V0UmFuZCkoMSwgU0lERVNfQ09PUkRTLmxlbmd0aCArIDEpO1xuICAgIGxldCBzZWNvbmRTaWRlID0gKDAsIHJhbmRfMS5nZXRSYW5kKSgxLCBTSURFU19DT09SRFMubGVuZ3RoICsgMSk7XG4gICAgd2hpbGUgKHNlY29uZFNpZGUgPT09IGZpcnN0U2lkZSkge1xuICAgICAgICBzZWNvbmRTaWRlID0gKDAsIHJhbmRfMS5nZXRSYW5kKSgxLCBTSURFU19DT09SRFMubGVuZ3RoICsgMSk7XG4gICAgfVxuICAgIHJldHVybiBbU0lERVNfQ09PUkRTW2ZpcnN0U2lkZSAtIDFdLCBTSURFU19DT09SRFNbc2Vjb25kU2lkZSAtIDFdXTtcbn1cbmV4cG9ydHMuZ2VuZXJhdGVEaXZpZGVyU2lkZXMgPSBnZW5lcmF0ZURpdmlkZXJTaWRlcztcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5nZW5lcmF0ZURpdmlkZXJzID0gdm9pZCAwO1xuY29uc3QgZ2VuZXJhdGVEaXZpZGVyU2lkZXNfMSA9IHJlcXVpcmUoXCIuL2dlbmVyYXRlRGl2aWRlclNpZGVzXCIpO1xuY29uc3QgcmFuZF8xID0gcmVxdWlyZShcIi4vcmFuZFwiKTtcbmZ1bmN0aW9uIGdlbmVyYXRlRGl2aWRlcnMoY291bnQsIGNhbnZhc0hlaWdodCwgY2FudmFzV2lkdGgsIFNJREVTX0NPT1JEUykge1xuICAgIGNvbnN0IHNpZGVzID0gQXJyYXkoY291bnQpLmZpbGwobnVsbCkubWFwKCgpID0+ICgwLCBnZW5lcmF0ZURpdmlkZXJTaWRlc18xLmdlbmVyYXRlRGl2aWRlclNpZGVzKShTSURFU19DT09SRFMpKTtcbiAgICBjb25zdCByZXMgPSBbXTtcbiAgICBmb3IgKGNvbnN0IFtmaXJzdFNpZGUsIHNlY29uZFNpZGVdIG9mIHNpZGVzKSB7XG4gICAgICAgIGNvbnN0IGZpcnN0U2lkZUFkanVzdGVkU2lkZSA9IGZpcnN0U2lkZVswXS54ID09PSBmaXJzdFNpZGVbMV0ueFxuICAgICAgICAgICAgPyBcInlcIlxuICAgICAgICAgICAgOiBcInhcIjtcbiAgICAgICAgY29uc3Qgc2Vjb25kU2lkZUFkanVzdGVkU2lkZSA9IHNlY29uZFNpZGVbMF0ueCA9PT0gc2Vjb25kU2lkZVsxXS54XG4gICAgICAgICAgICA/IFwieVwiXG4gICAgICAgICAgICA6IFwieFwiO1xuICAgICAgICBjb25zdCBmaXJzdFNpZGVYID0gZmlyc3RTaWRlQWRqdXN0ZWRTaWRlID09PSBcInhcIlxuICAgICAgICAgICAgPyAoMCwgcmFuZF8xLmdldFJhbmQpKDAsIGNhbnZhc1dpZHRoKVxuICAgICAgICAgICAgOiBmaXJzdFNpZGVbMF0ueDtcbiAgICAgICAgY29uc3QgZmlyc3RTaWRlWSA9IGZpcnN0U2lkZUFkanVzdGVkU2lkZSA9PT0gXCJ5XCJcbiAgICAgICAgICAgID8gKDAsIHJhbmRfMS5nZXRSYW5kKSgwLCBjYW52YXNIZWlnaHQpXG4gICAgICAgICAgICA6IGZpcnN0U2lkZVswXS55O1xuICAgICAgICBjb25zdCBzZWNvbmRTaWRlWCA9IHNlY29uZFNpZGVBZGp1c3RlZFNpZGUgPT09IFwieFwiXG4gICAgICAgICAgICA/ICgwLCByYW5kXzEuZ2V0UmFuZCkoMCwgY2FudmFzV2lkdGgpXG4gICAgICAgICAgICA6IHNlY29uZFNpZGVbMF0ueDtcbiAgICAgICAgY29uc3Qgc2Vjb25kU2lkZVkgPSBzZWNvbmRTaWRlQWRqdXN0ZWRTaWRlID09PSBcInlcIlxuICAgICAgICAgICAgPyAoMCwgcmFuZF8xLmdldFJhbmQpKDAsIGNhbnZhc0hlaWdodClcbiAgICAgICAgICAgIDogc2Vjb25kU2lkZVswXS55O1xuICAgICAgICByZXMucHVzaChbXG4gICAgICAgICAgICB7IHg6IGZpcnN0U2lkZVgsIHk6IGZpcnN0U2lkZVkgfSxcbiAgICAgICAgICAgIHsgeDogc2Vjb25kU2lkZVgsIHk6IHNlY29uZFNpZGVZIH1cbiAgICAgICAgXSk7XG4gICAgfVxuICAgIHJldHVybiByZXM7XG59XG5leHBvcnRzLmdlbmVyYXRlRGl2aWRlcnMgPSBnZW5lcmF0ZURpdmlkZXJzO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmdldFJhbmQgPSB2b2lkIDA7XG5mdW5jdGlvbiBnZXRSYW5kKG1pbiwgbWF4KSB7XG4gICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4pKSArIG1pbjtcbn1cbmV4cG9ydHMuZ2V0UmFuZCA9IGdldFJhbmQ7XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBnZW5lcmF0ZURpdmlkZXJzXzEgPSByZXF1aXJlKFwiLi91dGlscy9nZW5lcmF0ZURpdmlkZXJzXCIpO1xuY29uc3QgcmFuZF8xID0gcmVxdWlyZShcIi4vdXRpbHMvcmFuZFwiKTtcbmNvbnN0IGZpbmRTaGFwZUFwZXhlc18xID0gcmVxdWlyZShcIi4vdXRpbHMvZmluZFNoYXBlQXBleGVzXCIpO1xuY29uc3QgZmluZENsZWFuTGluZXNfMSA9IHJlcXVpcmUoXCIuL3V0aWxzL2ZpbmRDbGVhbkxpbmVzXCIpO1xuY29uc3QgU2hhcGVfMSA9IHJlcXVpcmUoXCIuL3V0aWxzL1NoYXBlXCIpO1xuY29uc3QgY2FudmFzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImNhbnZhc1wiKTtcbmlmICghY2FudmFzKSB7XG4gICAgdGhyb3cgXCJDYW52YXMgbm90IGZvdW5kXCI7XG59XG5jb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuaWYgKCFjdHgpIHtcbiAgICB0aHJvdyBcIkNhbnZhcyBjb250ZXh0IG5vdCBmb3VuZFwiO1xufVxuY29uc29sZS50aW1lKFwidFwiKTtcbi8vIGNvbnN0IGJhc2U6IGxpbmUgPSBbeyB4OiAwLCB5OiAyNTAgfSwgeyB4OiA0MDAsIHk6IDI1MCB9XTtcbi8vXG4vLyAvLyBsZWZ0XG4vLyBjb25zb2xlLmxvZyhmaW5kQW5nbGUoYmFzZSwgW3sgeDogNDAwLCB5OiAyNTAgfSwgeyB4OiA0MDAsIHk6IDAgfV0pKVxuLy9cbi8vIC8vIHN0cmFpZ2h0XG4vLyBjb25zb2xlLmxvZyhmaW5kQW5nbGUoYmFzZSwgW3sgeDogNDAwLCB5OiAyNTAgfSwgeyB4OiA1MDAsIHk6IDI1MCB9XSkpXG4vL1xuLy8gLy8gcmlnaHRcbi8vIGNvbnNvbGUubG9nKGZpbmRBbmdsZShiYXNlLCBbeyB4OiA0MDAsIHk6IDI1MCB9LCB7IHg6IDQwMCwgeTogNTAwIH1dKSlcbi8vIGNvbnNvbGUubG9nKGZpbmRBbmdsZShcbi8vICAgW3sgeDogNDQ3LCB5OiAyMTcgfSwgeyB4OiAwLCB5OiAzOTAgfV0sXG4vLyAgIFt7IHg6IDAsIHk6IDM5MCB9LCB7IHg6IDAsIHk6IDUwMCB9XVxuLy8gKSlcbi8vXG4vLyBjb25zb2xlLmxvZyhmaW5kQW5nbGUoXG4vLyAgIFt7IHg6IDQ0NywgeTogMjE3IH0sIHsgeDogMCwgeTogMzkwIH1dLFxuLy8gICBbeyB4OiAwLCB5OiAzOTAgfSwgeyB4OiAwLCB5OiAwIH1dXG4vLyApKVxuY29uc3QgeyBoZWlnaHQ6IGNhbnZhc0hlaWdodCwgd2lkdGg6IGNhbnZhc1dpZHRoIH0gPSBjYW52YXM7XG5jb25zdCB3aWR0aCA9IGNhbnZhc1dpZHRoIC8gMjtcbmNvbnN0IGhlaWdodCA9IGNhbnZhc0hlaWdodCAvIDI7XG5jb25zdCB4T2Zmc2V0ID0gd2lkdGggLyAyO1xuY29uc3QgeU9mZnNldCA9IGhlaWdodCAvIDI7XG5jb25zdCBNSU5fRElWSURFUlNfQ09VTlQgPSAxMDA7XG5jb25zdCBNQVhfRElWSURFUlNfQ09VTlQgPSAxMDA7XG5jb25zdCBBTklNQVRJT05fRFVSQVRJT05fTVMgPSAxMDAwO1xuY29uc3QgVEFSR0VUX0ZQUyA9IDYwO1xuY29uc3QgRlJBTUVTX0NPVU5UID0gKEFOSU1BVElPTl9EVVJBVElPTl9NUyAvIDEwMDApICogVEFSR0VUX0ZQUztcbmNvbnN0IEZSQU1FX1RJTUVfTVMgPSAxMDAwIC8gVEFSR0VUX0ZQUztcbmNvbnN0IFRPUF9MRUZUX0NPUk5FUiA9IHsgeDogMCwgeTogMCB9O1xuY29uc3QgVE9QX1JJR0hUX0NPUk5FUiA9IHsgeDogd2lkdGgsIHk6IDAgfTtcbmNvbnN0IEJPVFRPTV9SSUdIVF9DT1JORVIgPSB7IHg6IHdpZHRoLCB5OiBoZWlnaHQgfTtcbmNvbnN0IEJPVFRPTV9MRUZUX0NPUk5FUiA9IHsgeDogMCwgeTogaGVpZ2h0IH07XG5jb25zdCBTSURFU19DT09SRFMgPSBbXG4gICAgW1RPUF9MRUZUX0NPUk5FUiwgVE9QX1JJR0hUX0NPUk5FUl0sIC8vIHRvcCBsaW5lXG4gICAgW1RPUF9SSUdIVF9DT1JORVIsIEJPVFRPTV9SSUdIVF9DT1JORVJdLCAvLyByaWdodCBsaW5lXG4gICAgW0JPVFRPTV9SSUdIVF9DT1JORVIsIEJPVFRPTV9MRUZUX0NPUk5FUl0sIC8vIGJvdHRvbSBsaW5lXG4gICAgW0JPVFRPTV9MRUZUX0NPUk5FUiwgVE9QX0xFRlRfQ09STkVSXSwgLy8gbGVmdCBsaW5lXG5dO1xuLy8gY29uc3QgZGl2aWRlcnNDb29yZHM6IEFycmF5PGxpbmU+ID0gW1xuLy8gICBbXG4vLyAgICAge1xuLy8gICAgICAgXCJ4XCI6IDYzLFxuLy8gICAgICAgXCJ5XCI6IDBcbi8vICAgICB9LFxuLy8gICAgIHtcbi8vICAgICAgIFwieFwiOiAwLFxuLy8gICAgICAgXCJ5XCI6IDEwN1xuLy8gICAgIH1cbi8vICAgXSxcbi8vICAgW1xuLy8gICAgIHtcbi8vICAgICAgIFwieFwiOiAyNTAsXG4vLyAgICAgICBcInlcIjogOFxuLy8gICAgIH0sXG4vLyAgICAge1xuLy8gICAgICAgXCJ4XCI6IDU5LFxuLy8gICAgICAgXCJ5XCI6IDI1MFxuLy8gICAgIH1cbi8vICAgXSxcbi8vICAgW1xuLy8gICAgIHtcbi8vICAgICAgIFwieFwiOiAwLFxuLy8gICAgICAgXCJ5XCI6IDU4XG4vLyAgICAgfSxcbi8vICAgICB7XG4vLyAgICAgICBcInhcIjogMTM5LFxuLy8gICAgICAgXCJ5XCI6IDBcbi8vICAgICB9XG4vLyAgIF0sXG4vLyAgIFtcbi8vICAgICB7XG4vLyAgICAgICBcInhcIjogMTEsXG4vLyAgICAgICBcInlcIjogMjUwXG4vLyAgICAgfSxcbi8vICAgICB7XG4vLyAgICAgICBcInhcIjogMCxcbi8vICAgICAgIFwieVwiOiAxOTRcbi8vICAgICB9XG4vLyAgIF0sXG4vLyAgIFtcbi8vICAgICB7XG4vLyAgICAgICBcInhcIjogMjUwLFxuLy8gICAgICAgXCJ5XCI6IDE5M1xuLy8gICAgIH0sXG4vLyAgICAge1xuLy8gICAgICAgXCJ4XCI6IDAsXG4vLyAgICAgICBcInlcIjogMjRcbi8vICAgICB9XG4vLyAgIF1cbi8vIF1cbmNvbnN0IGRpdmlkZXJzQ29vcmRzID0gKDAsIGdlbmVyYXRlRGl2aWRlcnNfMS5nZW5lcmF0ZURpdmlkZXJzKSgoMCwgcmFuZF8xLmdldFJhbmQpKE1JTl9ESVZJREVSU19DT1VOVCwgTUFYX0RJVklERVJTX0NPVU5UKSwgaGVpZ2h0LCB3aWR0aCwgU0lERVNfQ09PUkRTKTtcbmNvbnNvbGUubG9nKGRpdmlkZXJzQ29vcmRzKTtcbmNvbnN0IGFsbExpbmVzID0gWy4uLlNJREVTX0NPT1JEUywgLi4uZGl2aWRlcnNDb29yZHNdO1xuY29uc3QgY2xlYW5MaW5lcyA9ICgwLCBmaW5kQ2xlYW5MaW5lc18xLmZpbmRDbGVhbkxpbmVzKShhbGxMaW5lcywgd2lkdGgpO1xuY29uc3Qgc2hhcGVzID0gY2xlYW5MaW5lcy5tYXAoKGxpbmUpID0+IG5ldyBTaGFwZV8xLlNoYXBlKCgwLCBmaW5kU2hhcGVBcGV4ZXNfMS5maW5kU2hhcGVBcGV4ZXMpKGxpbmUsIGNsZWFuTGluZXMpLCBjdHgsIHsgeDogeE9mZnNldCwgeTogeU9mZnNldCB9KSk7XG5zaGFwZXMuZm9yRWFjaCgoc2hhcGUpID0+IHtcbiAgICBzaGFwZS5kcmF3KHsgeDogeE9mZnNldCwgeTogeU9mZnNldCB9KTtcbn0pO1xubGV0IGkgPSAwO1xuY29uc3QgaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgY3R4LmNsZWFyUmVjdCgwLCAwLCBjYW52YXNXaWR0aCwgY2FudmFzSGVpZ2h0KTtcbiAgICBzaGFwZXMuZm9yRWFjaChzaGFwZSA9PiBzaGFwZS5tb3ZlKGkgLyBGUkFNRVNfQ09VTlQpKTtcbiAgICBpKys7XG4gICAgaWYgKGkgPiBGUkFNRVNfQ09VTlQpIHtcbiAgICAgICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbCk7XG4gICAgfVxufSwgRlJBTUVfVElNRV9NUyk7XG5jb25zb2xlLnRpbWVFbmQoXCJ0XCIpO1xuLy8gZHJhd0RpdmlkZXJzKGN0eCwgWy4uLmRpdmlkZXJzQ29vcmRzLCAuLi5bLi4uU0lERVNfQ09PUkRTLCAuLi5kaXZpZGVyc0Nvb3Jkc11dKVxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9