import { Dimensions } from 'react-native';
import { renderHook, act } from '@testing-library/react-hooks';

import { useEventListener } from '../../hooks';

test('should use a hook', () => {
  const { rerender, unmount } = renderHook(() =>
    useEventListener('change', jest.fn(), Dimensions)
  );

  act(rerender);
  act(unmount);
});
