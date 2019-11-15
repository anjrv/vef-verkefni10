import { randomDate } from './helpers';
/**
 * Sækir Myndir frá nasa API. Til þess að sjá dæmi um json svari sjá apod.json
 */

// API lykill til að fá aðgang að nasa gögnum.
const API_KEY = 'XZ6RsleT66jvg29MIiDyJ3hwAeFui9XG5uiIVFW5';
// Slóð að sækja myndir frá. Dæmi um heila slóð https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&date=2019-11-10
const URL = 'https://api.nasa.gov/planetary/apod';


/**
 * Sækir mynd af handahófi frá APOD API hjá nasa
 *
 * @returns {Promise} sem mun innihalda upplýsingar um mynd/myndband hjá nasa.
 */
export default async function getRandomImage() {
  const date = randomDate();
  try { // 2018-03-18 url date for a video value || ${date} for normal use
    const response = await fetch(`${URL}?api_key=${API_KEY}&date=${date}`);
    return response;
  } catch (err) {
    console.error(err);
  }
}
