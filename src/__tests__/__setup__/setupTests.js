/* eslint-disable global-require */
import { View } from 'react-native';

jest
  .mock('react-native-reanimated', () =>
    require('react-native-reanimated/mock')
  )
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
  .mock('react-native-splash-screen', () => ({ hide: jest.fn() }))
  .spyOn(Date, 'now')
  .mockImplementation(() => 1503187200000);
