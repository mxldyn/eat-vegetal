import { startSpinner, stopSpinner } from '../actions/global';

import useActions from './useActions';

const useOverlaySpinner = () => {
  const { start, stop } = useActions({
    start: startSpinner,
    stop: stopSpinner
  });

  return { start, stop };
};

export default useOverlaySpinner;
