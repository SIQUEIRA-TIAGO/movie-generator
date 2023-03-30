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
  movieTitle.innerText = `${movieData.title} (${movieData.release_date.slice(0, 4)})`
  movieTitle.className = 'movieTitle'

  const movieInfo = document.createElement('span')
  const movieGenre = movieData.genres.map(genre => genre.name).join(', ');
  const hours = Math.floor(movieData.runtime / 60);
  const remainingMinutes = movieData.runtime % 60;
  movieInfo.innerText = `${hours}h ${remainingMinutes}min • ${movieGenre} • Nota: ${movieData.vote_average}`
  movieInfo.className = 'movieInfo'

  const movieOverview = document.createElement('p')
  movieOverview.innerText = movieData.overview
  movieOverview.className = 'movieOverview'

  const movieInfoArea = document.createElement('div')
  movieInfoArea.className = 'movieInfoArea'

  movieInfoArea.append(movieTitle, movieInfo, movieOverview)

  const movie = document.createElement('div')
  movie.className = 'root'
  movie.append(moviePoster, movieInfoArea)

  root.append(movie)
})