import { create, TIMEOUT_ERROR } from 'apisauce';

import { hasConnection } from '../helpers/netInfo';

import apiConfig from './config';

const onRequestSuccessAsync = async config => {
  if (!(await hasConnection())) {
    throw new Error('Network Error');
  }

  return config;
};

const onResponse = res => res;

const onResponseErrorAsync = error => Promise.reject(error);

const requestTimeout = (promise, axiosConfig, reqConfig) => {
  const { timeout } = apiConfig;
  const config = { ...axiosConfig, ...(reqConfig || {}) };
  const duration = (parseInt(config.timeout, 10) || timeout) + 1e3;
  const result = {
    ok: false,
    problem: TIMEOUT_ERROR,
    originalError: 'Request Timeout Error',
    data: null,
    status: null,
    headers: null,
    config,
    duration
  };
  const timeoutPromise = new Promise(resolve =>
    setTimeout(resolve, duration, result)
  );

  return Promise.race([timeoutPromise, promise]);
};

const buildApi = (config = apiConfig) => {
  const api = create({
    ...apiConfig,
    ...config,
    headers: { ...apiConfig.headers, ...config.headers }
  });
  const {
    axiosInstance: { defaults },
    get,
    delete: del,
    head,
    post,
    put,
    patch,
    link,
    unlink
  } = api;

  api.axiosInstance.interceptors.request.use(onRequestSuccessAsync);
  api.axiosInstance.interceptors.response.use(onResponse, onResponseErrorAsync);

  api.get = (...args) => requestTimeout(get(...args), defaults, args[2]);
  api.delete = (...args) => requestTimeout(del(...args), defaults, args[2]);
  api.head = (...args) => requestTimeout(head(...args), defaults, args[2]);
  api.post = (...args) => requestTimeout(post(...args), defaults, args[2]);
  api.put = (...args) => requestTimeout(put(...args), defaults, args[2]);
  api.patch = (...args) => requestTimeout(patch(...args), defaults, args[2]);
  api.link = (...args) => requestTimeout(link(...args), defaults, args[2]);
  api.unlink = (...args) => requestTimeout(unlink(...args), defaults, args[2]);

  return api;
};

export default buildApi;
