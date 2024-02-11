import { coordinate, rgbColor } from "./types";
import { getRandNumber } from "./utils/getRandNumber";

export class Shape {
  private readonly apexes: Array<coordinate>; // coordinates that create the shape
  private readonly color: rgbColor; // shape color
  private readonly canvasCtx: CanvasRenderingContext2D; // context for drawing
  private readonly avgCenterOffset: coordinate; // average offset to center
  private readonly initOffset: coordinate; // centre of picture

  constructor(
    apexes: Array<coordinate>,
    canvasCtx: CanvasRenderingContext2D,
    initOffset: coordinate
  ) {
    this.apexes = apexes;
    this.canvasCtx = canvasCtx;
    this.initOffset = initOffset;

    this.color = this.generateColor();
    this.avgCenterOffset = this.findAvgCenterOffset();
  }

  draw(offset: coordinate): void {
    const { x: xOffset, y: yOffset } = offset;

    this.apexes.forEach(({ x, y }, index) => {
      if (index === 0) {
        this.canvasCtx.beginPath();
        this.canvasCtx.moveTo(x + xOffset, y + yOffset);
      } else {
        this.canvasCtx.lineTo(x + xOffset, y + yOffset);
      }
    })

    this.canvasCtx.fillStyle = this.color;
    this.canvasCtx.fill();
  }

  move(offsetPercent: number): void {
    const resolveXOffset = this.initOffset.x + (this.avgCenterOffset.x * offsetPercent);
    const resolveYOffset = this.initOffset.y + (this.avgCenterOffset.y * offsetPercent);

    this.draw({
      x: resolveXOffset,
      y: resolveYOffset
    });
  }

  private findAvgCoords(): coordinate {
    const xs = this.apexes.map(({ x }) => x);
    const ys = this.apexes.map(({ y }) => y);

    const minX = Math.min(...xs);
    const maxX = Math.max(...xs);

    const minY = Math.min(...ys);
    const maxY = Math.max(...ys);

    const averageX = (minX + maxX) / 2;
    const averageY = (minY + maxY) / 2;

    return { x: averageX, y: averageY }
  }

  private findAvgCenterOffset(): coordinate {
    const avgCords = this.findAvgCoords();

    const isTouchedXLeftBorder = this.apexes.some(({ x }) => x === 0);
    const isTouchedXRightBorder = this.apexes.some(({ x }) => x === this.initOffset.x * 2);

    const isTouchedYTopBorder = this.apexes.some(({ y }) => y === 0);
    const isTouchedYBottomBorder = this.apexes.some(({ y }) => y === this.initOffset.y * 2);

    let xOffset = avgCords.x - this.initOffset.x;
    let yOffset = avgCords.y - this.initOffset.y;

    if (isTouchedXLeftBorder) xOffset = -this.initOffset.x;
    if (isTouchedXRightBorder) xOffset = this.initOffset.x;

    if (isTouchedYTopBorder) yOffset = -this.initOffset.y;
    if (isTouchedYBottomBorder) yOffset = this.initOffset.y;

    return { x: xOffset, y: yOffset }
  }

  private generateColor(): rgbColor {
    return `rgb(${getRandNumber(0, 255)}, ${getRandNumber(0, 255)}, ${getRandNumber(0, 255)})`
  }
}
