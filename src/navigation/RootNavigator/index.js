import createNativeStackNavigator from 'react-native-screens/createNativeStackNavigator';

import { Home, Discover, Tips, Story } from '../../containers';
import { HOME_SCREEN } from '../screens';

const RootNavigator = createNativeStackNavigator(
  {
    Home,
    Discover,
    Tips,
    Story
  },
  {
    initialRouteName: HOME_SCREEN,
    headerMode: 'none'
  }
);

export default RootNavigator;
