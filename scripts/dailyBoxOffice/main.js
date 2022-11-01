// daily boxoffice section
function dailyBoxoffice(title, sales, audi){
    const movieName = document.querySelector('.movie__name')
    const salesAccValue = document.querySelector('.salesAcc__value')
    const audiAccValue = document.querySelector('.audiAcc__value')

    movieName.innerText = title
    salesAccValue.innerText = sales
    audiAccValue.innerText = audi

}
dailyBoxoffice('리멤버','113,131','434343434')


// movie list section

function createMovieContent(){
    
    const movieContent = document.createElement('div')
    const movieLink = document.createElement('a')
    const movieContentTop = document.createElement('div')
    const posterImage = document.createElement('img')
    const contentTitle = document.createElement('div')
    const movieContentBottom = document.createElement('div')
    const contentInfo = document.createElement('div')
    const openDt = document.createElement('div')
    const openDtP = document.createElement('p')
    const openDtValue = document.createElement('div')
    const audiAcc = document.createElement('div')
    const audiAccP = document.createElement('p')
    const audiAccValue = document.createElement('div')


    movieContent.classList.add('movie__content')
    movieContentTop.classList.add('movie__content__top')
    contentTitle.classList.add('content__title')
    movieContentBottom.classList.add('movie__content__bottom')
    contentInfo.classList.add('content__info')
    openDt.classList.add('openDt')
    openDtValue.classList.add('openDt__value')
    audiAcc.classList.add('audiAcc')
    audiAccValue.classList.add('audiAcc__value')

    openDtP.innerText= '개봉일'
    audiAccP.innerText = '누적 관객수'
    
    movieContent.appendChild(movieLink)
    movieLink.appendChild(movieContentTop)
    movieLink.appendChild(movieContentBottom)
    movieContentTop.appendChild(posterImage)
    movieContentTop.appendChild(contentTitle)
    movieContentBottom.appendChild(contentInfo)
    contentInfo.appendChild(openDt)
    contentInfo.appendChild(audiAcc)
    openDt.appendChild(openDtP)
    openDt.appendChild(openDtValue)
    audiAcc.appendChild(audiAccP)
    audiAcc.appendChild(audiAccValue)

    const movieList = document.querySelector('.movie__list')
    movieList.appendChild(movieContent)
 
}

createMovieContent()
// const div = document.createElement('div')
// // div.classList.add('class','content')
// document.querySelector('.wrap').appendChild(div)

