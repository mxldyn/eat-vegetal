module.exports = {
  preset: '@testing-library/react-native',
  setupFiles: [
    '<rootDir>/node_modules/react-native-gesture-handler/jestSetup.js',
    '<rootDir>/src/__tests__/__setup__/setupTests.js'
  ],
  setupFilesAfterEnv: [
    '<rootDir>/src/__tests__/__setup__/setupTestsAfterEnv.js'
  ],
  timers: 'fake',
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/android/',
    '<rootDir>/appium/',
    '<rootDir>/ios/',
    '<rootDir>/src/__tests__/__setup__/',
    '<rootDir>/src/__tests__/__utils__/'
  ],
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|@react-native-community|@?react-navigation|react-navigation-redux-helpers)'
  ]
};
