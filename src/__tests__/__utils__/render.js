/* eslint-disable react/prop-types */
import 'react-native';
import React from 'react';
import { render } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-view';

import { INITIAL_STATE as global } from '../../reducers/global';
import { INITIAL_STATE as splash } from '../../reducers/splash';
import { INITIAL_STATE as home } from '../../reducers/home';
import { INITIAL_STATE as discover } from '../../reducers/discover';
import { HOME_SCREEN } from '../../navigation/screens';

const navigation = {
  state: {
    routeName: HOME_SCREEN
  },
  navigate: jest.fn(),
  goBack: jest.fn(),
  addListener: jest.fn(() => ({
    remove: jest.fn()
  })),
  isFocused: jest.fn(() => true),
  setParams: jest.fn(),
  getParam: jest.fn(),
  dispatch: jest.fn(),
  dangerouslyGetParent: jest.fn(() => ({
    state: {
      key: HOME_SCREEN,
      index: 0,
      routes: [{ key: HOME_SCREEN }]
    }
  })),
  push: jest.fn(),
  pop: jest.fn(),
  popToTop: jest.fn(),
  replace: jest.fn(),
  reset: jest.fn(),
  dismiss: jest.fn(),
  openDrawer: jest.fn(),
  closeDrawer: jest.fn(),
  toggleDrawer: jest.fn()
};

const BaseProvider = ({ children }) => (
  <SafeAreaProvider>{children}</SafeAreaProvider>
);

const BaseStoreProvider = ({ children }) => (
  <Provider
    store={{
      getState: jest.fn(() => ({
        nav: {
          index: 0,
          routes: [
            {
              key: HOME_SCREEN,
              routeName: HOME_SCREEN
            }
          ]
        },
        global,
        splash,
        home,
        discover
      })),
      dispatch: jest.fn(),
      subscribe: jest.fn()
    }}
  >
    <BaseProvider>{children}</BaseProvider>
  </Provider>
);

const renderProviderWrapper = (ui, options = {}) =>
  render(ui, { wrapper: BaseProvider, ...options });

const renderStoreProviderWrapper = (ui, options = {}) =>
  render(ui, { wrapper: BaseStoreProvider, ...options });

export { navigation, renderProviderWrapper, renderStoreProviderWrapper };
