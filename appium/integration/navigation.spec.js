import idsBottomNav from '../../src/navigation/BottomNavigator/identifiers';
import { commands as cmd } from '../utils';

describe('Navigation', () => {
  describe('Bottom navigation', () => {
    it('should go to Discover screen', () => () =>
      cmd.click(idsBottomNav.BUTTON_DISCOVER, 3e3));
    it('should go to Tips screen', () => () =>
      cmd.click(idsBottomNav.BUTTON_TIPS, 3e3));
    it('should go to Home screen', () => () =>
      cmd.click(idsBottomNav.BUTTON_HOME, 3e3));
  });
});
