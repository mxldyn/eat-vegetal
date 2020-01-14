import idsBottomNav from '../../src/navigation/BottomNavigator/identifiers';
import { commands as cmd } from '../utils';

describe('Navigation', () => {
  describe('Fetch text', () => {
    it('should navigate to Discover screen', () =>
      cmd.click(idsBottomNav.BUTTON_DISCOVER, 3e3));
  });
});
