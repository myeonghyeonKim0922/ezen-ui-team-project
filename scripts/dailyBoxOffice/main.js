//API call
// var url = "http://13.125.36.145:8080/boxoffice/daily";
var url = "http://localhost:8080/boxoffice/daily";
url += "?targetDt=20221030";

// var dt = new Date();
// console.log(dt);

fetch(url)
  .then((data) => data.json())
  .then((data) => {
    const arr = data.dailyBoxOfficeList;
    arr.forEach((movie, i) => {
      if (i === 0) dailyBoxoffice(movie);

      createCard(movie);
    });
  });

// daily boxoffice section
// 상단 1위 영화 나타나는 섹션에서 제목, 누적 매출액, 누적 관객수 value부분 가져오기
function dailyBoxoffice(data) {
  const movieName = document.querySelector(".movie__name");
  const salesAccValue = document.querySelector(".salesAcc__value");
  const audiAccValue = document.querySelector(".audiAcc__value");
  const moviePoster = document.querySelector(".first__poster a img");

  movieName.innerText = data.movieNm;
  salesAccValue.innerText = data.salesAcc;
  audiAccValue.innerText = data.audiAcc;
  moviePoster.setAttribute("src", data.poster);
}
// dailyBoxoffice("Movie Title", "SalesAss", "AudiAcc");

// movie list section
function createCard(data) {
  const result = document.querySelector(".movie__list");
  const content = document.createElement("div");
  content.classList.add("movie__content");

  content.innerHTML = `<a href="#">
                <div class="movie__content__top">
                  <img src="${data.poster}" alt="poster" />
                  <div class="content__title">${data.movieNm}</div>
                </div>
                <div class="movie__content__bottom">
                  <div class="content__info">
                    <div class="openDt">
                      <p>개봉일</p>
                      <div class="openDt__value">${data.openDt}</div>
                    </div>
                    <div class="audiAcc">
                      <p>누적 관객수</p>
                      <div class="audiAcc__value">${data.audiAcc}</div>
                    </div>
                  </div>
                </div>
              </a>`;
  result.appendChild(content);
}

// function createMovieContent(data) {
//   // 영화 리스트 섹션 태그 생성
//   const movieContent = document.createElement("div");
//   const movieLink = document.createElement("a");
//   const movieContentTop = document.createElement("div");
//   const posterImage = document.createElement("img");
//   const contentTitle = document.createElement("div");
//   const movieContentBottom = document.createElement("div");
//   const contentInfo = document.createElement("div");
//   const openDt = document.createElement("div");
//   const openDtP = document.createElement("p");
//   const openDtValue = document.createElement("div");
//   const audiAcc = document.createElement("div");
//   const audiAccP = document.createElement("p");
//   const audiAccValue = document.createElement("div");

//   //생성한 태그에 클래스 추가
//   movieContent.classList.add("movie__content");
//   movieContentTop.classList.add("movie__content__top");
//   contentTitle.classList.add("content__title");
//   movieContentBottom.classList.add("movie__content__bottom");
//   contentInfo.classList.add("content__info");
//   openDt.classList.add("openDt");
//   openDtValue.classList.add("openDt__value");
//   audiAcc.classList.add("audiAcc");
//   audiAccValue.classList.add("audiAcc__value");

//   // 클래스까지 추가된 태그에 내용 추가
//   contentTitle.innerText = data.movieNm;
//   openDtP.innerText = "개봉일";
//   audiAccP.innerText = "누적 관객수";
//   openDtValue.innerText = "openDt";
//   audiAccValue.innerText = "audiAcc";

//   // 태그 depth주기
//   movieContent.appendChild(movieLink);
//   movieLink.appendChild(movieContentTop);
//   movieLink.appendChild(movieContentBottom);
//   movieContentTop.appendChild(posterImage);
//   movieContentTop.appendChild(contentTitle);
//   movieContentBottom.appendChild(contentInfo);
//   contentInfo.appendChild(openDt);
//   contentInfo.appendChild(audiAcc);
//   openDt.appendChild(openDtP);
//   openDt.appendChild(openDtValue);
//   audiAcc.appendChild(audiAccP);
//   audiAcc.appendChild(audiAccValue);

//   // root tag
//   const movieList = document.querySelector(".movie__list");
//   movieList.appendChild(movieContent);
// }
// createMovieContent(movie);
