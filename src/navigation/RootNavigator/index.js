import createNativeStackNavigator from 'react-native-screens/createNativeStackNavigator';

import { Home, Discover, Tips } from '../../containers';
import { HOME_SCREEN } from '../screens';

const RootNavigator = createNativeStackNavigator(
  {
    Home,
    Discover,
    Tips
  },
  {
    initialRouteName: HOME_SCREEN,
    headerMode: 'none'
  }
);

export default RootNavigator;
