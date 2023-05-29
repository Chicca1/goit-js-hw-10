export function fetchBreeds() {
  const url = 'https://api.thecatapi.com/v1/breeds';
  const apiKey = 'live_7dCmV4ExllLfTC4XWfsPUALgd99N5we4qBh4ydqAgHQnVLcDXUUWrMnCyvmPgEZp';

  return fetch(url, {
    headers: {
      'x-api-key': apiKey
    }
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch breeds');
      }
      return response.json();
    })
    .catch(error => {
      console.error('Error fetching breeds:', error);
      throw error;
    });
}

export function fetchCatByBreed(breedId) {
  const url = `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`;
  const apiKey = 'live_7dCmV4ExllLfTC4XWfsPUALgd99N5we4qBh4ydqAgHQnVLcDXUUWrMnCyvmPgEZp';

  return fetch(url, {
    headers: {
      'x-api-key': apiKey
    }
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch cat');
      }
      return response.json();
    })
    .then(data => {
      if (data.length === 0) {
        throw new Error('No cat data available');
      }
      return data;
    })
    .catch(error => {
      console.error('Error fetching cat:', error);
      throw error;
    });
}
