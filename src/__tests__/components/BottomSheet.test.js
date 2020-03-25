import React from 'react';
import { View } from 'react-native';

import { renderProviderWrapper } from '../__utils__/render';
import { BottomSheet } from '../../components';

test('should render a component', () => {
  const { container } = renderProviderWrapper(
    <BottomSheet>
      <View />
    </BottomSheet>
  );

  expect(container).toMatchSnapshot();
});
