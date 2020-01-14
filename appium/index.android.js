import e2e from './index.test';

global.__ANDROID__ = true;
global.__IOS__ = false;

const capabilities = {
  app: './android/app/build/outputs/apk/release/app-release.apk',
  automationName: 'UiAutomator2',
  deviceName: 'Android Emulator',
  newCommandTimeout: 120,
  noReset: true,
  platformName: 'Android',
  platformVersion: '9'
};

e2e(capabilities);
