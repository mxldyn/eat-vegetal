import { createActions } from 'reduxsauce';

const { Types, Creators } = createActions(
  {
    fetchTip: null,
    setTip: ['id', 'text']
  },
  {
    prefix: 'SPLASHSCREEN/'
  }
);

const { fetchTip, setTip } = Creators;

const { FETCH_TIP, SET_TIP } = Types;

export { Types, fetchTip, setTip, FETCH_TIP, SET_TIP };

export default Creators;
