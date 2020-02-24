import { createSelector } from 'reselect';

const getState = ({ home }) => home;

const makeGetVegetal = () =>
  createSelector(getState, ({ data: { vegetal } }) => vegetal);

const makeGetVegetables = () =>
  createSelector(getState, ({ data: { vegetables: { data, page } } }) => ({
    data,
    page
  }));

const makeGetStatus = () =>
  createSelector(
    getState,
    ({ status: { refreshing, fetching, refreshingId, fetchingId } }) => ({
      refreshing,
      fetching,
      refreshingId,
      fetchingId
    })
  );

export { makeGetVegetal, makeGetVegetables, makeGetStatus };
