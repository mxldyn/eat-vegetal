import React from 'react';

import { renderProviderWrapper } from '../../__utils__/render';
import ProgressBar from '../../../components/Stories/ProgressBar';

test('should render a component', () => {
  const { container } = renderProviderWrapper(
    <ProgressBar
      index={0}
      currentIndex={0}
      delay={3e3}
      loaded
      pause={false}
      onNext={jest.fn()}
    />
  );

  expect(container).toMatchSnapshot();
});
