## Requirements

- React Native environment
- Credentials files
- Environment files

## Installation

```
npm install
```

## Getting started

### Android

```
npm run android:dev
```

```
npm run android:prod
```

### iOS

```
npm run ios:dev
```

```
npm run ios:prod
```

## Clean

### Android

```
npm run android:clean
```

### iOS

```
npm run ios:clean
```

### Metro

```
npm run metro:clean
```

## Testing

### Unit

```
npm run test
```

### E2E

```
npm run android:build:e2e:dev
```

```
npm run android:build:e2e:prod
```

```
npm run e2e:start
```

```
npm run e2e:android
```

```
npm run e2e:ios
```

## Check code

```
npm run lint
```

```
npm run lint:fix
```

```
npm run lint:check
```

```
npm run pretty
```

## Maintenance

```
npm install -g npm-check
```

```
npm-check -u
```

## Releases

### Android

### First step:

### Increment versionCode and versionName in ".env.\*" file

```
npm run android:build:dev
```

```
npm run android:build:prod
```

1. Take the file located in "./android/app/build/outputs/bundle/release/app.aab"
2. Upload to Play Store in Beta channel
3. Upload to Play Store in Production channel

### iOS

```
npm run ios:prepare:dev
```

```
npm run ios:prepare:prod
```

1. Open Xcode
2. Increment Version and Build in Xcode
3. Clean project
4. Build project
5. Archive project
6. Upload to TestFlight
7. Upload to App Store

## Documentation

- [npm-check]
- [appium]
- [babel]
- [eslint]
- [immer]
- [moment]
- [prettier]
- [react]
- [react-native]
- [react-native-gesture-handler]
- [react-native-paper]
- [react-navigation]
- [react-redux]
- [redux]
- [redux-saga]
- [webdriverio]

[npm-check]: https://github.com/dylang/npm-check
[appium]: http://appium.io/
[babel]: https://babeljs.io/
[eslint]: https://eslint.org/
[immer]: https://immerjs.github.io/immer/docs/introduction
[moment]: http://momentjs.com/
[prettier]: https://prettier.io/
[react]: https://reactjs.org/
[react-native]: https://facebook.github.io/react-native/
[react-native-gesture-handler]: https://kmagiera.github.io/react-native-gesture-handler/
[react-native-paper]: https://callstack.github.io/react-native-paper/
[react-navigation]: https://reactnavigation.org/docs/en/4.x/getting-started.html
[react-redux]: https://react-redux.js.org/
[redux]: http://redux.js.org/
[redux-saga]: https://redux-saga.js.org/
[webdriverio]: https://webdriver.io/
