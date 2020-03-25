import 'node-libs-react-native/globals';
import 'react-native-get-random-values';
import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';

import './src/config';
import App from './src/containers/App';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);
