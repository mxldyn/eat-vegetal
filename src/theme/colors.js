import { Platform } from 'react-native';
import { Colors } from 'react-native-paper';

import { IS_ANDROID } from '../config/constants';

const colors = {
  statusbar: IS_ANDROID && Platform.Version <= 22 ? Colors.black : Colors.white,
  primary: Colors.white,
  transparent: '#00000000',
  success: Colors.green600,
  warning: Colors.amber700,
  error: Colors.red800,
  info: Colors.blue700
};

export default colors;
