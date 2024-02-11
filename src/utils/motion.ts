import { Shape } from "../Shape";

type movementFn = (
  shapes: Array<Shape>,
  ctx: CanvasRenderingContext2D,
  canvasWidth: number,
  canvasHeight: number,
  frames: number,
  frameTime: number
) => void;

export const motion: movementFn = (
  shapes, ctx, canvasWidth, canvasHeight, frames, frameTime
)=> {
  increase(
    shapes, ctx, canvasWidth,
    canvasHeight, frames, frameTime
  )
}

const increase: movementFn =(
  shapes, ctx, canvasWidth, canvasHeight, frames, frameTime
)=> {
  let i = 0;
  const interval = setInterval(() => {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    shapes.forEach(shape => shape.move(i / frames))

    i++

    if (i > frames) {
      clearInterval(interval)
      reduce(shapes, ctx, canvasWidth, canvasHeight, frames, frameTime)
    }
  }, frameTime)
}


const reduce: movementFn =(
  shapes, ctx, canvasWidth, canvasHeight, frames, frameTime
)=> {
  let j = frames;
  const interval = setInterval(() => {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    shapes.forEach(shape => shape.move(j / frames))

    j--

    if (j < 0) {
      clearInterval(interval)
    }
  }, frameTime)
}
