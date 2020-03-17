import Config from 'react-native-config';

import buildApi from '../api';

import { URLS } from './config';

const { tips: TIPS } = URLS;

const createApi = () => {
  const { setBaseURL, get } = buildApi();

  setBaseURL(Config.API_URL);

  return {
    getTips: (text, config = {}) => get(`${TIPS.getTips}${text}`, {}, config)
  };
};

export default createApi;
