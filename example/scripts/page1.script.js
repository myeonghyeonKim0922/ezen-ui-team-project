const kobisKey = "6e366ce8b5c64c17cdc1520bdc6af5d8";

const kobisURL = {
  daily: "http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json",
  search: "http://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieList.json",
  detail: "http://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieInfo.json"
}

const customAPIURL = {
  info: "http://13.125.36.145:8080/search/movie/info",
  poster: "http://13.125.36.145:8080/search/movie/poster"
}

async function getDailyBoxOffice() {
  const dailyUrl = `${kobisURL.daily}?key=${kobisKey}&targetDt=${"20221031"}`;
  const dailyData = await fetch(dailyUrl).then(res => res.json());
  const dailyMovieList = dailyData.boxOfficeResult.dailyBoxOfficeList;

  dailyMovieList.map(async (movie) => {
    const detailUrl = `${kobisURL.detail}?key=${kobisKey}&movieCd=${movie.movieCd}`;
    const detailData = await fetch(detailUrl).then(res => res.json());
    const detail = detailData.movieInfoResult.movieInfo;

    const dirs = detail.directors;
    let dirNames = "";
    if (dirs.length > 1) {
      dirNames = detail.directors.reduce((lhs, rhs) => lhs.peopleNm + "|" + rhs.peopleNm);
    } else if (dirs.length == 1) {
      dirNames = dirs[0].peopleNm;
    }

    const posterUrl = `${customAPIURL.poster}?title=${movie.movieNm}&dirs=${dirNames}`;
    const posterData = await fetch(posterUrl).then(res => res.json());
    if (posterData.result === "success") {
      const posterSrc = posterData.data.posterSrc ?? undefined;
      createCard(movie, posterSrc);
    } else {
      createCard(movie);
    }
  })
}

function createCard(movie, posterSrc = "") {
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
  posterImg.setAttribute("src", posterSrc);

  card.appendChild(cardLink);

  cardLink.appendChild(rank);
  cardLink.appendChild(poster);
  poster.appendChild(posterImg);
  cardLink.appendChild(info);
  info.appendChild(title);
  info.appendChild(openDt);

  document.querySelector(".result").appendChild(card);
}

(function main() {
  getDailyBoxOffice();
})();