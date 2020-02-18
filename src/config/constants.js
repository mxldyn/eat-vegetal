import { Platform } from 'react-native';

export const VOID_FUNC = () => {};

export const SUPPORT_NOTCH =
  Platform.OS === 'ios' ||
  (Platform.OS === 'android' && Platform.Version >= 23);
export const IS_ANDROID = Platform.OS === 'android';
export const IS_IOS = Platform.OS === 'ios';
export const SNACKBAR_VARIANTS = {
  SUCCESS: 'success',
  WARNING: 'warning',
  ERROR: 'error',
  INFO: 'info'
};
