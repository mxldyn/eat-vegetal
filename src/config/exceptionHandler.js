import { Alert } from 'react-native';
import {
  setJSExceptionHandler,
  setNativeExceptionHandler
} from 'react-native-exception-handler';
import Config from 'react-native-config';

if (Config.NODE_ENV !== 'production') {
  setJSExceptionHandler(({ message, stack } = {}) =>
    Alert.alert('JS Error', `Error: ${message}\nStack: ${stack}`)
  );

  setNativeExceptionHandler(message => Alert.alert('Native Error', message));
}
