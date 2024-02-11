import { findAngle } from "./findAngle";
import { line } from "../types";

export function findShapeApexes(startLine: line, cleanLines: Array<line>) {
  const firstApex = startLine[0];
  const secondApex = startLine[1];

  const shapeApexes = [firstApex, secondApex];

  let count = 0 // todo: delete

  while ((firstApex.x !== shapeApexes.at(-1)?.x || firstApex.y !== shapeApexes.at(-1)?.y) && count < 25) {
    const previousApex = shapeApexes.at(-2) || { x: 0, y: 0 };
    const lastApex = shapeApexes.at(-1) || { x: 0, y: 0 };

    const touchedLines = cleanLines.filter(([point1, point2]) => {
      const isPoint1Matches = point1.x === lastApex?.x && point1.y === lastApex?.y;
      const isPoint2Matches = point2.x === lastApex?.x && point2.y === lastApex?.y;

      const isPoint1MatchesPrevious = point1.x === previousApex?.x && point1.y === previousApex?.y;
      const isPoint2MatchesPrevious = point2.x === previousApex?.x && point2.y === previousApex?.y;

      return (isPoint1Matches || isPoint2Matches) && !isPoint1MatchesPrevious && !isPoint2MatchesPrevious;
    })

    if (!touchedLines.length) {
      break;
    }

    const nextLine = touchedLines.reduce((res, curr) => {
      const resAngle = findAngle([previousApex, lastApex], res);

      const currAngle = findAngle([previousApex, lastApex], curr);

      if (resAngle === 0) return curr;

      // if (resAngle > 0) {
      return currAngle !== 0 && currAngle > resAngle
        ? curr
        : res
      // } else {
      //   return currAngle !== 0 && currAngle < resAngle
      //     ? curr
      //     : res
      // }
    })

    const nextApex = nextLine?.find(({ x, y }) => lastApex?.x !== x || lastApex?.y !== y) || { x: 0, y: 0 };

    if (shapeApexes.some(({ x, y }) => nextApex.x === x && nextApex.y === y)) {
      break;
    }

    shapeApexes.push(nextApex)

    count++
  }

  // console.log(count)

  return shapeApexes
}
