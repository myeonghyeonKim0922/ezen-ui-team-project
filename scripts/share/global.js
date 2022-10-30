// set min-height of main section
function setMainHeight() {
  const header = document.querySelector(".header__main");
  const footer = document.querySelector(".footer");
  const main = document.querySelector(".main");

  main.style.minHeight = innerHeight - (header.clientHeight + footer.clientHeight) + "px";
}

// gnb__item selected
function setGnbSelected() {
  const url = new URL(window.location.href);
  const pathList = url.pathname.split("/"); 

  const gnbItems = document.querySelectorAll(".gnb__item");

  gnbItems.forEach(item => item.classList.remove("gnb__item--selected"))
  
  switch (pathList[pathList.length - 1]) {
    case "dailyBoxOffice.html":
      gnbItems[0].classList.add("gnb__item--selected");
      break;
    case "weeklyBoxOffice.html":
      gnbItems[1].classList.add("gnb__item--selected");
      break;
    case "searchMovie.html":
      gnbItems[2].classList.add("gnb__item--selected");
      break;
    default:
      break;
  }
}

// set mobile menu button

function setMenuButton() {
  const menuBtn = document.querySelector(".menu__button");

  menuBtn.addEventListener("click", () => {
    const isOpen = menuBtn.classList.toggle("menu__button--open");

    toggleMenu(isOpen);
  })
}

function toggleMenu(on) {
  const menu = document.querySelector(".menu");
  if (on) {
    menu.style.display = "block";
    setTimeout(() => {
      menu.style.top = "60px";
    }, 100);
  } else {
    menu.style.top = "-60px";
    setTimeout(() => {
      menu.style.display = "none";
    }, 500);
  }
}

(function main() {
  setMainHeight();
  setGnbSelected();
  setMenuButton();

  addEventListener("resize", setMainHeight);
})();
