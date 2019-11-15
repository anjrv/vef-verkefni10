import getRandomImage from './nasa-api';
import { el, empty } from './helpers';
import { load, save, clear } from './storage';

// todo vísa í rétta hluti með import

// breytur til þess að halda utan um html element nodes
let title; // titill fyrir mynd á forsíðu
let text; // texti fyrir mynd á forsíðu
let img; // mynd á forsíðu
let image; // object sem inniheldur núverandi mynd á forsíðu.
const itemsArray = [];

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
      if (document.contains(document.getElementById('vidElement'))) {
        document.getElementById('vidElement').remove();
      }

      const type = data.media_type;
      img = data.url;
      if (type === 'video') {
        const apod = document.querySelector('.apod');
        const video = document.createElement('iframe');
        video.id = 'vidElement';
        video.width = 560;
        video.height = 315;
        video.src = img;
        apod.insertBefore(video, apod.firstChild);
      } else {
        document.querySelector('.apod__image').src = img;
      }
      title = data.title;
      document.querySelector('.apod__title').innerHTML = title;

      text = data.explanation;
      document.querySelector('.apod__text').innerHTML = text;

      image = { type: type, mediaUrl: img, text: text, title: title };
    });
}//type, mediaUrl, text, title

/*
 * Vistar núverandi mynd í storage.
 */
function saveCurrentImage() {
  itemsArray.push(image);
  localStorage.setItem('favourite_spacephotos', JSON.stringify(itemsArray));
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
  const images = load();
  const loc = document.getElementsByTagName('main');

  images.forEach((image) => {
    console.log(image);
    const component = el('section',
      el('h2'),
      el('img'),
    );
    component.className = 'apod';
    component.firstChild.className = 'apod__title';
    const title = component.querySelector('.apod__title');
    title.innerHTML = image.title;
    component.lastChild.className = 'apod__image';
    const media = component.querySelector('.apod__image');
    media.src = image.mediaUrl;
    loc[0].appendChild(component);
  });
}
