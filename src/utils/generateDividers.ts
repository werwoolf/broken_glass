import { line } from "../types";
import { getRandNumber } from "./getRandNumber";

// generate dividing lines
export function generateDividers(
  count: number,
  canvasHeight: number,
  canvasWidth: number,
  SIDES_COORDS: Array<line>
): Array<line> {
  const dividers: Array<line> = [];

  for (let i = 0; i < count; i++) {
    const [firstSide, secondSide] = generateDividerSides(SIDES_COORDS);

    const [start1, end1] = firstSide;
    const [start2, end2] = secondSide;

    const firstSideX = start1.x === end1.x ?  getRandNumber(0, canvasWidth) : start1.x;
    const firstSideY = start1.y === end1.y ?  getRandNumber(0, canvasHeight) : start1.y;
    const secondSideX = start2.x === end2.x ?  getRandNumber(0, canvasWidth): start2.x;
    const secondSideY = start2.y === end2.y ?  getRandNumber(0, canvasHeight) : start2.y;

    dividers.push([{ x: firstSideX, y: firstSideY }, { x: secondSideX, y: secondSideY }]);
  }

  return dividers;
}

export function generateDividerSides(SIDES_COORDS: Array<line>): [line, line] {
  const firstSide = getRandNumber(1, SIDES_COORDS.length);

  let secondSide = getRandNumber(1, SIDES_COORDS.length);

  while (secondSide === firstSide) {
    secondSide = getRandNumber(1, SIDES_COORDS.length);
  }

  return [SIDES_COORDS[firstSide - 1], SIDES_COORDS[secondSide - 1]];
}
