import React from 'react';

import { navigation, renderStoreProviderWrapper } from '../__utils__/render';
import { Tips } from '../../containers';

test('should render a container', () => {
  const { container } = renderStoreProviderWrapper(
    <Tips navigation={navigation} />
  );

  expect(container).toMatchSnapshot();
});
