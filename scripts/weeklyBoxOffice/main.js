let url = "http://localhost:8080/boxoffice/weekly?targetDt=20221020";
let url = "http://13.125.36.145:8080/boxoffice/weekly?targetDt=20221030";

let data = 0;
let adata = 0;
fetch(url)
  .then((res) => res.json())
  .then((data) => {
    return data.weeklyBoxOfficeList;
  })
  .then((adata) => {
    console.log(adata);
    adata.forEach((data) => {
      movieCard(data);
    });
    swiperPoster(adata);
  });

function movieCard(datalist) {
  const cardwrap = document.createElement("li");
  const cardFrame = document.createElement("div");
  const navMovieInfo = document.createElement("a");
  const moviePoster = document.createElement("div");
  const poster2 = document.createElement("img");
  const movieInfo = document.createElement("div");
  const infoList = document.createElement("ul");
  const list1 = document.createElement("li");
  const list2 = document.createElement("li");
  const list3 = document.createElement("li");
  const list4 = document.createElement("li");
  const list5 = document.createElement("li");
  const list6 = document.createElement("li");

  cardFrame.classList.add("movie__card");
  navMovieInfo.classList.add("nav__movieinfo");
  moviePoster.classList.add("movie__poster");
  poster2.classList.add("poster2");
  movieInfo.classList.add("movie__info");
  infoList.classList.add("info__list");
  list1.classList.add("list__1");
  list2.classList.add("list__2");
  list3.classList.add("list__3");
  list4.classList.add("list__4");
  list5.classList.add("list__5");
  list6.classList.add("list__6");

  list1.innerText = datalist.movieNm;
  list2.innerText = datalist.openDt;
  list3.innerText = datalist.salesAcc + "원";
  list5.innerText = datalist.salesAmt + "명";
  poster2.setAttribute("src", datalist.poster);

  const cardList = document.querySelector(".card__list");
  cardList.appendChild(cardwrap);
  cardwrap.appendChild(cardFrame);
  cardFrame.appendChild(navMovieInfo);
  cardFrame.appendChild(moviePoster);
  moviePoster.appendChild(poster2);
  cardFrame.appendChild(movieInfo);
  movieInfo.appendChild(infoList);
  infoList.appendChild(list1);
  infoList.appendChild(list2);
  infoList.appendChild(list3);
  infoList.appendChild(list4);
  infoList.appendChild(list5);
  infoList.appendChild(list6);
}

function swiperPoster(datalist) {
  const slides = document.querySelectorAll(".swiper-slide");
  slides.forEach((slide, i) => {
    const img = document.createElement("img");
    img.setAttribute("src", datalist[i].poster);
    slide.appendChild(img);
  });
}
