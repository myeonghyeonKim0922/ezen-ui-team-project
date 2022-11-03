const apiUrl = {
  daily: "http://13.125.36.145:8080/boxoffice/daily",
  weekly: "http://13.125.36.145:8080/boxoffice/weekly",
  list: "http://13.125.36.145:8080/movie/list",
  info: "http://13.125.36.145:8080/movie/info",

  dailyDummy: "http://13.125.36.145:8080/boxoffice/daily/dummy",
  weeklyDummy: "http://13.125.36.145:8080/boxoffice/weekly/dummy",
  listDummy: "http://13.125.36.145:8080/movie/list/dummy",
  infoDummy: "http://13.125.36.145:8080/movie/info/dummy"
}
// 영화 정보를 기반으로 카드 만들기
function createCard(movie) {
  const list = document.querySelector(".result");

  const card = document.createElement("div");
  card.classList.add("card");

  card.innerHTML = `
    <a class="card__link" href="/example/page2.html?movieCd=${movie.movieCd}">
      <div class="card__rank">${movie.rank}</div>
      <div class="card__poster">
        <img class="card__poster--img" src="${movie.poster}" alt="card-poster">
      </div>
      <div class="card__info info">
        <div class="info__title">${movie.movieNm}</div>
        <div class="info__open-dt">${movie.openDt}</div>
      </div>
    </a>
  `;

  list.appendChild(card);
}
// 1위 영화 정보 넣기
function setMainResult(movie) {
  const poster = document.querySelector(".main-result__poster--img");
  const title = document.querySelector(".info__item--title");
  const salesAcc = document.querySelector(".info__item--sales-acc");
  const audiAcc = document.querySelector(".info__item--audi-acc");

  const megaboxLink = document.querySelector(".link__theater--mega");
  const cgvLink = document.querySelector(".link__theater--cgv");

  poster.setAttribute("src", movie.poster);
  title.innerText = movie.movieNm;
  salesAcc.innerText = numToString(movie.salesAcc) + "원";
  audiAcc.innerText = numToString(movie.audiAcc) + "명";

  megaboxLink.setAttribute("href", "https://www.megabox.co.kr/movie?searchText=" + movie.movieNm);
  cgvLink.setAttribute("href", "http://www.cgv.co.kr/search/?query=" + movie.movieNm);
}
// 일간 영화정보 가져와서 1위 영화 정보, 카드 만들기
function getDailyBoxOffice(targetDt) {
  // const dailyUrl = apiUrl.daily + "?targetDt=" + targetDt;
  const dailyUrl = apiUrl.dailyDummy;
  fetch(dailyUrl)
    .then(res => res.json())
    .then(dailyData => {
      const dailyMovieList = dailyData.dailyBoxOfficeList;

      dailyMovieList.forEach((movie, i) => {
        if (i === 0) setMainResult(movie);
        createCard(movie)
      })
    })
}
// 검색 결과 가져와서 카드 만들기
function getMovieList(movieNm) {
  // const url = apiUrl.list + "?movieNm=" + movieNm;
  const url = apiUrl.listDummy;
  fetch(url)
    .then(res => res.json())
    .then(listData => {
      const movieList = listData.movieList;

      document.querySelector(".result").innerHTML = "";
      movieList.forEach(movie => createCard(movie));
    })
}
// 영화 검색
function search() {
  const searchTerm = document.querySelector(".search__input").value;
  if (searchTerm.replaceAll(" ", "") !== "") {
    getMovieList(searchTerm);
  }
}
// 숫자에 콤마 붙이기
function numToString(num) {
  const strArr = num.toString().split("");
  const arr = [];
  for (let i = strArr.length - 1; i >= 0; i--) {
    if ((arr.length + 1) % 4 === 0) {
      arr.unshift(",");
    }
    arr.unshift(strArr[i]);
  }

  return arr.join("");
}

(function main() {
  getDailyBoxOffice("20221101");

  document.querySelector(".search__btn").addEventListener("click", () => search())
})();