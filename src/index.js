import init, { loadFavourites } from './lib/display-media';
import { clear } from './lib/storage';

document.addEventListener('DOMContentLoaded', () => {
  const page = document.querySelector('body');
  const isFavourites = page.classList.contains('favourites-page');

  if (isFavourites) {
    loadFavourites();
    const clearItems = document.querySelector('#clear-button');
    clearItems.addEventListener('click', clear);
  } else {
    const apod = document.querySelector('.apod');
    init(apod);
  }
});
