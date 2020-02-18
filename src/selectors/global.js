import { createSelector } from 'reselect';

const getState = ({ global }) => global;

const makeGetSpinner = () =>
  createSelector(getState, ({ spinner: { run, text } }) => ({
    run,
    text
  }));

const makeGetAlert = () =>
  createSelector(
    getState,
    ({
      alert: { open, title, content, actions, dismissable, center, icon }
    }) => ({
      open,
      title,
      content,
      actions,
      dismissable,
      center,
      icon
    })
  );

const makeGetNotification = () =>
  createSelector(getState, ({ notification: { open, variant, message } }) => ({
    open,
    variant,
    message
  }));

export { makeGetSpinner, makeGetAlert, makeGetNotification };
