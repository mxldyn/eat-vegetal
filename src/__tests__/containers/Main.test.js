import React from 'react';

import { navigation, renderStoreProviderWrapper } from '../__utils__/render';
import Main from '../../containers/Main';

test('should render a container', () => {
  const { container } = renderStoreProviderWrapper(
    <Main navigation={navigation} />
  );

  expect(container).toMatchSnapshot();
});
