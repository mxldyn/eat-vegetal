import { useLayoutEffect, useRef } from 'react';
import { BackHandler } from 'react-native';

import useEffectOnce from './useEffectOnce';

const useBackHandler = handler => {
  const handlerRef = useRef(handler);

  useLayoutEffect(() => {
    handlerRef.current = handler;
  }, [handler]);

  useEffectOnce(() => {
    const eventListener = event => handlerRef.current(event);
    const listener = BackHandler.addEventListener(
      'hardwareBackPress',
      eventListener
    );

    return listener.remove;
  });
};

export default useBackHandler;
