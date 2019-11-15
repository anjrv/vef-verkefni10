import getRandomImage from './nasa-api';
import { el } from './helpers';
import { load } from './storage';

// todo vísa í rétta hluti með import

// breytur til þess að halda utan um html element nodes
let title; // titill fyrir mynd á forsíðu
let text; // texti fyrir mynd á forsíðu
let img; // mynd á forsíðu
let image; // object sem inniheldur núverandi mynd á forsíðu.
const itemsArray = JSON.parse(localStorage.getItem('favourite_spacephotos')) || []; // inniheldur þær upplýsingar sem eru í localstorage

/**
 * Býr til responsive video embed
 * @param {} src video source
 */
function displayVideo(src) {
  const apods = document.getElementsByClassName('apod');
  const apod = apods[apods.length - 1];
  const vidContainer = document.createElement('div');

  vidContainer.id = 'vid-container';
  vidContainer.style.height = '56.25vh';
  vidContainer.style.width = '100%';
  vidContainer.style.position = 'relative';

  const video = document.createElement('iframe');
  video.id = 'vid';
  video.style.width = '100%';
  video.style.height = '100%';
  video.style.position = 'absolute';
  video.style.top = '0';
  video.style.left = '0';
  video.src = src;

  apod.prepend(vidContainer);
  vidContainer.appendChild(video);
}

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
      if (document.contains(document.getElementById('vid-container'))) {
        document.getElementById('vid-container').remove();
      }
      const type = data.media_type;
      img = data.url;
      if (type === 'video') {
        document.querySelector('.apod__image').style.display = 'none';
        displayVideo(img);
      } else {
        document.querySelector('.apod__image').src = img;
        document.querySelector('.apod__image').style.display = 'block';
      }

      title = data.title;
      document.querySelector('.apod__title').innerHTML = title;

      text = data.explanation;
      document.querySelector('.apod__text').innerHTML = text;

      image = {
        type, mediaUrl: img, text, title,
      };
    });
}

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

  if (!(images === null || images.length === 0)) {
    images.forEach((element) => {
      if (element.type === 'video') {
        const component = el('section');
        component.className = 'apod';
        loc[0].appendChild(component);

        const cardTitle = document.createElement('h2');
        cardTitle.className = 'apod__title';
        cardTitle.innerHTML = element.title;

        displayVideo(element.mediaUrl);
        component.insertBefore(cardTitle, component.firstChild);
      } else {
        const component = el('section',
          el('h2'),
          el('img'));
        component.className = 'apod';
        component.firstChild.className = 'apod__title';

        const cardTitle = component.querySelector('.apod__title');
        cardTitle.innerHTML = element.title;
        component.lastChild.className = 'apod__image';

        const media = component.querySelector('.apod__image');
        media.src = element.mediaUrl;

        loc[0].appendChild(component);
      }
    });
  }
}
