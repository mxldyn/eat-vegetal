import { renderHook, act } from '@testing-library/react-hooks';

import { usePrevious } from '../../hooks';

test('should use a hook', () => {
  const { rerender, unmount } = renderHook(() => usePrevious(null));

  act(rerender);
  act(unmount);
});
