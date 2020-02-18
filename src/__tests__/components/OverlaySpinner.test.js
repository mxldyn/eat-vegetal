import React from 'react';

import { renderProviderWrapper } from '../__utils__/render';
import { OverlaySpinner } from '../../components';

test('should render a component', () => {
  const { container } = renderProviderWrapper(
    <OverlaySpinner run={false} text='' />
  );

  expect(container).toMatchSnapshot();
});
