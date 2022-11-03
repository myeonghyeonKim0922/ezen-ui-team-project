import { getDist } from "./utils.js";

class Circle {
  x;
  y;
  radius;
  tmpRadius;
  color;

  constructor(x, y, radius, { r, g, b }) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.tmpRadius = radius;
    this.color = { r, g, b };
  }

  draw(ctx) {
    const { r, g, b } = this.color;
    ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
  }

  update(ctx, targetColor = undefined, mouse = undefined) {
    if (targetColor) {
      let { r, g, b } = this.color;
      const { r: dr, g: dg, b: db } = targetColor;

      if (Math.abs(dr - r) > 1)
        this.color.r += (dr - r) / 50;

      if (Math.abs(dg - g) > 1)
        this.color.g += (dg - g) / 50;

      if (Math.abs(db - b) > 1)
        this.color.b += (db - b) / 50;
    };

    if (mouse) {
      const { x: mx, y: my, r: mr } = mouse;

      const dist = getDist(this.x, this.y, mx, my);
      if (dist < this.radius + mr) {
        let maxRadius = (mr/15) - (dist/mr);
        this.radius = this.radius + 1 > maxRadius ? maxRadius : this.radius + 1;
      } else {
        let speed = 0.05;
        this.radius = this.radius - speed < this.tmpRadius ? this.tmpRadius : this.radius - speed;
      }
    }
    this.draw(ctx);
  }
}

export default Circle;