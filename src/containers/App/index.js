import React from 'react';
import { enableScreens } from 'react-native-screens';
import { Provider } from 'react-redux';

import '../../config/debug';
import store from '../../store';
import Root from '../Root';

enableScreens();

const App = () => (
  <Provider store={store}>
    <Root />
  </Provider>
);

export default App;
