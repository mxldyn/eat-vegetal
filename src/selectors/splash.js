import { createSelector } from 'reselect';

const getState = ({ splash }) => splash;

const makeGetTip = () => createSelector(getState, text => text);

export { makeGetTip };
