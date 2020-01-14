import idsMain from '../../src/containers/Main/identifiers';

import cmd from './commands';

const goTo = async (id, screen) => {
  await cmd.click(id);

  return cmd.waitFor(`${idsMain.SCREEN}_${screen}`);
};

export default { goTo };
