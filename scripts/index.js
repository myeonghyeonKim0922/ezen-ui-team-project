// .title--text
const title = document.querySelector(".title--text");
// .header__background
const headerBG = document.querySelector(".header__background");

// .header__background--image
const headerImg = document.querySelector(".header__background--image");

// .logo
const logo = document.querySelector(".logo a");
// .header__selectBox
const headerSelectBox = document.querySelector(".header__selectBox");
// .gnb__item all
const gnbItems = document.querySelectorAll(".gnb__item a");
// .gnb__item--selected
const gnbItemSelected = document.querySelector(".gnb__item--selected");

window.addEventListener("scroll", () => {
  const ratio = scrollY / innerHeight;

  const titleVal = Math.floor(ratio * 800);
  title.style.transform = `translateY(${titleVal}px)`;

  const headerBGVal = Math.floor(ratio * -100);
  headerBG.style.transform = `translateY(${headerBGVal}px)`;

})

let mouseOn = false;
window.addEventListener("mouseover", () => {
  mouseOn = true;
})

window.addEventListener("mousemove", e => {
  if (!mouseOn) return;
  let x = (innerWidth / 2 - e.clientX) / innerWidth/2;
  let y = (innerHeight / 2 - e.clientY) / innerHeight/2;

  x *= 1;
  y *= 1;
  headerImg.style.transform = `translate(${x}%, ${y}%) scale(1.1)`;
})

window.addEventListener("mouseout", () => {
  mouseOn = false;

  headerImg.style.transition = "250ms";
  headerImg.style.transform = `translate(0, 0) scale(1.1)`;
  setTimeout(() => headerImg.style.transition = "unset", 100);
})

logo.addEventListener("mouseover", () => {
  headMouseOverEvent(logo);
})

gnbItems.forEach(item => {
  item.addEventListener("mouseover", () => {
    headMouseOverEvent(item);
  })
})

function headMouseOverEvent(el) {
  const rect = el.getBoundingClientRect();
  const width = rect.width;
  const height = rect.height;
  moveSelectBox(width, height, rect.x, rect.y);
}

function moveSelectBox(width, height, x, y) {
  const headerMarginLeft = window.getComputedStyle(document.querySelector(".header__head")).marginLeft;
  const offX = parseInt(headerMarginLeft);

  headerSelectBox.style.top = y + "px";
  headerSelectBox.style.left = x - offX + "px";
  headerSelectBox.style.width = width + "px";
  headerSelectBox.style.height = height + "px";
  // headerSelectBox.style.transform = `translate(${x}px, ${y}px)`;
}
