import { renderHook, act } from '@testing-library/react-hooks';

import { useBackHandler } from '../../hooks';

test('should use a hook', () => {
  const { rerender, unmount } = renderHook(() => useBackHandler(jest.fn()));

  act(rerender);
  act(unmount);
});
