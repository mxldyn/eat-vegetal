import Config from 'react-native-config';

import buildApi from '../api';

import { URLS } from './config';

const { images: IMAGES } = URLS;

const createApi = () => {
  const { post } = buildApi({ baseURL: Config.API_URL });

  return {
    upload: (data, config = {}) => post(IMAGES.upload, data, config)
  };
};

export default createApi;
