import React, { useCallback } from 'react';
import SplashScreen from 'react-native-splash-screen';
import { StatusBar } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { NavigationActions } from 'react-navigation';
import { SafeAreaProvider } from 'react-native-safe-area-view';
import { Provider } from 'react-native-paper';

import { closeAlert, closeNotification } from '../../actions/global';
import { makeGetNav } from '../../selectors/nav';
import {
  makeGetSpinner,
  makeGetAlert,
  makeGetNotification
} from '../../selectors/global';
import { Alert, Snackbar, OverlaySpinner } from '../../components';
import { AppNavigator, BottomNavigator } from '../../navigation';
import { useActions, useBackHandler, useMount } from '../../hooks';
import theme from '../../theme';

import { SPLASH_SCREEN_HIDE_TIMEOUT } from './utils';

const { back, navigate } = NavigationActions;

const Root = () => {
  const dispatch = useDispatch();
  const { nav, spinner, alert, notification } = useSelector(
    createStructuredSelector({
      nav: makeGetNav(),
      spinner: makeGetSpinner(),
      alert: makeGetAlert(),
      notification: makeGetNotification()
    })
  );
  const {
    onCloseAlert,
    onCloseNotification,
    onGoBack,
    onNavigate
  } = useActions({
    onCloseAlert: closeAlert,
    onCloseNotification: closeNotification,
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
          backgroundColor={theme.colors.statusbar}
          barStyle='dark-content'
        />
        <Provider theme={theme}>
          <AppNavigator state={nav} dispatch={dispatch} />
          <BottomNavigator {...{ nav, onNavigate }} />
        </Provider>
        <Alert {...alert} onClose={onCloseAlert} />
        <Snackbar {...notification} onClose={onCloseNotification} />
        <OverlaySpinner {...spinner} onStart={onCloseNotification} />
      </Provider>
    </SafeAreaProvider>
  );
};

export default Root;
