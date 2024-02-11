import { Shape } from "../Shape";

type movementFn = (
  shapes: Array<Shape>,
  ctx: CanvasRenderingContext2D,
  canvasWidth: number,
  canvasHeight: number,
  frames: number,
  frameTime: number
) => void;

// start movement
export const motion: movementFn = (
  shapes, ctx, canvasWidth, canvasHeight, frames, frameTime
) => {
  increase(
    shapes, ctx, canvasWidth,
    canvasHeight, frames, frameTime
  )
}

// increase distance between shapes
const increase: movementFn = (
  shapes, ctx, canvasWidth, canvasHeight, frames, frameTime
) => {
  let i = 0;
  const interval = setInterval(() => {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    shapes.forEach(shape => shape.move(i / frames))

    i++

    if (i > frames) {
      clearInterval(interval)
      decrease(shapes, ctx, canvasWidth, canvasHeight, frames, frameTime)
    }
  }, frameTime)
}

// decrease distance between shapes
const decrease: movementFn = (
  shapes, ctx, canvasWidth, canvasHeight, frames, frameTime
) => {
  let i = frames;
  const interval = setInterval(() => {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    shapes.forEach(shape => shape.move(i / frames))

    i--

    if (i < 0) {
      clearInterval(interval)
    }
  }, frameTime)
}
