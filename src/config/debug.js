import { YellowBox } from 'react-native';

if (__DEV__) {
  YellowBox.ignoreWarnings([
    'Setting a timer',
    'Warning: componentWillMount',
    'Warning: componentWillUpdate',
    'Warning: componentWillReceiveProps'
  ]);
  // eslint-disable-next-line no-console
  console.disableYellowBox = false; // disable only for e2e test in debug mode
}
