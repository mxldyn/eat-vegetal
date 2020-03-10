import { renderHook, act } from '@testing-library/react-hooks';

import { useKeyboardState } from '../../hooks';

test('should use a hook', () => {
  const {
    result: { current: keyboard },
    rerender,
    unmount
  } = renderHook(() => useKeyboardState());

  expect(keyboard.isKeyboardShow).toBe(false);
  act(rerender);
  act(unmount);
});
