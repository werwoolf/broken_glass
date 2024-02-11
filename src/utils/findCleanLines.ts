import { line } from "../types";
import { findLineIntersections } from "./findLineIntersections";

export function findCleanLines(lines: Array<line>, maxCoord: number): Array<line> {
  const res: Array<line> = [];

  lines.forEach((_, index) => {
    const lineIntersections = findLineIntersections(lines, index, maxCoord);

    let startCoord = lineIntersections[0];

    lineIntersections.slice(1).forEach(({ x, y }) => {
      if (startCoord && (startCoord.x !== x || startCoord.y !== y)) {
        res.push([startCoord, { x, y }])
        startCoord = { x, y };
      }
    })
  })

  return res;
}
