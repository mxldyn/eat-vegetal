import { renderHook, act } from '@testing-library/react-hooks';

import { useBackHandlerEvents } from '../../hooks';

test('should use a hook', () => {
  const { rerender, unmount } = renderHook(() =>
    useBackHandlerEvents(jest.fn())
  );

  act(rerender);
  act(unmount);
});
