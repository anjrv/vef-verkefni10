import getRandomImage from './nasa-api';
import { el, empty } from './helpers';
import { load, save, clear } from './storage';

// todo vísa í rétta hluti með import

// breytur til þess að halda utan um html element nodes
let title; // titill fyrir mynd á forsíðu
let text; // texti fyrir mynd á forsíðu
let img; // mynd á forsíðu
let image; // object sem inniheldur núverandi mynd á forsíðu.

/*
 * Sækir nýja Mynd af handahófi frá Nasa API og birtir hana á forsíðunni
 * ásamt titli og texta.
 */
function getNewImage() {
  const fetchPromise = getRandomImage();
  fetchPromise.then((response) => {
    if (!response.ok) {
      throw new Error('Síðan er ekki aðgengileg þessa stundina');
    }
    return response.json();
  })
    .then((data) => {
      console.log(data);

      img = data.hdurl;
      document.querySelector('.apod__image').src = img;

      title = data.title;
      document.querySelector('.apod__title').innerHTML = title;

      text = data.explanation;
      document.querySelector('.apod__text').innerHTML = text;

      image = [title, text, img];
    })
    .catch((error) => {
      console.log(error);
    });
}

/*
 * Vistar núverandi mynd í storage.
 */
function saveCurrentImage() {
  console.log('Saving!');
}

/*
 * Upphafsstillir forsíðuna. Setur event listeners á takkana, og sækir eina mynd.
 *
 */
export default function init(apod) {
  const newImage = apod.querySelector('#new-image-button');
  const saveImage = apod.querySelector('#save-image-button');

  newImage.addEventListener('click', getNewImage);
  saveImage.addEventListener('click', saveCurrentImage);

  getNewImage();
}

/*
 * Fall fyrir favourites.html. Sér um að sækja allar vistuðu myndirnar og birta þær ásamt
 * titlum þeirra.
 */
export function loadFavourites() {

}
