class Canvas {
  el;
  ctx;
  off;
  offCtx;
  constructor() {
    const canvas = document.createElement("canvas");
    this.el = canvas;
    this.ctx = canvas.getContext("2d");

    const offCanvas = document.createElement("canvas");
    this.off = offCanvas;
    this.offCtx = offCanvas.getContext("2d");

    this.init();
    this.resize();

    // addEventListener("resize", this.resize.bind(this));
  }

  init() {
    const root = document.querySelector(".canvas__wrap")
    root.appendChild(this.el);
  }

  resize() {
    const header = document.querySelector(".header__main");
    const canvasWrap = document.querySelector(".canvas__wrap");

    const headerHeight = getComputedStyle(header).height;
    const canvasWrapWidth = getComputedStyle(canvasWrap).width;

    const height = innerHeight - Number(headerHeight.slice(0, -2));
    const width = Number(canvasWrapWidth.slice(0, -2));

    this.el.width = width;
    this.el.height = height;
    this.off.width = width;
    this.off.height = height;
  }

  get width() {
    return this.el.width;
  }

  get height() {
    return this.el.height;
  }
}

export default Canvas;