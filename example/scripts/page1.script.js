const apiUrl = {
  daily: "http://13.125.36.145:8080/boxoffice/daily",
  weekly: "http://13.125.36.145:8080/boxoffice/weekly",
  list: "http://13.125.36.145:8080/movie/list",
  info: "http://13.125.36.145:8080/movie/info"
}

async function getDailyBoxOffice(targetDt) {
  const dailyUrl = apiUrl.daily + "?targetDt=" + targetDt;
  const dailyData = await fetch(dailyUrl).then(res => res.json());
  const dailyMovieList = dailyData.dailyBoxOfficeList;

  dailyMovieList.forEach((movie, i) => {
    if (i === 0)
      setMainResult(movie);
    createCard2(movie)
  })
}

async function getMovieList(movieNm) {
  const url = apiUrl.list + "?movieNm=" + movieNm;
  const data = await fetch(url).then(res => res.json());
  const movieList = data.movieList;

  document.querySelector(".result").innerHTML = "";
  movieList.forEach(movie => createCard2(movie));
}

function search() {
  const searchTerm = document.querySelector(".search__input").value;
  if (searchTerm.replaceAll(" ", "") !== "") {
    getMovieList(searchTerm);
  }
}

function createCard(movie) {
  const card = document.createElement("div");
  const cardLink = document.createElement("a");

  const rank = document.createElement("div");

  const poster = document.createElement("div");
  const posterImg = document.createElement("img");

  const info = document.createElement("div");
  const title = document.createElement("div");
  const openDt = document.createElement("div");

  card.classList.add("card");
  cardLink.classList.add("card__link");
  rank.classList.add("card__rank");
  poster.classList.add("card__poster");
  posterImg.classList.add("card__poster--img");
  info.classList.add("card__info");
  title.classList.add("info__title");
  openDt.classList.add("info__open-dt");

  rank.innerText = movie.rank;
  title.innerText = movie.movieNm;
  openDt.innerText = movie.openDt;
  posterImg.setAttribute("src", movie.poster);

  card.appendChild(cardLink);

  cardLink.appendChild(rank);
  cardLink.appendChild(poster);
  poster.appendChild(posterImg);
  cardLink.appendChild(info);
  info.appendChild(title);
  info.appendChild(openDt);

  document.querySelector(".result").appendChild(card);
}

function createCard2(movie) {
  const list = document.querySelector(".result");

  const card = document.createElement("div");
  card.classList.add("card");

  card.innerHTML = `
    <a class="card__link" href="/example/page2.html#${movie.movieCd}">
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

function numToString(num) {
  const strArr = num.toString().split("");

  const arr = [];
  for (let i = strArr.length - 1; i > 0; i--) {
    if ((arr.length + 1) % 4 === 0) {
      arr.unshift(",");
    }
    arr.unshift(strArr[i]);
  }

  return arr.join("");
}

(function main() {
  getDailyBoxOffice("20221101");

  document.querySelector(".search__input").addEventListener("keydown", e => {
    if (e.key === "Enter")
      search();
  })
  document.querySelector(".search__btn").addEventListener("click", e => {
    search();
  })
})();