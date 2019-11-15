import { empty } from './helpers';

// Fast sem skilgreinir heiti á lykli sem vistað er undir í localStorage
const LOCALSTORAGE_KEY = 'favourite_spacephotos';

/**
 * Sækir gögn úr localStorage. Skilað sem lista á forminu:
 * [{ type, mediaUrl, text, title },
 *  { type, mediaUrl, text, title },
 *  ...,
 *  { type, mediaUrl, text, title }]
 *
 * @returns {array} fylki af myndum eða tóma fylkið ef ekkert vistað.
 */
export function load() {
  const data = JSON.parse(localStorage.getItem('favourite_spacephotos'));
  return data;
}

/**
 * Hreinsar allar myndir úr favourites siðunni og tæmir localStorage
 */
export function clear() {
  localStorage.removeItem(LOCALSTORAGE_KEY);
  const loc = document.getElementsByTagName('main');
  empty(loc[0]);
}
