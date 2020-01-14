import React from 'react';

import { navigation, renderStoreProviderWrapper } from '../__utils__/render';
import { Discover } from '../../containers';

test('should render a container', () => {
  const { container } = renderStoreProviderWrapper(
    <Discover navigation={navigation} />
  );

  expect(container).toMatchSnapshot();
});
