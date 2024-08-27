document.addEventListener('DOMContentLoaded', () =>
{
  displayJournal();
});

function displayJournal()
{
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  const journalContainer = document.getElementById('journal-container');
  journalContainer.innerHTML = ''; // Clear previous content

  favorites.forEach(movie =>
  {
    const journalCard = document.createElement('div');
    journalCard.className = 'journal-card';
    journalCard.innerHTML = `
            <img src="${movie.posterPath}" alt="${movie.title}">
            <h3>${movie.title}</h3>
            <p>Release Date: ${movie.release_date || 'N/A'}</p>
            <p>Rating: ${movie.vote_average || 'N/A'}</p>
            <div class="note-section">
                <textarea id="note-${movie.id}" placeholder="Add your notes here..." rows="4">${movie.note || ''}</textarea>
                <button onclick="saveNote(${movie.id})">Save Note</button>
            </div>
        `;
    journalContainer.appendChild(journalCard);
  });
}


function saveNote(movieId)
{
  const note = document.getElementById(`note-${movieId}`).value;
  let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

  favorites = favorites.map(movie =>
  {
    if (movie.id === movieId)
    {
      movie.note = note; // Add or update the note
    }
    return movie;
  });

  localStorage.setItem('favorites', JSON.stringify(favorites));
  alert('Note saved successfully!');
}
