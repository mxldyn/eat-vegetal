import { renderHook, act } from '@testing-library/react-hooks';

import { useUnmount } from '../../hooks';

test('should use a hook', () => {
  const { rerender, unmount } = renderHook(() => useUnmount(jest.fn()));

  act(rerender);
  act(unmount);
});
