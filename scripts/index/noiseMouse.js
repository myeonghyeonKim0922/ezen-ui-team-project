class NoiseMouse {
  cx;
  cy;
  x;
  y;
  r;
  width;
  height;

  idx;

  constructor(cx, cy, r, width, height) {
    noise.seed(Math.random());

    this.cx = cx;
    this.cy = cy;
    this.r = r;
    this.width = width;
    this.height = height;

    this.idx = 0;
  }

  update() {
    const valX = noise.simplex2(this.idx, 0) * this.width/2;
    const valY = noise.simplex2(this.idx + 1, 0) * this.height/2;

    this.x = this.cx + valX;
    this.y = this.cy + valY;

    this.idx += 0.006;
  }
}

export default NoiseMouse;