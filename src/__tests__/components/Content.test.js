import React from 'react';

import { renderProviderWrapper } from '../__utils__/render';
import { Content } from '../../components';

test('should render a component', () => {
  const { container } = renderProviderWrapper(<Content />);

  expect(container).toMatchSnapshot();
});
