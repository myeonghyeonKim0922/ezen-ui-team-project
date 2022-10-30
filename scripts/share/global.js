// set min-height of main section
function setMainHeight() {
  const header = document.querySelector(".header");
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

(function main() {
  setMainHeight();
  setGnbSelected();

  addEventListener("resize", setMainHeight);
})();
