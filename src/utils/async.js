import async from 'async';

import { isBoolean, isFunction, isIterable, isObject } from './is';

/**
 * @param {Function} func
 * @param {Array|Iterable} data
 * @param {Function} callback
 * @param {number} limit
 * @returns {boolean}
 */
function isValid(func, data, callback, limit) {
  return (
    (isIterable(data) || isObject(data)) &&
    (!func.toString().match(/Limit/) || limit >= 1) &&
    isFunction(callback)
  );
}

/**
 * @param {Function} func
 * @param {any} defaultResult
 * @param {Array|Iterable} data
 * @param {(item) => any} callback
 * @param {number} [limit=0]
 * @returns {any}
 */
function prototypeItemCb(func, defaultResult, data, callback, limit = 0) {
  let result = defaultResult;

  if (!isValid(func, data, callback, limit)) {
    return result;
  }

  const args = limit ? [data, limit] : [data];

  func(
    ...args,
    (item, next) => {
      try {
        return next(null, callback(item));
      } catch (err) {
        return next(err);
      }
    },
    (err, res) => {
      if (err) {
        throw err;
      }

      result = res;
    }
  );

  return result;
}

/**
 * @param {Function} func
 * @param {any} defaultResult
 * @param {Array|Iterable} data
 * @param {(value, key: string|number) => any} callback
 * @param {number} [limit=0]
 * @param {boolean} [isReduce=false]
 * @returns {any}
 */
function prototypeValueKeyCb(
  func,
  defaultResult,
  data,
  callback,
  limit = 0,
  isReduce = false
) {
  let result = defaultResult;

  if (!isValid(func, data, callback, limit)) {
    return result;
  }

  const args = limit || isReduce ? [data, limit] : [data];

  func(
    ...args,
    (value, key, next) => {
      try {
        return next(null, callback(value, key));
      } catch (err) {
        return next(err);
      }
    },
    (err, res) => {
      if (err) {
        throw err;
      }

      result = res;
    }
  );

  return result;
}

/**
 * @param {Function} func
 * @param {Array|Iterable} data
 * @param {(item, key: string|number) => any} callback
 * @param {boolean} [throwErr=true]
 * @param {number} [limit=0]
 * @returns {void}
 */
function prototypeVoidCb(func, data, callback, throwErr = true, limit = 0) {
  if (!isValid(func, data, callback, limit)) {
    return;
  }

  const args = limit ? [data, limit] : [data];

  func(
    ...args,
    (item, key, next) => {
      try {
        callback(item, key);

        return next();
      } catch (err) {
        if (throwErr) {
          return next(err);
        }

        return next();
      }
    },
    err => {
      if (err) {
        throw err;
      }
    }
  );
}

/**
 * @param {Array|Iterable} data
 * @param {(item) => any} [callback]
 * @returns {Array}
 */
function concat(data, callback = v => v) {
  return prototypeItemCb(async.concat, [], data, callback);
}

/**
 * @param {Array|Iterable} data
 * @param {number} limit
 * @param {(item) => any} [callback]
 * @returns {Array}
 */
function concatLimit(data, limit, callback = v => v) {
  return prototypeItemCb(async.concatLimit, [], data, callback, limit);
}

/**
 * @param {Array|Iterable} data
 * @param {(item) => any} [callback]
 * @returns {Array}
 */
function concatSeries(data, callback = v => v) {
  return prototypeItemCb(async.concatSeries, [], data, callback);
}

/**
 * @param {Array|Iterable} data
 * @param {(item, key: string|number) => void} callback
 * @param {boolean} [throwErr=true]
 * @returns {void}
 */
function each(data, callback, throwErr = true) {
  return prototypeVoidCb(async.eachOf, data, callback, throwErr);
}

/**
 * @param {Array|Iterable} data
 * @param {number} limit
 * @param {(item, key: string|number) => void} callback
 * @param {boolean} [throwErr=true]
 * @returns {void}
 */
function eachLimit(data, limit, callback, throwErr = true) {
  return prototypeVoidCb(async.eachOfLimit, data, callback, throwErr, limit);
}

/**
 * @param {Array|Iterable} data
 * @param {(item, key: string|number) => void} callback
 * @param {boolean} [throwErr=true]
 * @returns {void}
 */
function eachSeries(data, callback, throwErr = true) {
  return prototypeVoidCb(async.eachOfSeries, data, callback, throwErr);
}

