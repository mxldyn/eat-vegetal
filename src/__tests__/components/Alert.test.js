import React from 'react';

import { renderProviderWrapper } from '../__utils__/render';
import { Alert } from '../../components';

test('should render a component', () => {
  const { container } = renderProviderWrapper(
    <Alert
      open={false}
      title='title'
      content='content'
      onClose={jest.fn()}
      actions={[{ testId: 'Alert', text: 'text', onPress: jest.fn() }]}
    />
  );

  expect(container).toMatchSnapshot();
});
