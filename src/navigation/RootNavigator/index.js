import createNativeStackNavigator from 'react-native-screens/createNativeStackNavigator';

import { SplashScreen, Home, Discover, Tips } from '../../containers';
import { SPLASH_SCREEN } from '../screens';

const RootNavigator = createNativeStackNavigator(
  {
    SplashScreen,
    Home,
    Discover,
    Tips
  },
  {
    initialRouteName: SPLASH_SCREEN,
    headerMode: 'none'
  }
);

export default RootNavigator;
