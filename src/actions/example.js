import { createActions } from 'reduxsauce';

const { Types, Creators } = createActions(
  {
    fetchText: null,
    setText: ['value'],
    setStatus: ['key', 'value']
  },
  {
    prefix: 'EXAMPLE/'
  }
);

const { fetchText, setText, setStatus } = Creators;

const { FETCH_TEXT, SET_TEXT, SET_STATUS } = Types;

export {
  Types,
  fetchText,
  setText,
  setStatus,
  FETCH_TEXT,
  SET_TEXT,
  SET_STATUS
};

export default Creators;
