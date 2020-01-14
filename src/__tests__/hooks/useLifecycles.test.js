import { renderHook, act } from '@testing-library/react-hooks';

import { useLifecycles } from '../../hooks';

test('should use a hook', () => {
  const { rerender, unmount } = renderHook(() =>
    useLifecycles(jest.fn(), jest.fn())
  );

  act(rerender);
  act(unmount);
});
