import { createReducer } from 'reduxsauce';
import produce from 'immer';

import {
  START_SPINNER,
  STOP_SPINNER,
  OPEN_ALERT,
  CLOSE_ALERT,
  OPEN_NOTIFICATION,
  CLOSE_NOTIFICATION
} from '../actions/global';

const INITIAL_STATE = {
  spinner: {
    run: false,
    text: ''
  },
  alert: {
    open: false,
    title: '',
    content: '',
    actions: [],
    dismissable: true,
    center: false,
    icon: null
  },
  notification: {
    open: false,
    variant: '',
    message: ''
  }
};

const startSpinner = produce(({ spinner }, { text = '' }) => {
  spinner.run = true;
  spinner.text = text;
});

const stopSpinner = produce(draft => {
  draft.spinner = INITIAL_STATE.spinner;
});

const openAlert = produce(
  (
    { alert },
    {
      title = '',
      content = '',
      actions = [],
      dismissable = true,
      center = false,
      icon = null
    }
  ) => {
    alert.open = true;
    alert.title = title;
    alert.content = content;
    alert.actions = actions;
    alert.dismissable = dismissable;
    alert.center = center;
    alert.icon = icon;
  }
);

const closeAlert = produce(({ alert }) => {
  alert.open = false;
});

const openNotification = produce(({ notification }, { variant, message }) => {
  notification.open = true;
  notification.variant = variant;
  notification.message = message;
});

const closeNotification = produce(draft => {
  draft.notification = INITIAL_STATE.notification;
});

const reducer = createReducer(INITIAL_STATE, {
  [START_SPINNER]: startSpinner,
  [STOP_SPINNER]: stopSpinner,
  [OPEN_ALERT]: openAlert,
  [CLOSE_ALERT]: closeAlert,
  [OPEN_NOTIFICATION]: openNotification,
  [CLOSE_NOTIFICATION]: closeNotification
});

export { INITIAL_STATE };
export default reducer;
