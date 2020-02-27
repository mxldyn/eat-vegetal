import createNativeStackNavigator from 'react-native-screens/createNativeStackNavigator';

import { SplashScreen, Home, Discover, Tips, Story } from '../../containers';
import { SPLASH_SCREEN } from '../screens';

const RootNavigator = createNativeStackNavigator(
  {
    SplashScreen,
    Home,
    Discover,
    Tips,
    Story
  },
  {
    initialRouteName: SPLASH_SCREEN,
    headerMode: 'none'
  }
);

export default RootNavigator;
