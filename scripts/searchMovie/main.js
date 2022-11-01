function createCard () {
    // const movieBox = document.createElement("div");
    const movieboxMovie = document.createElement("div");
    const movieBoxLink = document.createElement("a");
    const movieBoxPoster = document.createElement("div");
    const starScore = document.createElement("div");
    const movieTitle = document.createElement("div");
    const releaseButton = document.createElement("div");
    const movieInfo = document.createElement("div");

    const infoReleaseTitle = document.createElement("span");
    const infoReleaseData = document.createElement("span");
    const infoGenreTitle = document.createElement("span");
    const infoGenreData = document.createElement("span");
    const infoNationTitle = document.createElement("span");
    const infoNationData = document.createElement("span");
    const infoDirectorTitle = document.createElement("span");
    const infoDirectorData = document.createElement("span");

    const underbar = document.createElement("div");


    // movieBox.classList.add("movie_list__movieboxes__movie");
    movieboxMovie.classList.add("movie_list__movieboxes__movie")
    starScore.classList.add("starscore");
    movieTitle.classList.add("movie_title");



    const movielist = document.querySelector(".wrap__movie_main__movielist");
    const posterlist = document.querySelector(".poster");
    const starScoreList = document.querySelector(".starscore");

    list.appendChild(movieBox);
    movieBox.appendChild(movieBoxLink);

}

createCard();