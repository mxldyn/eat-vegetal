import { renderHook, act } from '@testing-library/react-hooks';

import { useRefMounted } from '../../hooks';

test('should use a hook', () => {
  const {
    result: { current: mountedRef },
    unmount
  } = renderHook(() => useRefMounted());

  expect(mountedRef.current).toBe(true);
  act(unmount);
  expect(mountedRef.current).toBe(false);
});
