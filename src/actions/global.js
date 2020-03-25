import { createActions } from 'reduxsauce';

const { Types, Creators } = createActions(
  {
    locationChange: null,
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
  locationChange,
  startSpinner,
  stopSpinner,
  openAlert,
  closeAlert,
  openNotification,
  closeNotification
} = Creators;

const {
  LOCATION_CHANGE,
  START_SPINNER,
  STOP_SPINNER,
  OPEN_ALERT,
  CLOSE_ALERT,
  OPEN_NOTIFICATION,
  CLOSE_NOTIFICATION
} = Types;

export {
  Types,
  locationChange,
  startSpinner,
  stopSpinner,
  openAlert,
  closeAlert,
  openNotification,
  closeNotification,
  LOCATION_CHANGE,
  START_SPINNER,
  STOP_SPINNER,
  OPEN_ALERT,
  CLOSE_ALERT,
  OPEN_NOTIFICATION,
  CLOSE_NOTIFICATION
};

export default Creators;
