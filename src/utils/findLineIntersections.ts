import { coordinate, line } from "../types";

export function findLineIntersections(lines: Array<line>, index: number, maxCoord: number): Array<coordinate> {
  const res: Array<coordinate> = [];
  const line = lines[index];
  const resolveLinesToCheck = [...lines];
  resolveLinesToCheck.splice(index, 1)

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
    } else if (isVertical1) {
      const slope2 = (y2D - y2C) / (x2D - x2C);
      const yIntercept2 = y2C - slope2 * x2C;
      const x = x1A;
      const y = slope2 * x + yIntercept2;

      point = { x, y }
    } else if (isVertical2) {
      const slope1 = (y1B - y1A) / (x1B - x1A);
      const yIntercept1 = y1A - slope1 * x1A;
      const x = x2C;
      const y = slope1 * x + yIntercept1;

      point = { x, y }
    } else {
      const slope1 = (y1B - y1A) / (x1B - x1A);
      const slope2 = (y2D - y2C) / (x2D - x2C);

      if (slope1 === slope2) {
        return null;
      }

      const yIntercept1 = y1A - slope1 * x1A;
      const yIntercept2 = y2C - slope2 * x2C;

      const x = (yIntercept2 - yIntercept1) / (slope1 - slope2);
      const yIntersection = slope1 * x + yIntercept1;

      point = { x: x, y: yIntersection }
    }

    const isValidX = point.x >= 0 && point.x <= maxCoord
    const isValidY = point.y >= 0 && point.y <= maxCoord

    if (isValidX && isValidY) {
      res.push(point);
    }
  })

  const stringified = res.map(({ x, y }) => `${x}/${y}`);
  const clear = [...new Set(stringified)].map(point => {
    const [x, y] = point.split("/")
    return { x: Math.ceil(+x), y: Math.ceil(+y) }
  });

  clear.sort(({ x: x1 }, { x: x2 }) => x1 - x2)

  clear.sort(({ y: y1 }, { y: y2 }) => y1 - y2)

  return clear;
}
