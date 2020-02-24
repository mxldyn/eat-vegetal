import { createActions } from 'reduxsauce';

const { Types, Creators } = createActions(
  {
    clearVegetal: null,
    fetchVegetal: ['id'],
    fetchVegetables: ['page', 'refresh'],
    mergeVegetables: ['data', 'page', 'refresh'],
    setVegetal: ['data'],
    setStatus: ['key', 'value']
  },
  {
    prefix: 'HOME/'
  }
);

const {
  clearVegetal,
  fetchVegetal,
  fetchVegetables,
  mergeVegetables,
  setVegetal,
  setStatus
} = Creators;

const {
  CLEAR_VEGETAL,
  FETCH_VEGETAL,
  FETCH_VEGETABLES,
  MERGE_VEGETABLES,
  SET_VEGETAL,
  SET_STATUS
} = Types;

export {
  Types,
  clearVegetal,
  fetchVegetal,
  fetchVegetables,
  mergeVegetables,
  setVegetal,
  setStatus,
  CLEAR_VEGETAL,
  FETCH_VEGETAL,
  FETCH_VEGETABLES,
  MERGE_VEGETABLES,
  SET_VEGETAL,
  SET_STATUS
};

export default Creators;
