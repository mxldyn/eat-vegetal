import async from 'async';

import {
  isAsyncFunction,
  isBoolean,
  isFunction,
  isIterable,
  isObject
} from './is';

/**
 * @param {Function} func
 * @param {Array|Iterable} data
 * @param {() => Promise<any>} callback
 * @param {number} limit
 * @returns {boolean}
 */
function isValid(func, data, callback, limit) {
  return (
    (isIterable(data) || isObject(data)) &&
    (isAsyncFunction(callback) || isFunction(callback)) &&
    (!func.toString().match(/Limit/) || limit >= 1)
  );
}

/**
 * @param {Function} func
 * @param {any} defaultResult
 * @param {Array|Iterable} data
 * @param {(item) => Promise<any>} callback
 * @param {number} [limit=0]
 * @returns {Promise<any>}
 */
function prototypeItemCb(func, defaultResult, data, callback, limit = 0) {
  return new Promise((resolve, reject) => {
    if (!isValid(func, data, callback, limit)) {
      return resolve(defaultResult);
    }

    const args = limit ? [data, limit] : [data];

    return func(
      ...args,
      async (item, next) => {
        try {
          const result = await callback(item);

          return next(null, result);
        } catch (err) {
          return next(err);
        }
      },
      (err, res) => {
        if (err) {
          return reject(err);
        }

        return resolve(res);
      }
    );
  });
}

/**
 * @param {Function} func
 * @param {any} defaultResult
 * @param {Array|Iterable} data
 * @param {(value, key: string|number) => Promise<any>} callback
 * @param {number} [limit=0]
 * @param {boolean} [isReduce=false]
 * @returns {Promise<any>}
 */
function prototypeValueKeyCb(
  func,
  defaultResult,
  data,
  callback,
  limit = 0,
  isReduce = false
) {
  return new Promise((resolve, reject) => {
    if (!isValid(func, data, callback, limit)) {
      return resolve(defaultResult);
    }

    const args = limit || isReduce ? [data, limit] : [data];

    return func(
      ...args,
      async (value, key, next) => {
        try {
          const result = await callback(value, key);

          return next(null, result);
        } catch (err) {
          return next(err);
        }
      },
      (err, res) => {
        if (err) {
          return reject(err);
        }

        return resolve(res);
      }
    );
  });
}

/**
 * @param {Function} func
 * @param {Array|Iterable} data
 * @param {(item, key: string|number) => Promise<void>} callback
 * @param {boolean} [throwErr=true]
 * @param {number} [limit=0]
 * @returns {Promise<void>}
 */
function prototypeVoidCb(func, data, callback, throwErr = true, limit = 0) {
  return new Promise((resolve, reject) => {
    if (!isValid(func, data, callback, limit)) {
      return resolve();
    }

    const args = limit ? [data, limit] : [data];

    return func(
      ...args,
      async (item, key, next) => {
        try {
          await callback(item, key);

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
          return reject(err);
        }

        return resolve();
      }
    );
  });
}

/**
 * @param {Array|Iterable} data
 * @param {(item) => Promise<any>} [callback]
 * @returns {Promise<Array>}
 */
function concatAsync(data, callback = async v => v) {
  return prototypeItemCb(async.concat, [], data, callback);
}

/**
 * @param {Array|Iterable} data
 * @param {number} limit
 * @param {(item) => Promise<any>} [callback]
 * @returns {Promise<Array>}
 */
function concatLimitAsync(data, limit, callback = async v => v) {
  return prototypeItemCb(async.concatLimit, [], data, callback, limit);
}

/**
 * @param {Array|Iterable} data
 * @param {(item) => Promise<any>} [callback]
 * @returns {Promise<Array>}
 */
function concatSeriesAsync(data, callback = async v => v) {
  return prototypeItemCb(async.concatSeries, [], data, callback);
}

/**
 * @param {Array|Iterable} data
 * @param {(item, key: string|number) => Promise<void>} callback
 * @param {boolean} [throwErr=true]
 * @returns {Promise<void>}
 */
function eachAsync(data, callback, throwErr = true) {
  return prototypeVoidCb(async.eachOf, data, callback, throwErr);
}

/**
 * @param {Array|Iterable} data
 * @param {number} limit
 * @param {(item, key: string|number) => Promise<void>} callback
 * @param {boolean} [throwErr=true]
 * @returns {Promise<void>}
 */
function eachLimitAsync(data, limit, callback, throwErr = true) {
  return prototypeVoidCb(async.eachOfLimit, data, callback, throwErr, limit);
}

/**
 * @param {Array|Iterable} data
 * @param {(item, key: string|number) => Promise<void>} callback
 * @param {boolean} [throwErr=true]
 * @returns {Promise<void>}
 */
function eachSeriesAsync(data, callback, throwErr = true) {
  return prototypeVoidCb(async.eachOfSeries, data, callback, throwErr);
}

/**
 * @param {Array|Iterable} data
 * @param {(item) => Promise<boolean>} callback
 * @returns {Promise<boolean>}
 */
