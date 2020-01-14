import React from 'react';

import { renderStoreProviderWrapper } from '../__utils__/render';
import Root from '../../containers/Root';

test('should render a container', () => {
  const { container } = renderStoreProviderWrapper(<Root />);

  expect(container).toMatchSnapshot();
});
