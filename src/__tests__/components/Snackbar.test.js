import React from 'react';

import { renderProviderWrapper } from '../__utils__/render';
import { Snackbar } from '../../components';

test('should render a component', () => {
  const { container } = renderProviderWrapper(
    <Snackbar open={false} message='message' variant='' onClose={jest.fn()} />
  );

  expect(container).toMatchSnapshot();
});
