import App from "./App.js"
import { numToString } from './utils.js';
import { toggleLoading } from "../share/loading.js";

onload = () => {
  toggleLoading(true);
  let idx = 0;

  // fetch("http://localhost:8080/boxoffice/daily?targetDt=20221102")
  fetch("http://localhost:8080/boxoffice/daily/dummy")
    .then(res => res.json())
    .then(data => {
      const movieList = data.dailyBoxOfficeList;
      const imgList = movieList.map(movie => movie.posterSmall);
      setMovieInfo(movieList[idx]);

      const app = new App(imgList);

      toggleLoading(false);

      setInterval(() => {
        idx = idx + 1 > movieList.length - 1 ? 0 : idx + 1;
        setMovieInfo(movieList[idx])
        app.img.changeImg(idx);
      }, 10000);
    })
}

function setMovieInfo(movie) {
  const title = document.querySelector(".movie__title");
  const openDt = document.querySelector(".movie__open-dt");
  const audacc = document.querySelector(".movie__audacc");
  const gotoBtn = document.querySelector(".movie__goto-info a");

  title.innerText = movie.movieNm;
  openDt.innerText = movie.openDt;
  audacc.innerText = numToString(movie.audiAcc) + "명";

  gotoBtn.setAttribute("href", "/pages/movieInfo.html?movieCd=" + movie.movieCd);
}
