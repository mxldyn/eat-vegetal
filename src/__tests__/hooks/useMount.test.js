import { renderHook, act } from '@testing-library/react-hooks';

import { useMount } from '../../hooks';

test('should use a hook', () => {
  const { rerender, unmount } = renderHook(() => useMount(jest.fn()));

  act(rerender);
  act(unmount);
});
