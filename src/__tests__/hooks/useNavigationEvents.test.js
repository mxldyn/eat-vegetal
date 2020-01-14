import { renderHook, act } from '@testing-library/react-hooks';

import { useNavigationEvents } from '../../hooks';
import { navigation } from '../__utils__/render';

test('should use a hook', () => {
  const { rerender, unmount } = renderHook(() =>
    useNavigationEvents(jest.fn(), jest.fn(), navigation)
  );

  act(rerender);
  act(unmount);
});
