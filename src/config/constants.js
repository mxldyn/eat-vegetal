import { Platform } from 'react-native';

export const VOID_FUNC = () => {};

export const URL_EXAMPLE_API = 'https://jsonplaceholder.typicode.com/';
export const SUPPORT_NOTCH =
  Platform.OS === 'ios' ||
  (Platform.OS === 'android' && Platform.Version >= 23);
export const IS_ANDROID = Platform.OS === 'android';
export const IS_IOS = Platform.OS === 'ios';
