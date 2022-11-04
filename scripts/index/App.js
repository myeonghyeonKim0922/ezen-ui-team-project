import Canvas from "./Canvas.js";
import Img from "./Img.js";
import Circle from "./Circle.js";
import NoiseMouse from "./noiseMouse.js";
import MouseCircle from "./MouseCircle.js";
import { debounce } from "./utils.js";

class App {
  interval;

  canvas = new Canvas();
  img;
  // img = new Img(this.canvas.offCtx, 44, ["../img/poster1.jpg", "../img/poster2.jpg", "../img/poster3.jpg", "../img/poster4.jpg"]);

  noiseMouse;
  mouseCircle;

  pixels = [];
  circles = [];

  constructor(srcList) {
    this.img = new Img(this.canvas.offCtx, 64, [...srcList]);
    this.init();
    // this.animate();
    this.setResize();

    this.interval = setInterval(() => {
      this.animate();
    }, 1000/30);

    // addEventListener("click", () => {
    //   this.img.changeImg();
    // })
  }

  init() {
    noise.seed(Math.random());

    this.img.setOnload(this.onImgLoad.bind(this));
  }

  animate(time = 0) {
    const ctx = this.canvas.ctx;
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // this.mouseCircle.update(ctx, this.noiseMouse.x, this.noiseMouse.y);
    this.noiseMouse.update();

    let mouse;
    mouse = { x: this.noiseMouse.x, y: this.noiseMouse.y, r: this.noiseMouse.r };

    this.circles.forEach((circle, i) => {
      if (this.img.isChanging) {
        const idx = i * 4;
        const r = this.img.pixels[idx + 0];
        const g = this.img.pixels[idx + 1];
        const b = this.img.pixels[idx + 2];
        circle.update(ctx, { r, g, b }, mouse);
      } else {
        circle.update(ctx, undefined, mouse);
      }
    });

    // requestAnimationFrame(this.animate.bind(this));
  }

  onImgLoad(changeImg = true) {
    this.pixels = this.img.pixels;

    const offset = Math.floor(innerHeight / this.img.height);
    const radius = Math.floor(offset/4)

    this.addCircles(radius, offset);
    this.setMouse(offset);

    if (changeImg)
      this.img.changeImg(0);
  }

  addCircles(radius, offset) {
    this.circles = [];
    for (let i = 0; i < this.pixels.length; i += 4) {
      const x = (i / 4) % this.img.width;
      const y = Math.floor((i / 4) / this.img.width);

      const dx = (this.canvas.width - (this.img.width * offset)) / 2 + (radius + (offset/2));
      const dy = (this.canvas.height - (this.img.height * offset)) / 2 + (radius + (offset/4));

      this.circles.push(new Circle(dx + x * offset, dy + y * offset, radius, { r: 0, g: 0, b: 0 }));
    }
  }

  setMouse(circleOffset) {
    const mouseRangeX = this.img.width * circleOffset;
    const mouseRangeY = this.img.height * circleOffset;
    const mouseRadius = Math.min(mouseRangeX, mouseRangeY) / 5;
    this.noiseMouse = new NoiseMouse(this.canvas.width/2, this.canvas.height/2, mouseRadius, mouseRangeX, mouseRangeY);
    // this.mouseCircle = new MouseCircle(this.noiseMouse.x, this.noiseMouse.y, this.noiseMouse.r);
  }

  setResize() {
    addEventListener("resize", debounce(() => {
      this.init();
      this.canvas.resize();
      this.onImgLoad(false);
    }), 400)
  }
}

export default App;