import React from 'react';

import { navigation, renderStoreProviderWrapper } from '../__utils__/render';
import { SplashScreen } from '../../containers';

test('should render a container', () => {
  const { container } = renderStoreProviderWrapper(
    <SplashScreen navigation={navigation} />
  );

  expect(container).toMatchSnapshot();
});
