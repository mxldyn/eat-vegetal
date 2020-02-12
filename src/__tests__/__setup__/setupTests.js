/* eslint-disable global-require */
import { NativeModules, View } from 'react-native';

NativeModules.RNCNetInfo = {
  getCurrentState: jest.fn(() => Promise.resolve()),
  addListener: jest.fn(),
  removeListeners: jest.fn()
};

jest
  .mock('react-native-reanimated', () =>
    require('react-native-reanimated/mock')
  )
  .mock('react-native-screens', () => {
    const RNScreens = jest.requireActual('react-native-screens');

    jest.spyOn(RNScreens, 'enableScreens').mockImplementation();

    return RNScreens;
  })
  .mock('react-native-safe-area-view', () => ({
    __esModule: true,
    default: View,
    useSafeArea: jest.fn(() => ({
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    })),
    SafeAreaProvider: View,
    SafeAreaConsumer: View,
    SafeAreaContext: View
  }))
  .mock('rn-fetch-blob', () => ({
    DocumentDir: jest.fn(),
    ImageCache: {
      get: {
        clear: jest.fn()
      }
    },
    fs: {
      exists: jest.fn().mockReturnValueOnce({ then: jest.fn() }),
      dirs: {
        MainBundleDir: jest.fn(),
        CacheDir: jest.fn(),
        DocumentDir: jest.fn()
      }
    }
  }))
  .mock('react-native-share', () => ({
    default: jest.fn()
  }))
  .mock('react-native-splash-screen', () => ({ hide: jest.fn() }))
  .spyOn(Date, 'now')
  .mockImplementation(() => 1503187200000);
