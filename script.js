const path = "https://api.themoviedb.org/3";
const API_KEY = 'b188d63c4d0eb3ffc891a4150007373f';
const imgBaseUrl = 'https://image.tmdb.org/t/p/w500';

document.addEventListener('DOMContentLoaded', () =>
{
  getPopularMovies();

  document.getElementById('search-bar').addEventListener('keyup', function (event)
  {
    if (event.key === 'Enter')
    {
      searchMovies(event.target.value);
    }
  });
});

function getPopularMovies()
{
  fetch(`${path}/movie/popular?api_key=${API_KEY}`)
    .then(response => response.json())
    .then(data =>
    {
      displayMovies(data.results);
    })
    .catch(error => console.log(error));
}

function displayMovies(movies)
{
  const moviesContainer = document.getElementById('movies-container');
  moviesContainer.innerHTML = ''; // Clear previous movies
  movies.forEach(movie =>
  {
    const movieCard = document.createElement('div');
    movieCard.className = 'movie-card';
    movieCard.innerHTML = `
            <img src="${imgBaseUrl + movie.poster_path}" alt="${movie.title}">
            <h3>${movie.title}</h3>
            <p>Release Date: ${movie.release_date}</p>
            <p>Rating: ${movie.vote_average}</p>
            <button onclick="addToFavorites(${movie.id}, '${movie.title}', '${imgBaseUrl + movie.poster_path}')">Add to Favorites</button>
        `;
    moviesContainer.appendChild(movieCard);
  });
}
