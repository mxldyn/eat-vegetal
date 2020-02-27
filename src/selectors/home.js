import { createSelector } from 'reselect';

const getState = ({ home }) => home;

const makeGetVegetal = () =>
  createSelector(
    getState,
    ({
      data: {
        vegetal: { id, name, iconImage, pages }
      }
    }) => ({ id, name, iconImage, pages })
  );

const makeGetVegetables = () =>
  createSelector(getState, ({ data: { vegetables: { data, page } } }) => ({
    data,
    page
  }));

const makeGetStatus = () =>
  createSelector(
    getState,
    ({ status: { refreshing, fetching, fetchingId } }) => ({
      refreshing,
      fetching,
      fetchingId
    })
  );

export { makeGetVegetal, makeGetVegetables, makeGetStatus };
