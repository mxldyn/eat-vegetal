import { renderHook, act } from '@testing-library/react-hooks';

import { useNotification } from '../../hooks';

test('should use a hook', () => {
  const { rerender, unmount } = renderHook(() => useNotification());

  act(rerender);
  act(unmount);
});
