const ltbutton = document.getElementById(".lt__button");
const gtbutton = document.getElementById(".gt__button");
var today = new Date();
var setdate = new Date(today);
var setdate2 = new Date(today);
var setdate3 = new Date(today);

var mondate = 0;
var sundate = 0;
var ltdate = 0;

setdate.setDate(today.getDate() - 7);
setdate2.setDate(today.getDate() - 7);
setdate3.setDate(today.getDate() - 7);
var year = "" + setdate.getFullYear();
var month = ("0" + (1 + setdate.getMonth())).slice(-2);
var day = ("0" + setdate.getDate()).slice(-2);
const movieday = `${year}${month}${day}`;

// console.log(movieday);

function lt() {
  const datefont = document.querySelector(".date__font");
  setdate.setDate(setdate.getDate() - 7);
  setdate2.setDate(setdate2.getDate() - 7);
  setdate3.setDate(setdate3.getDate() - 7);
  // console.log(setdate);

  var year = "" + setdate.getFullYear();
  var month = ("0" + (1 + setdate.getMonth())).slice(-2);
  var day = ("0" + setdate.getDate()).slice(-2);
  const movieday = `${year}${month}${day}`;
  const date = new Date();
  const mon = 1;
  const sun = 7;
  const todaysDay = date.getDay();
  const diffm = todaysDay - mon;
  const diffs = sun - todaysDay;
  mondate = setdate2;
  mondate.setDate(setdate.getDate() - diffm);
  var dayMon = ("0" + mondate.getDate()).slice(-2);
  sundate = setdate3;
  sundate.setDate(setdate.getDate() + diffs);
  var daySun = ("0" + sundate.getDate()).slice(-2);
  console.log(setdate3);
  console.log(movieday);
  datefont.innerText = `${year}.${month}.${dayMon} ~ ${year}.${month}.${daySun} `;
  apiload(movieday);
}

function gt() {
  const datefont = document.querySelector(".date__font");
  setdate.setDate(setdate.getDate() + 7);
  setdate2.setDate(setdate2.getDate() + 7);
  setdate3.setDate(setdate3.getDate() + 7);

  var year = "" + setdate.getFullYear();
  var month = ("0" + (1 + setdate.getMonth())).slice(-2);
  var day = ("0" + setdate.getDate()).slice(-2);
  const movieday = `${year}${month}${day}`;
  const date = new Date();
  const mon = 1;
  const sun = 7;
  const todaysDay = date.getDay();
  const diffm = todaysDay - mon;
  const diffs = sun - todaysDay;
  mondate = setdate2;
  mondate.setDate(setdate.getDate() - diffm);
  var dayMon = ("0" + mondate.getDate()).slice(-2);
  sundate = setdate3;
  sundate.setDate(setdate.getDate() + diffs);
  var daySun = ("0" + sundate.getDate()).slice(-2);
  // console.log(setdate3);
  console.log(movieday);
  // console.log(movieday);
  datefont.innerText = `${year}.${month}.${dayMon} ~ ${year}.${month}.${daySun} `;
  apiload(movieday);
}

// let url = "http://localhost:8080";
// url += "/boxoffice/weekly";
// url += "?targetDt=";
// url += getToday();

// console.log(url);

function apiload(movieday) {
  let url = "http://13.125.36.145:8080";
  url += "/boxoffice/weekly";
  // url += "?targetDt=";
  url += "/dummy";
  // url += movieday;

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
    });
}

function movieCard(datalist) {
  const cardwrap = document.createElement("li");
  cardwrap.classList.add("card__wrap");
  const cardList = document.querySelector(".card__list");
  cardList.appendChild(cardwrap);

  cardwrap.innerHTML = ` 
    <div class="movie__card">
      <a href="" class="nav__movieinfo">
      <div class="movie__poster">
        <img src="${datalist.poster}" class="poster2">
      </div>
      <div class="movie__info">
        <ul class="info__list">
          <li class="list__1">${datalist.movieNm}</li>
          <li class="list__2">${datalist.openDt}</li>
          <li class="list__3">${datalist.salesAcc}</li>
          <li class="list__4"></li>
          <li class="list__5">${datalist.salesAmt}</li>
          <li class="list__6"></li>
        </ul>
      </div>
      </a>
    </div>
`;
}

function swiperPoster(datalist) {
  const slides = document.querySelectorAll(".swiper-slide");
  slides.forEach((slide, i) => {
    slide.innerHTML = `<img src="${datalist[i].poster}" />`;
    // const img = document.createElement("img");
    // img.setAttribute("src", datalist[i].poster);
    // slide.appendChild(img);
  });
}

apiload(movieday);
