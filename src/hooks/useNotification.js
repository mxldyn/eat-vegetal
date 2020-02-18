import { openNotification, closeNotification } from '../actions/global';

import useActions from './useActions';
import useNavChange from './useNavChange';

const useNotification = () => {
  const { open, close } = useActions({
    open: openNotification,
    close: closeNotification
  });

  useNavChange(closeNotification);

  return { open, close };
};

export default useNotification;
