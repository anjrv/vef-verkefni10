
/**
 * Hreinsa börn úr elementi
 *
 * @param {object} element Element sem á að hreinsa börn úr
 */
export function empty(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

/**
 * Búa til element og aukalega setja börn ef send með
 *
 * @param {string} name Nafn á element
 * @param  {...any} children Börn fyrir element
 */
export function el(name, ...children) {
  const element = document.createElement(name);

  if (Array.isArray(children)) {
    children.forEach((child) => {
      if (typeof child === 'string') {
        element.appendChild(document.createTextNode(child));
      } else if (child) {
        element.appendChild(child);
      }
    });
  }

  return element;
}

/**
* Skilar tölu af handahófi á bilinu [min, max]
*/
export function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Skilar dagsetningu milli 16-6-1995 og núverandi af handahófi
 */
export function randomDate() {
  let month;
  let day;

  const year = randomNumber(1995, new Date().getFullYear());
  if (year === new Date().getFullYear()) {
    month = randomNumber(1, (new Date().getMonth() + 1));
  } else if (year === 1995) {
    month = randomNumber(6, 12);
  } else {
    month = randomNumber(1, 12);
  }
  if (year === new Date().getFullYear() && month === new Date().getMonth() + 1) {
    day = randomNumber(1, new Date().getDate());
  } else if (year === 1995 && month === 6) {
    day = randomNumber(16, 30);
  } else if (month === 2) {
    if (((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0)) {
      day = randomNumber(1, 29);
    } else {
      day = randomNumber(1, 28);
    }
  } else if (month === 4 || month === 6 || month === 9 || month === 11) {
    day = randomNumber(1, 30);
  } else {
    day = randomNumber(1, 31);
  }
  return `${String(year)}-${String(month)}-${String(day)}`;
}
