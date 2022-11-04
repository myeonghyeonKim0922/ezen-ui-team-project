//API call
// url = 'http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/'
// url +=
// url += "?targetDt={dateFormat()}";
// url = "http://13.125.36.145:8080/boxoffice/daily/dummy";
url = "http://13.125.36.145:8080/boxoffice/daily?targetDt=" + dateFormat();

// 영화 정보를 기반으로 카드 만들기
function createCard(data) {
  const result = document.querySelector(".movie__list");
  const content = document.createElement("div");
  content.classList.add("movie__content");

  const poster = data.poster || "../img/poster-img.jpg";
  content.innerHTML = `
    <a href="./movieInfo.html?movieCd=${data.movieCd}" class='movie__info'>
      <div class="movie__content__top">
        <div class="poster__section">
          <img src="${poster}" alt="poster" />
          <div class="movie__rank">${data.rank}</div>
          <div class="movie__oldandnew">${data.rankOldAndNew}</div>
        </div>
        <div class="content__title">${data.movieNm}</div>
      </div>
      <div class="movie__content__bottom">
        <div class="content__info">
          <div class="openDt">
            <p>개봉일</p>
            <div class="openDt__value">${data.openDt.replaceAll('-','/')}</div>
          </div>
          <div class="audiAcc">
            <p>누적 관객수</p>
            <div class="audiAcc__value">${numFormat(
              data.audiAcc
            )}명</div>
          </div>
        </div>
      </div>
    </a>`;
  result.appendChild(content);
}

// daily boxoffice section
// 상단 1위 영화 정보 넣기
function dailyBoxoffice(data) {
  const rank = document.querySelector('.rank')
  const infoLink = document.querySelector('.info__link')
  const movieName = document.querySelector(".movie__name");
  const salesAccValue = document.querySelector(".salesAcc__value");
  const audiAccValue = document.querySelector(".audiAcc__value");
  const moviePoster = document.querySelector(".first__poster a img");

  const megaLink = document.querySelector('.link__theater--mega')
  const cgvLink = document.querySelector('.link__theater--cgv')

 
  moviePoster.setAttribute("src", data.poster);
  infoLink.setAttribute('href','./movieInfo.html?movieCd=' + data.movieCd)
  rank.innerText = data.rank;
  movieName.innerText = data.movieNm;
  salesAccValue.innerText = numFormat(data.salesAcc) + "원";
  audiAccValue.innerText = numFormat(data.audiAcc) + "명";

  megaLink.setAttribute('href',"https://www.megabox.co.kr/movie?searchText=" + data.movieNm)
  cgvLink.setAttribute('href',"http://www.cgv.co.kr/search/?query=" + data.movieNm)
}

function getDailyBoxOffice(targetDt){
  toggleLoading(true);
  const dailyUrl = 'http://13.125.36.145:8080/boxoffice/daily' + '?targetDt=' + targetDt;

  fetch(dailyUrl)
  .then(res => res.json())
  .then(data => {
    const arr = data.dailyBoxOfficeList;
    arr.forEach((movie, i) => {
      if (i === 0) dailyBoxoffice(movie);

      createCard(movie);
    })
    toggleLoading(false);
  })
}

//한자리 숫자 앞에 0 넣어주는 함수
function numberPad(n, width) {
  n = n + "";
  return n.length >= width ? n : new Array(width - n.length + 1).join("0") + n;
}

// date 포맷 함수
function dateFormat() {
  var dt = new Date();
  const year = dt.getFullYear()
  const month = (dt.getMonth() + 1)
  const date = numberPad(dt.getDate(), 2)
  // const formatedDate = year + month + date;
  const formatedDate = `${year}${month}${date}`;
  return formatedDate;
}

// 숫자 세자리마다 , 찍어주는 함수
function numFormat(n) {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// 로딩 디스크
function toggleLoading(on) {
  const loadingEl = document.querySelector(".loading");
  loadingEl.style.display = on ? "block": "none";
}

getDailyBoxOffice("20221101");



