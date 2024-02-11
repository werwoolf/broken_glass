export type coordinate = { x: number, y: number };

export type line = [coordinate, coordinate];

export type rgbColor = `rgb(${number}, ${number}, ${number})`;

export type shape = {
  apexes: Array<coordinate>,
  color: rgbColor
}
