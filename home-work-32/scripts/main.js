const API_URL = 'https://www.omdbapi.com/?apikey=d511dcf3';
const searchInput = document.querySelector('#movieTitle');
const moviesContainer = document.querySelector('#moviesContainer');

const getMovies = async (searchedValue) => {
  const response = await fetch(`${API_URL}&s=${searchedValue}`);
  return response.json();
};

const debounce = (callback, delay = 600) => {
  let timer;

  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => { callback.apply(this, args); }, delay);
  };
};

const getPoster = (movie) => {
  return movie['Poster'] === 'N/A' ? 'images/poster-placeholder.png' : movie['Poster'];
};

const applyPosterFallback = () => {
  const images = moviesContainer.querySelectorAll('img');

  images.forEach(img => {
    img.addEventListener('error', () =>  img.src = 'images/poster-placeholder.png');
  });
};

const displayMovies = (movies) => {
  const moviesList = movies['Search'].map((movie) => {
    return `
      <div class="movie-item">
        <img src="${getPoster(movie)}"  alt="poster">
        
        <div class="movie-info">
          <h3>${movie['Title']}</h3>
          <div class="meta">Movie type: ${movie['Type']} | Released year: ${movie['Year']}</div>
          <a href="https://www.imdb.com/title/${movie.imdbID}" target="_blank">Go to IMDb</a>
        </div>
      </div>
    `;
  }).join('');

  moviesContainer.innerHTML = moviesList;
  applyPosterFallback();
};

const handleSearchInput = async (searchedValue) => {
  moviesContainer.innerHTML = '<div class="loading">Loading...</div>';

  try {
    const res = await getMovies(searchedValue);

    if (res['Response'] !== 'True') {
      moviesContainer.innerHTML = '<div class="loading">Movies not found</div>';
      throw new Error(res['Error'])
    }

    displayMovies(res);
  } catch (error) {
    throw new Error(error);
  }
};

const debouncedSearch = debounce(handleSearchInput);
searchInput.addEventListener('input', (event) => debouncedSearch(event.target.value));