import React from 'react';

import { navigation, renderStoreProviderWrapper } from '../__utils__/render';
import { Home } from '../../containers';

test('should render a container', () => {
  const { container } = renderStoreProviderWrapper(
    <Home navigation={navigation} />
  );

  expect(container).toMatchSnapshot();
});
