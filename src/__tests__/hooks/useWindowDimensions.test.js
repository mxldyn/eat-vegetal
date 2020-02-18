import { renderHook, act } from '@testing-library/react-hooks';

import { useWindowDimensions } from '../../hooks';

test('should use a hook', () => {
  const { rerender, unmount } = renderHook(() => useWindowDimensions());

  act(rerender);
  act(unmount);
});
