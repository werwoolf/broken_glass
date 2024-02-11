import { coordinate } from "../types";

export function drawDividers(ctx:  CanvasRenderingContext2D, dividersCoords: Array<[coordinate, coordinate]>){
  dividersCoords.forEach(([firstCoord, secondCoord]) => {
    ctx.beginPath()
    ctx.moveTo(firstCoord.x, firstCoord.y);

    ctx.lineTo(secondCoord.x, secondCoord.y);

    ctx.strokeStyle = "black";
    ctx.stroke()
  })
}
