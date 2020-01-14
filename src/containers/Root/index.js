import React, { useCallback } from 'react';
import SplashScreen from 'react-native-splash-screen';
import { StatusBar } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { SafeAreaProvider } from 'react-native-safe-area-view';
import { Provider } from 'react-native-paper';

import { makeGetNav } from '../../selectors/nav';
import { AppNavigator, BottomNavigator } from '../../navigation';
import { useActions, useBackHandler, useMount } from '../../hooks';
import theme from '../../theme';

import { SPLASH_SCREEN_HIDE_TIMEOUT } from './utils';

const { back, navigate } = NavigationActions;

const Root = () => {
  const dispatch = useDispatch();
  const nav = useSelector(makeGetNav());
  const { onGoBack, onNavigate } = useActions({
    onGoBack: back,
    onNavigate: navigate
  });

  useMount(() => setTimeout(SplashScreen.hide, SPLASH_SCREEN_HIDE_TIMEOUT));

  const handleBackPress = useCallback(() => {
    if (nav.index <= 0) {
      return false;
    }

    onGoBack();

    return true;
  }, [nav.index, onGoBack]);

  useBackHandler(handleBackPress);

  return (
    <SafeAreaProvider>
      <Provider theme={theme}>
        <StatusBar
          backgroundColor={theme.colors.primary}
          barStyle='dark-content'
        />
        <AppNavigator state={nav} dispatch={dispatch} />
        <BottomNavigator {...{ nav, onNavigate }} />
      </Provider>
    </SafeAreaProvider>
  );
};

export default Root;