function everyAsync(data, callback) {
  return prototypeItemCb(async.every, false, data, callback);
}

/**
 * @param {Array|Iterable} data
 * @param {number} limit
 * @param {(item) => Promise<boolean>} callback
 * @returns {Promise<boolean>}
 */
function everyLimitAsync(data, limit, callback) {
  return prototypeItemCb(async.everyLimit, false, data, callback, limit);
}

/**
 * @param {Array|Iterable} data
 * @param {(item) => Promise<boolean>} callback
 * @returns {Promise<boolean>}
 */
function everySeriesAsync(data, callback) {
  return prototypeItemCb(async.everySeries, false, data, callback);
}

/**
 * @param {Array|Iterable} data
 * @param {(item) => Promise<boolean>} callback
 * @returns {Promise<Array>}
 */
function filterAsync(data, callback) {
  return prototypeItemCb(async.filter, [], data, callback);
}

/**
 * @param {Array|Iterable} data
 * @param {number} limit
 * @param {(item) => Promise<boolean>} callback
 * @returns {Promise<Array>}
 */
function filterLimitAsync(data, limit, callback) {
  return prototypeItemCb(async.filterLimit, [], data, callback, limit);
}

/**
 * @param {Array|Iterable} data
 * @param {(item) => Promise<boolean>} callback
 * @returns {Promise<Array>}
 */
function filterSeriesAsync(data, callback) {
  return prototypeItemCb(async.filterSeries, [], data, callback);
}

/**
 * @param {Array|Iterable} data
 * @param {(item) => Promise<boolean>} callback
 * @returns {Promise<any>}
 */
function findAsync(data, callback) {
  return prototypeItemCb(async.detect, undefined, data, callback);
}

/**
 * @param {Array|Iterable} data
 * @param {number} limit
 * @param {(item) => Promise<boolean>} callback
 * @returns {Promise<any>}
 */
function findLimitAsync(data, limit, callback) {
  return prototypeItemCb(async.detectLimit, undefined, data, callback, limit);
}

/**
 * @param {Array|Iterable} data
 * @param {(item) => Promise<boolean>} callback
 * @returns {Promise<any>}
 */
function findSeriesAsync(data, callback) {
  return prototypeItemCb(async.detectSeries, undefined, data, callback);
}

/**
 * @param {Array|Iterable} data
 * @param {(item) => Promise<any>} callback
 * @returns {Promise<Object>}
 */
function groupByAsync(data, callback) {
  return prototypeItemCb(async.groupBy, {}, data, callback);
}

/**
 * @param {Array|Iterable} data
 * @param {number} limit
 * @param {(item) => Promise<any>} callback
 * @returns {Promise<Object>}
 */
function groupByLimitAsync(data, limit, callback) {
  return prototypeItemCb(async.groupByLimit, {}, data, callback, limit);
}

/**
 * @param {Array|Iterable} data
 * @param {(item) => Promise<any>} callback
 * @returns {Promise<Object>}
 */
function groupBySeriesAsync(data, callback) {
  return prototypeItemCb(async.groupBySeries, {}, data, callback);
}

/**
 * @param {Array|Iterable} data
 * @param {(item) => Promise<any>} callback
 * @returns {Promise<Array>}
 */
function mapAsync(data, callback) {
  return prototypeItemCb(async.map, [], data, callback);
}

/**
 * @param {Array|Iterable} data
 * @param {number} limit
 * @param {(item) => Promise<any>} callback
 * @returns {Promise<Array>}
 */
function mapLimitAsync(data, limit, callback) {
  return prototypeItemCb(async.mapLimit, [], data, callback, limit);
}

/**
 * @param {Array|Iterable} data
 * @param {(item) => Promise<any>} callback
 * @returns {Promise<Array>}
 */
function mapSeriesAsync(data, callback) {
  return prototypeItemCb(async.mapSeries, [], data, callback);
}

/**
 * @param {Array|Iterable} data
 * @param {(value, key: string) => Promise<any>} callback
 * @returns {Promise<Object>}
 */
function mapValuesAsync(data, callback) {
  return prototypeValueKeyCb(async.mapValues, {}, data, callback);
}

/**
 * @param {Array|Iterable} data
 * @param {number} limit
 * @param {(value, key: string) => Promise<any>} callback
 * @returns {Promise<Object>}
 */
function mapValuesLimitAsync(data, limit, callback) {
  return prototypeValueKeyCb(async.mapValuesLimit, {}, data, callback, limit);
}

/**
 * @param {Array|Iterable} data
 * @param {(value, key: string) => Promise<any>} callback
 * @returns {Promise<Object>}
 */
function mapValuesSeriesAsync(data, callback) {
  return prototypeValueKeyCb(async.mapValuesSeries, {}, data, callback);
}

/**
 * @param {Array|Iterable} data
 * @param {any} memo
 * @param {(memo, item) => Promise<any>} callback
 * @returns {Promise<any>}
 */
