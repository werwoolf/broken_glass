import { line } from "../types";

export function findAngle(line1: line, _line2: line) {
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
