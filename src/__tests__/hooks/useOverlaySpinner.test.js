import { renderHook, act } from '@testing-library/react-hooks';

import { useOverlaySpinner } from '../../hooks';

test('should use a hook', () => {
  const { rerender, unmount } = renderHook(() => useOverlaySpinner());

  act(rerender);
  act(unmount);
});
