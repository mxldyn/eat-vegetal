import { createActions } from 'reduxsauce';

const { Types, Creators } = createActions(
  {
    startSpinner: ['text'],
    stopSpinner: null,
    openAlert: ['title', 'content', 'actions', 'dismissable', 'center', 'icon'],
    closeAlert: null,
    openNotification: ['variant', 'message'],
    closeNotification: null
  },
  {
    prefix: 'GLOBAL/'
  }
);

const {
  startSpinner,
  stopSpinner,
  openAlert,
  closeAlert,
  openNotification,
  closeNotification
} = Creators;

const {
  START_SPINNER,
  STOP_SPINNER,
  OPEN_ALERT,
  CLOSE_ALERT,
  OPEN_NOTIFICATION,
  CLOSE_NOTIFICATION
} = Types;

export {
  Types,
  startSpinner,
  stopSpinner,
  openAlert,
  closeAlert,
  openNotification,
  closeNotification,
  START_SPINNER,
  STOP_SPINNER,
  OPEN_ALERT,
  CLOSE_ALERT,
  OPEN_NOTIFICATION,
  CLOSE_NOTIFICATION
};

export default Creators;
