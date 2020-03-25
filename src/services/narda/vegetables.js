import Config from 'react-native-config';

import buildApi from '../api';

import { URLS } from './config';

const { vegetables: VEGETABLES } = URLS;

const createApi = () => {
  const { get } = buildApi({ baseURL: Config.API_URL });

  return {
    getVegetal: (name, config = {}) =>
      get(`${VEGETABLES.getVegetal}${name}`, {}, config),
    getVegetables: (params, config = {}) =>
      get(VEGETABLES.getVegetables, params, config)
  };
};

export default createApi;
