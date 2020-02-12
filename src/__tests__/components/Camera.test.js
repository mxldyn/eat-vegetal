import React from 'react';

import { renderProviderWrapper } from '../__utils__/render';
import { Camera } from '../../components';

test('should render a component', () => {
  const { container } = renderProviderWrapper(
    <Camera title='title' onTakePicture={jest.fn()} />
  );

  expect(container).toMatchSnapshot();
});
