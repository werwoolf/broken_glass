import { line } from "../types";

// visualize lines
export function drawDividers(ctx:  CanvasRenderingContext2D, dividersCoords: Array<line>): void{
  dividersCoords.forEach(([firstCoord, secondCoord]) => {
    ctx.beginPath();
    ctx.moveTo(firstCoord.x, firstCoord.y);

    ctx.lineTo(secondCoord.x, secondCoord.y);

    ctx.strokeStyle = "black";
    ctx.stroke();
  });
}
