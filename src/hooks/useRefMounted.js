import { useRef } from 'react';

import useEffectOnce from './useEffectOnce';

const useRefMounted = () => {
  const mountedRef = useRef(false);

  useEffectOnce(() => {
    mountedRef.current = true;

    return () => {
      mountedRef.current = false;
    };
  });

  return mountedRef;
};

export default useRefMounted;
