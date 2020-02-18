import { create } from 'apisauce';

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

const buildApi = (config = apiConfig) => {
  const api = create({
    ...apiConfig,
    ...config,
    headers: { ...apiConfig.headers, ...config.headers }
  });

  api.axiosInstance.interceptors.request.use(onRequestSuccessAsync);
  api.axiosInstance.interceptors.response.use(onResponse, onResponseErrorAsync);

  return api;
};

export default buildApi;
