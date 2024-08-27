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


function searchMovies(query)
{
  fetch(`${path}/search/movie?api_key=${API_KEY}&query=${query}`)
    .then(response => response.json())
    .then(data =>
    {
      if (data.results.length > 0)
      {
        displayMovies(data.results);
      } else
      {
        alert('No movies found for the search query!');
      }
    })
    .catch(error => console.log(error));
}


function addToFavorites(id, title, posterPath)
{
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  const isAlreadyFavorite = favorites.some(movie => movie.id === id);

  if (!isAlreadyFavorite)
  {
    favorites.push({ id, title, posterPath });
    localStorage.setItem('favorites', JSON.stringify(favorites));
    displayFavorites();
  } else
  {
    alert('This movie is already in your favorites!');
  }
}

function displayFavorites()
{
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  const favoritesContainer = document.getElementById('favorites');
  favoritesContainer.innerHTML = ''; // Clear previous favorites

  favorites.forEach(movie =>
  {
    const movieCard = document.createElement('div');
    movieCard.className = 'movie-card';
    movieCard.innerHTML = `
            <img src="${movie.posterPath}" alt="${movie.title}">
            <h3>${movie.title}</h3>
        `;
    favoritesContainer.appendChild(movieCard);
  });
}

// Display favorites on page load
displayFavorites();