/**
 * @param {Array|Iterable} data
 * @param {(item) => boolean} callback
 * @returns {boolean}
 */
function every(data, callback) {
  return prototypeItemCb(async.every, false, data, callback);
}

/**
 * @param {Array|Iterable} data
 * @param {number} limit
 * @param {(item) => boolean} callback
 * @returns {boolean}
 */
function everyLimit(data, limit, callback) {
  return prototypeItemCb(async.everyLimit, false, data, callback, limit);
}

/**
 * @param {Array|Iterable} data
 * @param {(item) => boolean} callback
 * @returns {boolean}
 */
function everySeries(data, callback) {
  return prototypeItemCb(async.everySeries, false, data, callback);
}

/**
 * @param {Array|Iterable} data
 * @param {(item) => boolean} callback
 * @returns {Array}
 */
function filter(data, callback) {
  return prototypeItemCb(async.filter, [], data, callback);
}

/**
 * @param {Array|Iterable} data
 * @param {number} limit
 * @param {(item) => boolean} callback
 * @returns {Array}
 */
function filterLimit(data, limit, callback) {
  return prototypeItemCb(async.filterLimit, [], data, callback, limit);
}

/**
 * @param {Array|Iterable} data
 * @param {(item) => boolean} callback
 * @returns {Array}
 */
function filterSeries(data, callback) {
  return prototypeItemCb(async.filterSeries, [], data, callback);
}

/**
 * @param {Array|Iterable} data
 * @param {(item) => boolean} callback
 * @returns {any}
 */
function find(data, callback) {
  return prototypeItemCb(async.detect, undefined, data, callback);
}

/**
 * @param {Array|Iterable} data
 * @param {number} limit
 * @param {(item) => boolean} callback
 * @returns {any}
 */
function findLimit(data, limit, callback) {
  return prototypeItemCb(async.detectLimit, undefined, data, callback, limit);
}

/**
 * @param {Array|Iterable} data
 * @param {(item) => boolean} callback
 * @returns {any}
 */
function findSeries(data, callback) {
  return prototypeItemCb(async.detectSeries, undefined, data, callback);
}

/**
 * @param {Array|Iterable} data
 * @param {(item) => any} callback
 * @returns {Object}
 */
function groupBy(data, callback) {
  return prototypeItemCb(async.groupBy, {}, data, callback);
}

/**
 * @param {Array|Iterable} data
 * @param {number} limit
 * @param {(item) => any} callback
 * @returns {Object}
 */
function groupByLimit(data, limit, callback) {
  return prototypeItemCb(async.groupByLimit, {}, data, callback, limit);
}

/**
 * @param {Array|Iterable} data
 * @param {(item) => any} callback
 * @returns {Object}
 */
function groupBySeries(data, callback) {
  return prototypeItemCb(async.groupBySeries, {}, data, callback);
}

/**
 * @param {Array|Iterable} data
 * @param {(item) => any} callback
 * @returns {Array}
 */
function map(data, callback) {
  return prototypeItemCb(async.map, [], data, callback);
}

/**
 * @param {Array|Iterable} data
 * @param {number} limit
 * @param {(item) => any} callback
 * @returns {Array}
 */
function mapLimit(data, limit, callback) {
  return prototypeItemCb(async.mapLimit, [], data, callback, limit);
}

/**
 * @param {Array|Iterable} data
 * @param {(item) => any} callback
 * @returns {Array}
 */
function mapSeries(data, callback) {
  return prototypeItemCb(async.mapSeries, [], data, callback);
}

/**
 * @param {Array|Iterable} data
 * @param {(value, key: string) => any} callback
 * @returns {Object}
 */
function mapValues(data, callback) {
  return prototypeValueKeyCb(async.mapValues, {}, data, callback);
}

/**
 * @param {Array|Iterable} data
 * @param {number} limit
 * @param {(value, key: string) => any} callback
 * @returns {Object}
 */
function mapValuesLimit(data, limit, callback) {
  return prototypeValueKeyCb(async.mapValuesLimit, {}, data, callback, limit);
}

/**
 * @param {Array|Iterable} data
 * @param {(value, key: string) => any} callback
 * @returns {Object}
 */
function mapValuesSeries(data, callback) {
  return prototypeValueKeyCb(async.mapValuesSeries, {}, data, callback);
}

/**
 * @param {Array|Iterable} data
 * @param {any} memo
 * @param {(memo, item) => any} callback
 * @returns {any}
 */
