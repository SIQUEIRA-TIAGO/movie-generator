import {
  API_KEY,
  BASE_URL,
  IMG_URL,
  language
} from './api.js'

const getData = async () => {
  let data = null;
  do {
    data = await fetch(`${BASE_URL}${Math.floor(Math.random() * 88955) + 1}?${API_KEY}&${language}`).then(r => r.json() )
  }
  while(!data.overview)
  console.log(data)
  return data
}

document.getElementById('findMovie').addEventListener('click', async () => {
  const movieData = await getData()

  const root = document.getElementById('root')
  if(root.childNodes){
    root.childNodes.forEach(node => node.remove())
  }

  const moviePoster = document.createElement('img')
  moviePoster.src = IMG_URL + movieData.poster_path
  moviePoster.className = 'moviePoster'

  const movieTitle = document.createElement('h4')
  movieTitle.innerText = movieData.title
  movieTitle.className = 'movieTitle'

  const movieOverview = document.createElement('p')
  movieOverview.innerText = movieData.overview
  movieOverview.className = 'movieOverview'

  const movieInfo = document.createElement('div')
  movieInfo.className = 'movieInfo'

  movieInfo.append(movieTitle, movieOverview)

  const movie = document.createElement('div')
  movie.className = 'root'
  movie.append(moviePoster, movieInfo)

  root.append(movie)
})