import { createSelector } from 'reselect';

const getState = ({ splash }) => splash;

const makeGetTip = () =>
  createSelector(getState, ({ data: { id, text } }) => ({ id, text }));

export { makeGetTip };
