class MouseCircle {
  x;
  y;
  r;

  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
  }

  draw(ctx) {
    // ctx.fillStyle = "white";
    // ctx.strokeStyle = "black";
    ctx.strokeStyle = "white";

    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.closePath();
    // ctx.fill();
    ctx.stroke();
  }

  update(ctx, x, y) {
    this.x = x;
    this.y = y;
    this.draw(ctx);
  }
}

export default MouseCircle;