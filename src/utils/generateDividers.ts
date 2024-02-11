import { line } from "../types";
import { generateDividerSides } from "./generateDividerSides";
import { getRand } from "./rand";

export function generateDividers(
  count: number,
  canvasHeight: number,
  canvasWidth: number,
  SIDES_COORDS: Array<line>
): Array<line> {
  const sides = Array<unknown>(count).fill(null).map(() => generateDividerSides(SIDES_COORDS));
  const res: Array<line> = [];

  for (const [firstSide, secondSide] of sides) {
    const firstSideAdjustedSide = firstSide[0].x === firstSide[1].x
      ? "y"
      : "x";

    const secondSideAdjustedSide = secondSide[0].x === secondSide[1].x
      ? "y"
      : "x";

    const firstSideX = firstSideAdjustedSide === "x"
      ? getRand(0, canvasWidth)
      : firstSide[0].x;
    const firstSideY = firstSideAdjustedSide === "y"
      ? getRand(0, canvasHeight)
      : firstSide[0].y;

    const secondSideX = secondSideAdjustedSide === "x"
      ? getRand(0, canvasWidth)
      : secondSide[0].x;
    const secondSideY = secondSideAdjustedSide === "y"
      ? getRand(0, canvasHeight)
      : secondSide[0].y;

    res.push([
      { x: firstSideX, y: firstSideY },
      { x: secondSideX, y: secondSideY }
    ])
  }

  return res;
}
