import { toggleLoading } from "./../share/loading.js";

function information(movieInfo) {
  const title = document.querySelector(".info__title");
  const titleEn = document.querySelector(".info__title_ensub");

  const infoItemDir = document.querySelector(".info__item--dir");
  const infoItemGrade = document.querySelector(".info__item--grade");
  const infoItemGenre = document.querySelector(".info__item--genre");
  const infoItemStartDt = document.querySelector(".info__item--start-dt");
  const infoItemOpenDt = document.querySelector(".info__item--open-dt");
  const infoItemCountry = document.querySelector(".info__item--country");

  title.innerText = movieInfo.movieNm;
  titleEn.innerText = movieInfo.movieNmEn;

  infoItemDir.innerText = "감독 :" + " " + movieInfo.directors[0].peopleNm;
  infoItemGrade.innerText =
    "상영등급 :" + " " + movieInfo.audits[0].watchGradeNm;
  infoItemGenre.innerText = "장르 :" + " " + movieInfo.genres[0].genreNm;
  infoItemStartDt.innerText = "제작년도 :" + " " + movieInfo.prdtYear;
  infoItemOpenDt.innerText = "개봉년도 :" + " " + movieInfo.openDt;
  infoItemCountry.innerText =
    "제작국가 :" + " " + movieInfo.nations[0].nationNm;
}

function posterView(movieInfo) {
  const posterImg = document.querySelector(".movie__poster img");

  posterImg.setAttribute("src", movieInfo.posterSrc);
}

function contentStroylineMainStaff(movieInfo) {
  const contentMainShort = document.querySelector(".content__main--short");
  const contentMainLong = document.querySelector(".content__main--long");

  contentMainShort.innerText = movieInfo.summary1;
  contentMainLong.innerText = movieInfo.summary2;

  const contentMainWrap = document.querySelector(".content__main--wrap");
  const staffWrap = document.querySelector(".staffs");
  const buttonChange = document.querySelector(".content__tab--sum a");
  const buttonChange2 = document.querySelector(".content__tab--staff a");

  buttonChange.addEventListener("click", () => {
    contentMainWrap.style.display = "block";
    staffWrap.style.display = "none";
  });

  buttonChange2.addEventListener("click", () => {
    contentMainWrap.style.display = "none";
    staffWrap.style.display = "grid";

    staffWrap.innerHTML = "";

    const staffs = movieInfo.staffs;
    const filStaffs = staffs.filter((staffs) => {
      if (
        staffs.staffRoleNm === "조감독" ||
        staffs.staffRoleNm === "제작" ||
        staffs.staffRoleNm === "제작팀"
      ) {
        return true;
      }
    });

    const staffJob = document.createElement("div");
    staffJob.innerText = "참여스테프";
    staffWrap.append(staffJob);
    staffJob.classList.add("staffJob");

    const stafflistWrap = document.createElement("div");
    stafflistWrap.classList.add("staffs__wrap");
    staffWrap.append(stafflistWrap);

    filStaffs.forEach((staff, index) => {
      const staffList = document.createElement("div");
      staffList.classList.add("staffs__item");
      staffList.innerText = "이름 : " + staff.peopleNm;
      stafflistWrap.append(staffList);
    });
  });
}

function addImgToSwiper(movieInfo) {
  const mySwiper2 = document.querySelector(".mySwiper2 .swiper-wrapper");
  const mySwiper = document.querySelector(".mySwiper .swiper-wrapper");

  const imgs = movieInfo.images;

  imgs.forEach((img) => {
    const swiperSlide = document.createElement("div");
    swiperSlide.classList.add("swiper-slide");
    swiperSlide.innerHTML = `<img src="${img}" />`;

    const swiperSlide2 = swiperSlide.cloneNode(true);

    mySwiper2.appendChild(swiperSlide2);
    mySwiper.appendChild(swiperSlide);
  });
}

function addHover() {
  const contentTabSum = document.querySelector(".content__tab--sum");
  const contentTabStaff = document.querySelector(".content__tab--staff");
  const contentTabSumA = document.querySelector(".content__tab--sum a");
  const contentTabStaffA = document.querySelector(".content__tab--staff a");

  contentTabSumA.addEventListener("mouseover", () => {
    contentTabSumA.style.fontSize = "30px";
    contentTabSumA.style.fontWeight = "bold";
  });

  contentTabSumA.addEventListener("mouseleave", () => {
    contentTabSumA.style.fontSize = "";
    contentTabSumA.style.fontWeight = "";
  });

  contentTabStaffA.addEventListener("mouseover", () => {
    contentTabStaffA.style.fontSize = "30px";
    contentTabStaffA.style.fontWeight = "bold";
  });

  contentTabStaffA.addEventListener("mouseleave", () => {
    contentTabStaffA.style.fontSize = "";
    contentTabStaffA.style.fontWeight = "";
  });

  contentTabSumA.addEventListener("click", () => {
    contentTabSum.style.backgroundColor = "beige";
    contentTabStaff.style.backgroundColor = "";
  });

  contentTabStaffA.addEventListener("click", () => {
    contentTabSum.style.backgroundColor = "white";
    contentTabStaff.style.backgroundColor = "beige";
  });
}
addHover();

const urlObj = new URL(location.href);
const movieCd = urlObj.searchParams.get("movieCd");
console.log(movieCd);

const url = "http://13.125.36.145:8080/movie/info?movieCd=" + movieCd;

toggleLoading(true);
fetch(url)
  .then((res) => res.json())
  .then((data) => {
    const movieInfo = data.movieInfo;
    console.log(movieInfo);
    information(movieInfo);
    posterView(movieInfo);
    contentStroylineMainStaff(movieInfo);
    addImgToSwiper(movieInfo);
  })
  .then(() => {
    var swiper = new Swiper(".mySwiper", {
      loop: true,
      spaceBetween: 10,
      slidesPerView: 4,
      freeMode: true,
      watchSlidesProgress: true,
    });
    var swiper2 = new Swiper(".mySwiper2", {
      loop: true,
      spaceBetween: 10,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      thumbs: {
        swiper: swiper,
      },
    });
    toggleLoading(false);
  });
