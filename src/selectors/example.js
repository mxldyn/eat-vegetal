import { createSelector } from 'reselect';

const getState = ({ example }) => example;

const makeGetData = () =>
  createSelector(getState, ({ data: { text } }) => ({
    text
  }));

const makeGetStatus = () =>
  createSelector(getState, ({ status: { fetching } }) => ({
    fetching
  }));

export { makeGetData, makeGetStatus };
