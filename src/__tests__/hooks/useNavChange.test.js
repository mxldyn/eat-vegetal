import { renderHook, act } from '@testing-library/react-hooks';

import { useNavChange } from '../../hooks';

test('should use a hook', () => {
  const { rerender, unmount } = renderHook(() => useNavChange(jest.fn()));

  act(rerender);
  act(unmount);
});
