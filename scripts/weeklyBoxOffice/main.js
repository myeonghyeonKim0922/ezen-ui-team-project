const ltbutton = document.getElementById(".lt__button");
const gtbutton = document.getElementById(".gt__button");
let endDate, startDate;
const prevBtn = document.querySelector(".date__lt");
const nextBtn = document.querySelector(".date__gt");
var today = new Date();
var setdate = new Date(today);
var setdate2 = new Date(today);
setdate2.setDate(setdate.getDate() - 7);
setdate.setDate(setdate.getDate() - 7);
var year2 = "" + setdate.getFullYear();
var month2 = ("0" + (1 + setdate.getMonth())).slice(-2);
var day2 = ("0" + setdate.getDate()).slice(-2);
var btcloseday = `${year2}${month2}${day2}`;
var year = "" + setdate.getFullYear();
var month = ("0" + (1 + setdate.getMonth())).slice(-2);
var day = ("0" + setdate.getDate()).slice(-2);
var movieday = `${year}${month}${day}`;
var closebt = document.querySelector(".gt__button");
closebt.style.display="none";
function lt() {
  // 날짜 왼쪽 버튼 클릭
  setdate.setDate(setdate.getDate() - 7);
  var year = "" + setdate.getFullYear();
  var month = ("0" + (1 + setdate.getMonth())).slice(-2);
  var day = ("0" + setdate.getDate()).slice(-2);
  var movieday = `${year}${month}${day}`;
  if (movieday === btcloseday) {
    closebt.style.display = "none";
  } else {
    closebt.style.display = "block";
  }
  console.log(movieday);
  apiload(movieday);
}
function gt() {
  // 날짜 오른쪽 버튼 클릭
  setdate.setDate(setdate.getDate() + 7);
  var year = "" + setdate.getFullYear();
  var month = ("0" + (1 + setdate.getMonth())).slice(-2);
  var day = ("0" + setdate.getDate()).slice(-2);
  var movieday = `${year}${month}${day}`;
  if (movieday === btcloseday) {
    closebt.style.display = "none";
  } else {
    closebt.style.display = "block";
  }
  console.log(movieday);
  apiload(movieday);
}
function apiload(movieday) {
  //fetch해서 가져온 값
  toggleLoading(true);
  let url = "http://13.125.36.145:8080";
  url += "/boxoffice/weekly";
  url += "?targetDt=";
  // url += "/dummy";
  url += movieday;
  let data = 0;
  let adata = 0;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      return data.weeklyBoxOfficeList;
    })
    .then((adata) => {
      document.querySelector(".card__list").innerHTML = "";
      adata.forEach((data) => {
        movieCard(data);
      });
      swiperPoster(adata);
      toggleLoading(false);
    });
}
function movieCard(datalist) {
  //영화카드 함수
  const cardwrap = document.createElement("li");
  cardwrap.classList.add("card__wrap");
  const cardList = document.querySelector(".card__list");
  cardList.appendChild(cardwrap);
  cardwrap.innerHTML = `
    <div class="movie__card">
      <a href="./movieInfo.html?movieCd=${datalist.movieCd}" class="nav__movieinfo">
      <div class="movie__poster">
        <img src="${datalist.poster}" class="poster2">
      </div>
      <div class="movie__info">
        <ul class="info__list">
          <li class="list__1">${datalist.movieNm}</li>
          <li class="list__2">${datalist.openDt}</li>
          <li class="list__3">${datalist.salesAcc}원</li>
          <li class="list__4"></li>
          <li class="list__5">${datalist.salesAmt}명</li>
          <li class="list__6"></li>
        </ul>
      </div>
      </a>
    </div>
`;
}
function swiperPoster(datalist) {
  //스와이프로 영화 포스터
  const slides = document.querySelectorAll(".swiper-slide");
  slides.forEach((slide, i) => {
    slide.innerHTML = `<img src="${datalist[i].poster}" />`;
    // const img = document.createElement("img");
    // img.setAttribute("src", datalist[i].poster);
    // slide.appendChild(img);
  });
}
function setEndDate(_date) {
  const date = new Date(_date);
  const sun = 0;
  const currentDay = date.getDay();
  const diff = currentDay - sun;
  const newDate = date.getDate() - diff;
  date.setDate(newDate);
  endDate = date;
}
function setStartDate(_date) {
  const date = new Date(_date);
  const newDate = date.getDate() - 6;
  date.setDate(newDate);
  startDate = date;
}
function setDom(_startDate, _endDate) {
  const stDateEl = document.querySelector(".date__start");
  const endDateEl = document.querySelector(".date__end");
  stDateEl.innerText = dateToString(_startDate);
  endDateEl.innerText = dateToString(_endDate);
}
function dateToString(date) {
  const y = date.getFullYear();
  const m = date.getMonth() + 1 > 12 ? 1 : date.getMonth() + 1;
  const d = date.getDate();
  const result = `${y}.${("0" + m).slice(-2)}.${("0" + d).slice(-2)}`;
  return result;
}
function setDate(date) {
  setEndDate(date);
  setStartDate(endDate);
  setDom(startDate, endDate);
}
function toggleLoading(on) {
  const loadingEl = document.querySelector(".loading");
  if (loadingEl) {
    loadingEl.style.display = on ? "block" : "none";
  } else {
    if (on) {
      const mainWrap = document.querySelector(".main__wrap");
      const newLoadingEl = document.createElement("div");
      newLoadingEl.classList.add("loading");
      newLoadingEl.innerHTML = `
          <i class="fa-solid fa-compact-disc"></i>
        `;
      mainWrap.appendChild(newLoadingEl);
    }
  }
}
(function main() {
  setDate(new Date());
  prevBtn.addEventListener("click", () => {
    const newDate = new Date(startDate);
    newDate.setDate(newDate.getDate() - 1);
    setDate(newDate);
  });
  nextBtn.addEventListener("click", () => {
    const newDate = new Date(endDate);
    newDate.setDate(newDate.getDate() + 7);
    setDate(newDate);
  });
})();
apiload(movieday);
