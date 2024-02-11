import { line } from "../types";

// find angle between 2 lines (-179 - 179)
export function findAngle(line1: line, _line2: line): number {
  // connected point must be first
  const line2 = [
    _line2.find(({ x, y }) => x === line1[1].x && y === line1[1].y) || _line2[0],
    _line2.find(({ x, y }) => x !== line1[1].x || y !== line1[1].y) || _line2[1]
  ];

  const vector1 = { x: line1[1].x - line1[0].x, y: line1[1].y - line1[0].y };
  const vector2 = { x: line2[1].x - line2[0].x, y: line2[1].y - line2[0].y };

  const length1 = Math.sqrt(vector1.x * vector1.x + vector1.y * vector1.y);
  const length2 = Math.sqrt(vector2.x * vector2.x + vector2.y * vector2.y);

  const dotProduct = vector1.x * vector2.x + vector1.y * vector2.y;
  const cosAngle = dotProduct / (length1 * length2);

  const angleRad = Math.acos(cosAngle);

  let angleDeg = angleRad * (180 / Math.PI);

  const crossProduct = vector1.x * vector2.y - vector1.y * vector2.x;
  const sign = Math.sign(crossProduct);

  if (angleDeg > 179) {
    angleDeg -= 360;
  }

  return angleDeg * sign;
}
