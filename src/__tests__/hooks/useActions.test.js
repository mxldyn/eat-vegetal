import { renderHook, act } from '@testing-library/react-hooks';

import { useActions } from '../../hooks';

test('should use a hook', () => {
  const { rerender, unmount } = renderHook(() => useActions({}));

  act(rerender);
  act(unmount);
});
