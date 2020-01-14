import buildApi from '../api';
import { URL_EXAMPLE_API } from '../../config/constants';

import { URLS } from './config';

const createApi = () => {
  const { setBaseURL, get } = buildApi();

  setBaseURL(URL_EXAMPLE_API);

  return {
    getTodo: (id, config = {}) => get(`${URLS.todos.getTodo}${id}`, {}, config)
  };
};

export default createApi;
