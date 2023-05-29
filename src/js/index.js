import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

const loader = document.querySelector('.loader');
const breedSelect = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const error = document.querySelector('.error');

function hideLoader() {
  loader.style.display = 'none';
}

function showLoader() {
  loader.style.display = 'block';
}

function hideError() {
  error.style.display = 'none';
}

function showError() {
  error.style.display = 'block';
}

function updateCatInfo(breedId) {
  showLoader();
  hideError();
  catInfo.innerHTML = '';

  fetchCatByBreed(breedId)
    .then(data => {
      const cat = data[0];
      const catImage = document.createElement('img');
      catImage.src = cat.url;
      catInfo.appendChild(catImage);

      const breedName = document.createElement('h2');
      breedName.textContent = cat.breeds[0].name;
      catInfo.appendChild(breedName);

      const description = document.createElement('p');
      description.textContent = cat.breeds[0].description;
      catInfo.appendChild(description);

      const temperament = document.createElement('p');
      temperament.textContent = `Temperament: ${cat.breeds[0].temperament}`;
      catInfo.appendChild(temperament);

      catInfo.style.display = 'block';
    })
    .catch(() => {
      showError();
    })
    .finally(() => {
      hideLoader();
    });
}

function populateBreedSelect(breeds) {
  breeds.forEach(breed => {
    const option = document.createElement('option');
    option.value = breed.id;
    option.textContent = breed.name;
    breedSelect.appendChild(option);
  });
}

breedSelect.addEventListener('change', event => {
  const breedId = event.target.value;
  updateCatInfo(breedId);
});

showLoader();
hideError();

fetchBreeds()
  .then(breeds => {
    populateBreedSelect(breeds);
    hideLoader();
  })
  .catch(() => {
    showError();
    hideLoader();
  });