function reduce(data, memo, callback) {
  return prototypeValueKeyCb(
    async.reduce,
    undefined,
    data,
    callback,
    memo,
    true
  );
}

/**
 * @param {Array|Iterable} data
 * @param {any} memo
 * @param {(memo, item) => any} callback
 * @returns {any}
 */
function reduceRight(data, memo, callback) {
  return prototypeValueKeyCb(
    async.reduceRight,
    undefined,
    data,
    callback,
    memo,
    true
  );
}

/**
 * @param {Array|Iterable} data
 * @param {(item) => boolean} callback
 * @returns {Array}
 */
function reject(data, callback) {
  return prototypeItemCb(async.reject, [], data, callback);
}

/**
 * @param {Array|Iterable} data
 * @param {number} limit
 * @param {(item) => boolean} callback
 * @returns {Array}
 */
function rejectLimit(data, limit, callback) {
  return prototypeItemCb(async.rejectLimit, [], data, callback, limit);
}

/**
 * @param {Array|Iterable} data
 * @param {(item) => boolean} callback
 * @returns {Array}
 */
function rejectSeries(data, callback) {
  return prototypeItemCb(async.rejectSeries, [], data, callback);
}

/**
 * @param {Array|Iterable} data
 * @param {(item) => boolean} callback
 * @returns {boolean}
 */
function some(data, callback) {
  return prototypeItemCb(async.some, false, data, callback);
}

/**
 * @param {Array|Iterable} data
 * @param {number} limit
 * @param {(item) => boolean} callback
 * @returns {boolean}
 */
function someLimit(data, limit, callback) {
  return prototypeItemCb(async.someLimit, false, data, callback, limit);
}

/**
 * @param {Array|Iterable} data
 * @param {(item) => boolean} callback
 * @returns {boolean}
 */
function someSeries(data, callback) {
  return prototypeItemCb(async.someSeries, false, data, callback);
}

/**
 * @param {Array|Iterable} data
 * @param {(item) => any} [callback]
 * @returns {Array}
 */
function sortBy(data, callback = v => v) {
  return prototypeItemCb(async.sortBy, [], data, callback);
}

/**
 * @param {Array|Iterable} data
 * @param {(acc: Array|Iterable, item, key: string|number) => void} callback
 * @returns {Array|Iterable}
 */
function transform(data, callback) {
  let result = data;

  if (!isValid(async.transform, data, callback, 0)) {
    return result;
  }

  async.transform(
    data,
    (acc, item, key, next) => {
      try {
        callback(acc, item, key);

        return next();
      } catch (err) {
        return next(err);
      }
    },
    (err, res) => {
      if (err) {
        throw err;
      }

      result = res;
    }
  );

  return result;
}

/**
 * @param {Array|Iterable} data
 * @param {(item) => boolean} callback
 * @returns {number}
 */
function findIndex(data, callback) {
  let result = -1;

  each(data, (item, index) => {
    const boolCb = callback(item);

    if (isBoolean(boolCb) && boolCb && result === -1) {
      result = index;
    }
  });

  return result;
}

/**
 * @param {Array|Iterable} data
 * @param {number} limit
 * @param {(item) => boolean} callback
 * @returns {number}
 */
function findIndexLimit(data, limit, callback) {
  let result = -1;

  eachLimit(data, limit, (item, index) => {
    const boolCb = callback(item);

    if (isBoolean(boolCb) && boolCb && result === -1) {
      result = index;
    }
  });

  return result;
}

/**
 * @param {Array|Iterable} data
 * @param {(item) => boolean} callback
 * @returns {number}
 */
function findIndexSeries(data, callback) {
  let result = -1;

  eachSeries(data, (item, index) => {
    const boolCb = callback(item);

    if (isBoolean(boolCb) && boolCb && result === -1) {
      result = index;
    }
  });

  return result;
}

export {
  concat,
  concatLimit,
  concatSeries,
  each,
  eachLimit,
  eachSeries,
  every,
  everyLimit,
  everySeries,
  filter,
  filterLimit,
  filterSeries,
  find,
  findLimit,
  findSeries,
  groupBy,
  groupByLimit,
  groupBySeries,
  map,
  mapLimit,
  mapSeries,
  mapValues,
  mapValuesLimit,
  mapValuesSeries,
  reduce,
  reduceRight,
  reject,
  rejectLimit,
  rejectSeries,
  some,
  someLimit,
  someSeries,
  sortBy,
  transform,
  findIndex,
  findIndexLimit,
  findIndexSeries
};
