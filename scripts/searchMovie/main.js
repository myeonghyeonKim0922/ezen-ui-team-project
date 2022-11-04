import { toggleLoading } from './../share/loading.js';

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


function createCard(movie) {
  const movieboxlist = document.querySelector(".wrap__movie_main__movielist");
  // 문서에서 .wrap__movie_main__movielist 클래스를 가진 요소를
  // 상수 movieboxlist 에 선언

  const movieBox = document.createElement("div");
  // movieBox 라는 div 만듬

  movieBox.classList.add("movie_list__movieboxes__movie");
  // movieBox 에 movie_list__movieboxes__movie 클래스 추가

  let dir = "";

  if (movie.directors.length > 0)
    dir = movie.directors[0].peopleNm;

  movieBox.innerHTML = `

      <a href="./movieInfo.html?movieCd=${movie.movieCd}">
          <div class="poster">
              <img src="${movie.poster}" alt="${movie.poster}"/>
          </div>
          <div class="starscore">
              <h1>★${movie.score}</h1>
          </div>
          <div class="movie_title">
              <h1>${movie.movieNm}</h1>
              <div class="release">${movie.prdtStatNm}</div>
          </div>

          <div class="movieboxes__info">
              <div>
              <span class="release-title">개봉일</span>
              <span class="info" >${movie.openDt}</span>
              </div>
              <div>
              <span class="genre-title">장르</span>
              <span class="info" >${movie.repGenreNm}</span>
              </div>
              <div>
              <span>국가</span>
              <span class="info" >${movie.repNationNm}</span>
              </div>
              <div>
              <span>감독</span>
              <span class="info" >${dir}</span>
              </div>
          </div>

          <div class="underbar"></div>
      </a>

    `;

  movieboxlist.appendChild(movieBox);
  // movieboxlist 하위에 movieBox 추가
}

// createCard("url", "기생충 포스터", "★10.0", "기생충", "개봉중", "날짜", "장르", "국가", "감독이름");
// createCard("url", "기생충 포스터", "★10.0", "기생충", "개봉중", "날짜", "장르", "국가", "감독이름");
// createCard("url", "기생충 포스터", "★10.0", "기생충", "개봉중", "날짜", "장르", "국가", "감독이름");
// createCard("url", "기생충 포스터", "★10.0", "기생충", "개봉중", "날짜", "장르", "국가", "감독이름");
// createCard("url", "기생충 포스터", "★10.0", "기생충", "개봉중", "날짜", "장르", "국가", "감독이름");
// createCard("url", "기생충 포스터", "★10.0", "기생충", "개봉중", "날짜", "장르", "국가", "감독이름");

function getData (userSearch) {
  toggleLoading(true);
  const url = "http://13.125.36.145:8080/movie/list?movieNm=" + userSearch;
  fetch(url)
  .then((res) => res.json())
  .then((data) => {
    // console.log(data);
    const movieList = data.movieList;
    // console.log(movieList[0]);

    document.querySelector(".wrap__movie_main__movielist").innerHTML = "";
    movieList.forEach((movie) => {
      
      // createCard(movie.poster, movie.score, movie.movieNm, movie.prdStatNm, movie.openDt, movie.repGenreNm, movie.repNationNm, movie.directors[0])
      createCard(movie)
    })
    toggleLoading(false);
  })
}

  const searchButton = document.querySelector(".wrap__search_box button")
  const searchBar = document.querySelector(".wrap__search_box input")

  searchButton.addEventListener("click" , () => {
    getData(searchBar.value)
  })

  
  searchBar.addEventListener("keydown", (e) => {
    if (e.key == "Enter") {
      getData(searchBar.value)
    } 
  })