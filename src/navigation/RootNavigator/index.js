import {
  createStackNavigator,
  TransitionPresets
} from 'react-navigation-stack';

import { Home, Discover, Tips } from '../../containers';
import { HOME_SCREEN } from '../screens';

const RootNavigator = createStackNavigator(
  {
    Home,
    Discover,
    Tips
  },
  {
    initialRouteName: HOME_SCREEN,
    headerMode: 'none',
    defaultNavigationOptions: {
      ...TransitionPresets.SlideFromRightIOS,
      cardOverlayEnabled: false
    }
  }
);

export default RootNavigator;
