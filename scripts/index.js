// .title--text
const title = document.querySelector(".title--text");
// .header__background
const hb = document.querySelector(".header__background");


window.addEventListener('scroll', () => {
  const ratio = scrollY / innerHeight;

  const ttVal = Math.floor(ratio * 800);
  title.style.transform = `translateY(${ttVal}px)`;

  const hbVal = Math.floor(ratio * -100);
  hb.style.transform = `translateY(${hbVal}px)`;

})