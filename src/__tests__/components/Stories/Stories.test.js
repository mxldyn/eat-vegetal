import React from 'react';
import { Colors } from 'react-native-paper';

import { renderProviderWrapper } from '../../__utils__/render';
import { Stories } from '../../../components';

test('should render a component', () => {
  const { container } = renderProviderWrapper(
    <Stories
      textColor={Colors.black}
      backgroundColor={Colors.white}
      name='Story'
      iconImage='https://randomuser.me/api/portraits/thumb/men/75.jpg'
      pages={[]}
    />
  );

  expect(container).toMatchSnapshot();
});
