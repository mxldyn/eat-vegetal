/**
 * @param {any} object
 * @returns {object is Array}
 */
function isArray(object) {
  return Array.isArray(object);
}

/**
 * @param {any} object
 * @returns {object is RegExp}
 */
function isRegExp(object) {
  return object instanceof RegExp;
}

/**
 * @param {any} object
 * @returns {object is Date}
 */
function isDate(object) {
  return object instanceof Date;
}

/**
 * @param {any} object
 * @returns {object is Error}
 */
function isError(object) {
  return object instanceof Error;
}

/**
 * @param {any} object
 * @returns {object is boolean}
 */
function isBoolean(object) {
  return typeof object === 'boolean';
}

/**
 * @param {any} object
 * @returns {object is Buffer}
 */
function isBuffer(object) {
  return Buffer.isBuffer(object);
}

/**
 * @param {any} object
 * @returns {boolean}
 */
function isFunction(object) {
  return typeof object === 'function';
}

/**
 * @param {any} object
 * @returns {object is null}
 */
function isNull(object) {
  return object === null;
}

/**
 * @param {any} object
 * @returns {object is null|undefined}
 */
function isNullOrUndefined(object) {
  return object === null || typeof object === 'undefined';
}

/**
 * @param {any} object
 * @returns {object is number}
 */
function isNumber(object) {
  return typeof object === 'number';
}

/**
 * @param {any} object
 * @returns {boolean}
 */
function isObject(object) {
  return (
    object !== null &&
    typeof object === 'object' &&
    object.constructor === Object
  );
}

/**
 * @param {any} object
 * @returns {boolean}
 */
function isPrimitive(object) {
  return (
    (typeof object !== 'object' && typeof object !== 'function') ||
    object === null
  );
}

/**
 * @param {any} object
 * @returns {object is string}
 */
function isString(object) {
  return typeof object === 'string';
}

/**
 * @param {any} object
 * @returns {object is symbol}
 */
function isSymbol(object) {
  return typeof object === 'symbol';
}

/**
 * @param {any} object
 * @returns {object is undefined}
 */
function isUndefined(object) {
  return typeof object === 'undefined';
}

/**
 * @param {any} object
 * @returns {boolean}
 */
function isAsyncFunction(object) {
  const { constructor } = async () => {};

  return object instanceof constructor;
}

/**
 * @param {any} object
 * @returns {boolean}
 */
function isPromise(object) {
  return object instanceof Promise;
}

/**
 * @param {any} object
 * @returns {boolean}
 */
function isJsonString(object) {
  try {
    JSON.parse(object);

    return true;
  } catch (err) {
    return false;
  }
}

/**
 * @param {any} object
 * @returns {boolean}
 */
function isIterable(object) {
  try {
    return typeof object[Symbol.iterator] === 'function';
  } catch (err) {
    return false;
  }
}

/**
 * @param {any} object
 * @returns {boolean}
 */
function isEmpty(object) {
  if (Array.isArray(object)) {
    return !object.length;
  }

  if (typeof object === 'string') {
    return !object;
  }

  if (
    object !== null &&
    typeof object === 'object' &&
    object.constructor === Object
  ) {
    return !Object.keys(object).length;
  }

  return true;
}

export {
  isArray,
  isRegExp,
  isDate,
  isError,
  isBoolean,
  isBuffer,
  isFunction,
  isNull,
  isNullOrUndefined,
  isNumber,
  isObject,
  isPrimitive,
  isString,
  isSymbol,
  isUndefined,
  isAsyncFunction,
  isPromise,
  isJsonString,
  isIterable,
  isEmpty
};
