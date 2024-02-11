import { line } from "../types";
import { getRand } from "./rand";

export function generateDividerSides(SIDES_COORDS: Array<line>): [line, line] {
  const firstSide = getRand(1, SIDES_COORDS.length + 1);

  let secondSide = getRand(1, SIDES_COORDS.length + 1);

  while (secondSide === firstSide) {
    secondSide = getRand(1, SIDES_COORDS.length + 1);
  }

  return [SIDES_COORDS[firstSide - 1], SIDES_COORDS[secondSide - 1]];
}
