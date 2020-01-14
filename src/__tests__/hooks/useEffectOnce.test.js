import { renderHook, act } from '@testing-library/react-hooks';

import { useEffectOnce } from '../../hooks';

test('should use a hook', () => {
  const { rerender, unmount } = renderHook(() => useEffectOnce(jest.fn()));

  act(rerender);
  act(unmount);
});
