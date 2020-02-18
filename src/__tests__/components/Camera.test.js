import React from 'react';

import { renderStoreProviderWrapper } from '../__utils__/render';
import { Camera } from '../../components';

test('should render a component', () => {
  const { container } = renderStoreProviderWrapper(
    <Camera title='title' onTakePicture={jest.fn()} />
  );

  expect(container).toMatchSnapshot();
});
