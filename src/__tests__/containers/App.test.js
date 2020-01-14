import React from 'react';
import { render } from '@testing-library/react-native';

import App from '../../containers/App';

test('should render a container', () => {
  const { container } = render(<App />);

  expect(container).toMatchSnapshot();
});
