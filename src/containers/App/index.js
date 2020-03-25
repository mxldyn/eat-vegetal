import React from 'react';
import { Provider } from 'react-redux';
import { enableScreens } from 'react-native-screens';
import { enableES5 } from 'immer';

import '../../config/debug';
import store from '../../store';
import Root from '../Root';

enableScreens();
enableES5();

const App = () => (
  <Provider store={store}>
    <Root />
  </Provider>
);

export default App;
