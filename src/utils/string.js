import { isString } from './is';

/**
 * @param {any} value
 * @returns {string}
 */
function getString(value, trim = false) {
  if (!isString(value)) {
    return '';
  }

  return trim ? value.trim() : value;
}

/**
 * @param {string} value
 * @returns {string}
 */
function removeDiacritics(value) {
  const str = getString(value);

  if (!str.trim()) {
    return str;
  }

  return str.replace(/(\S)/g, v =>
    v.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  );
}

/**
 * @param {string} value
 * @returns {string}
 */
function removeSpecialChars(value) {
  return getString(value).replace(/['’|\\{}()[\]^$+*?.-]/g, '');
}

/**
 * @param {string} value
 * @returns {string}
 */
function removeWhiteSpace(value) {
  return getString(value).replace(/\s/g, '');
}

/**
 * @param {string} value
 * @param {boolean} [trim=false]
 * @returns {string}
 */
function removeExtraWhiteSpace(value, trim = false) {
  const str = getString(value)
    .replace(/(?:(?![\r\n])\s)+/g, ' ')
    .replace(/\r/g, '\n')
    .replace(/\n{3,}/g, '\n\n');

  return trim ? str.trim() : str;
}

/**
 * @param {string} value
 * @returns {string}
 */
function fullNormalize(value) {
  return removeDiacritics(removeExtraWhiteSpace(value, true));
}

export {
  getString,
  removeDiacritics,
  removeSpecialChars,
  removeWhiteSpace,
  removeExtraWhiteSpace,
  fullNormalize
};
