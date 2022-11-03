const apiUrl = {
  daily: "http://13.125.36.145:8080/boxoffice/daily",
  weekly: "http://13.125.36.145:8080/boxoffice/weekly",
  list: "http://13.125.36.145:8080/movie/list",
  info: "http://13.125.36.145:8080/movie/info",

  dailyDummy: "http://13.125.36.145:8080/boxoffice/daily/dummy",
  weeklyDummy: "http://13.125.36.145:8080/boxoffice/weekly/dummy",
  listDummy: "http://13.125.36.145:8080/movie/list/dummy",
  infoDummy: "http://13.125.36.145:8080/movie/info/dummy"
};
// 영화 정보 넣기
function setHeadData(movie) {
  const poster = document.querySelector(".poster__img");
  const title = document.querySelector(".info-item:nth-child(1)");
  const score = document.querySelector(".info-item:nth-child(2)");
  const showTm = document.querySelector(".info-item:nth-child(3)");
  const openDt = document.querySelector(".info-item:nth-child(4)");
  const nations = document.querySelector(".info-item:nth-child(5)");
  const genres = document.querySelector(".info-item:nth-child(6)");
  const dirs = document.querySelector(".info-item:nth-child(7)");
  const grade = document.querySelector(".info-item:nth-child(8)");

  poster.setAttribute("src", movie.posterSrc);
  title.innerText = movie.movieNm;
  score.innerText = movie.score;
  showTm.innerText = movie.showTm;
  openDt.innerText = movie.openDt;
  nations.innerText = movie.nations.map(nation => nation.nationNm).join("|");
  genres.innerText = movie.genres.map(genre => genre.genreNm).join("|");
  dirs.innerText = movie.directors.map(dir => dir.peopleNm).join("|");
  grade.innerText = movie.audits.map(audit => audit.watchGradeNm).join("");
}
// 영화 줄거리 넣기
function setContentData(movie) {
  const sum1 = document.querySelector(".sum--1 h3");
  const sum2 = document.querySelector(".sum--2 p");

  sum1.innerText = movie.summary1;
  sum2.innerText = movie.summary2;
}
// 영화 스틸컷 넣기
function setImgViewer(images) {
  const imgViewer = document.querySelector(".image-viewer");

  images.forEach(img => {
    const imgBox = document.createElement("div");
    imgBox.classList.add("image-box");

    imgBox.innerHTML = `<img src="${img}" alt="steel-img" />`;

    imgViewer.appendChild(imgBox);
  })
}
// 영화 정보 가져와서 데이터 넣기
function getMovieInfo() {
  toggleLoading(true);
  // url에서 영화 코드 가져오기
  const url = new URL(window.location.href);
  const movieCd = url.searchParams.get("movieCd");

  const infoUrl = `${apiUrl.info}?movieCd=${movieCd}`;
  // const infoUrl = apiUrl.infoDummy;
  fetch(infoUrl)
    .then(res => res.json())
    .then(data => {
      const movie = data.movieInfo;
      setHeadData(movie);
      setContentData(movie);
      setImgViewer(movie.images);
      toggleLoading(false);
    })
}

function toggleLoading(on) {
  const loadingEl = document.querySelector(".loading");
  loadingEl.style.display = on ? "block": "none";
}

(function main() {
  getMovieInfo();
})();