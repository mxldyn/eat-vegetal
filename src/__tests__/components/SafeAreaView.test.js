import React from 'react';

import { renderProviderWrapper } from '../__utils__/render';
import { SafeAreaView } from '../../components';

test('should render a component', () => {
  const { container } = renderProviderWrapper(<SafeAreaView />);

  expect(container).toMatchSnapshot();
});
