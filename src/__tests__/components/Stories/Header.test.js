import React from 'react';
import { Colors } from 'react-native-paper';

import { renderProviderWrapper } from '../../__utils__/render';
import Header from '../../../components/Stories/Header';

test('should render a component', () => {
  const { container } = renderProviderWrapper(
    <Header
      name='Story'
      uri='https://randomuser.me/api/portraits/thumb/men/75.jpg'
      color={Colors.black}
      onClose={jest.fn()}
    />
  );

  expect(container).toMatchSnapshot();
});
