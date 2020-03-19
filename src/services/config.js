const TIMEOUTS = {
  FAST: 3e3,
  INIT: 10e3,
  GLOBAL: 90e3,
  UNIT: 5e3
};

const config = {
  baseURL: '',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
  timeout: TIMEOUTS.GLOBAL
};

export { TIMEOUTS };

export default config;
