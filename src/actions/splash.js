import { createActions } from 'reduxsauce';

const { Types, Creators } = createActions(
  {
    fetchTip: null
  },
  {
    prefix: 'SPLASHSCREEN/'
  }
);

const { fetchTip } = Creators;

const { FETCH_TIP } = Types;

export { Types, fetchTip, FETCH_TIP };

export default Creators;