function reduceAsync(data, memo, callback) {
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
 * @param {(memo, item) => Promise<any>} callback
 * @returns {Promise<any>}
 */
function reduceRightAsync(data, memo, callback) {
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
 * @param {(item) => Promise<boolean>} callback
 * @returns {Promise<Array>}
 */
function rejectAsync(data, callback) {
  return prototypeItemCb(async.reject, [], data, callback);
}

/**
 * @param {Array|Iterable} data
 * @param {number} limit
 * @param {(item) => Promise<boolean>} callback
 * @returns {Promise<Array>}
 */
function rejectLimitAsync(data, limit, callback) {
  return prototypeItemCb(async.rejectLimit, [], data, callback, limit);
}

/**
 * @param {Array|Iterable} data
 * @param {(item) => Promise<boolean>} callback
 * @returns {Promise<Array>}
 */
function rejectSeriesAsync(data, callback) {
  return prototypeItemCb(async.rejectSeries, [], data, callback);
}

/**
 * @param {Array|Iterable} data
 * @param {(item) => Promise<boolean>} callback
 * @returns {Promise<boolean>}
 */
function someAsync(data, callback) {
  return prototypeItemCb(async.some, false, data, callback);
}

/**
 * @param {Array|Iterable} data
 * @param {number} limit
 * @param {(item) => Promise<boolean>} callback
 * @returns {Promise<boolean>}
 */
function someLimitAsync(data, limit, callback) {
  return prototypeItemCb(async.someLimit, false, data, callback, limit);
}

/**
 * @param {Array|Iterable} data
 * @param {(item) => Promise<boolean>} callback
 * @returns {Promise<boolean>}
 */
function someSeriesAsync(data, callback) {
  return prototypeItemCb(async.someSeries, false, data, callback);
}

/**
 * @param {Array|Iterable} data
 * @param {(item) => Promise<any>} [callback]
 * @returns {Promise<Array>}
 */
function sortByAsync(data, callback = v => Promise.resolve(v)) {
  return prototypeItemCb(async.sortBy, [], data, callback);
}

/**
 * @param {Array|Iterable} data
 * @param {(acc: Array|Iterable, item, key: string|number) => Promise<void>} callback
 * @returns {Promise<Array|Iterable>}
 */
function transformAsync(data, callback) {
  return new Promise((resolve, reject) => {
    if (!isValid(async.transform, data, callback, 0)) {
      return resolve(data);
    }

    return async.transform(
      data,
      async (acc, item, key, next) => {
        try {
          await callback(acc, item, key);

          return next();
        } catch (err) {
          return next(err);
        }
      },
      (err, res) => {
        if (err) {
          return reject(err);
        }

        return resolve(res);
      }
    );
  });
}

/**
 * @param {Array|Iterable} data
 * @param {(item) => Promise<boolean>} callback
 * @returns {Promise<number>}
 */
async function findIndexAsync(data, callback) {
  let result = -1;

  await eachAsync(data, async (item, index) => {
    const boolCb = await callback(item);

    if (isBoolean(boolCb) && boolCb && result === -1) {
      result = index;
    }
  });

  return result;
}

/**
 * @param {Array|Iterable} data
 * @param {number} limit
 * @param {(item) => Promise<boolean>} callback
 * @returns {Promise<number>}
 */
async function findIndexLimitAsync(data, limit, callback) {
  let result = -1;

  await eachLimitAsync(data, limit, async (item, index) => {
    const boolCb = await callback(item);

    if (isBoolean(boolCb) && boolCb && result === -1) {
      result = index;
    }
  });

  return result;
}

/**
 * @param {Array|Iterable} data
 * @param {(item) => Promise<boolean>} callback
 * @returns {Promise<number>}
 */
async function findIndexSeriesAsync(data, callback) {
  let result = -1;

  await eachSeriesAsync(data, async (item, index) => {
    const boolCb = await callback(item);

    if (isBoolean(boolCb) && boolCb && result === -1) {
      result = index;
    }
  });

  return result;
}

export {
  concatAsync,
  concatLimitAsync,
  concatSeriesAsync,
  eachAsync,
  eachLimitAsync,
  eachSeriesAsync,
  everyAsync,
  everyLimitAsync,
  everySeriesAsync,
  filterAsync,
  filterLimitAsync,
  filterSeriesAsync,
  findAsync,
  findLimitAsync,
  findSeriesAsync,
  groupByAsync,
  groupByLimitAsync,
  groupBySeriesAsync,
  mapAsync,
  mapLimitAsync,
  mapSeriesAsync,
  mapValuesAsync,
  mapValuesLimitAsync,
  mapValuesSeriesAsync,
  reduceAsync,
  reduceRightAsync,
  rejectAsync,
  rejectLimitAsync,
  rejectSeriesAsync,
  someAsync,
  someLimitAsync,
  someSeriesAsync,
  sortByAsync,
  transformAsync,
  findIndexAsync,
  findIndexLimitAsync,
  findIndexSeriesAsync
};
