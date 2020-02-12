import { renderHook, act } from '@testing-library/react-hooks';

import { useNavCurrentRouteName } from '../../hooks';

test('should use a hook', () => {
  const { rerender, unmount } = renderHook(() => useNavCurrentRouteName());

  act(rerender);
  act(unmount);
});
