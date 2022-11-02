const apiUrl = {
    daily: "http://13.125.36.145:8080/boxoffice/daily",
    weekly: "http://13.125.36.145:8080/boxoffice/weekly",
    list: "http://13.125.36.145:8080/movie/list",
    info: "http://13.125.36.145:8080/movie/info"
  }
  
function createCard(url, poster, score, title, release, date, genre, nation, director) {
  const movieboxlist = document.querySelector(".wrap__movie_main__movielist");
  // 문서에서 .wrap__movie_main__movielist 클래스를 가진 요소를
  // 상수 movieboxlist 에 선언

  const movieBox = document.createElement("div");
  // movieBox 라는 div 만듬

  movieBox.classList.add("movie_list__movieboxes__movie");
  // movieBox 에 movie_list__movieboxes__movie 클래스 추가

  movieBox.innerHTML = `

        <a href="#">
            <div class="poster">
                <img src="${url}" alt="${poster}"/>
            </div>
            <div class="starscore">
                <h1>${score}</h1>
            </div>
            <div class="movie_title">
                <h1>${title}</h1>
                <div class="release">${release}</div>
            </div>

            <div class="movieboxes__info">
                <div>
                <span class="release-title">개봉일</span>
                <span class="info" id="releaseDate">${date}</span>
                </div>
                <div>
                <span class="genre-title">장르</span>
                <span class="info" id="genre">${genre}</span>
                </div>
                <div>
                <span>국가</span>
                <span class="info" id="nation">${nation}</span>
                </div>
                <div>
                <span>감독</span>
                <span class="info" id="director">${director}</span>
                </div>
            </div>

            <div class="underbar"></div>
        </a>

    `;

  movieboxlist.appendChild(movieBox);
  // movieboxlist 하위에 movieBox 추가
}

createCard("url", "기생충 포스터", "★10.0", "기생충", "개봉중", "날짜", "장르", "국가", "감독이름");
