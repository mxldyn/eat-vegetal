import { useCallback, useLayoutEffect, useRef } from 'react';
import { BackHandler } from 'react-native';

import { VOID_FUNC } from '../config/constants';

import useUnmount from './useUnmount';

const useBackHandlerEvents = handler => {
  const listenerRef = useRef({ remove: VOID_FUNC });
  const handlerRef = useRef(handler);

  useLayoutEffect(() => {
    handlerRef.current = handler;
  }, [handler]);

  const add = useCallback(() => {
    const eventListener = event => handlerRef.current(event);

    listenerRef.current.remove();
    listenerRef.current = BackHandler.addEventListener(
      'hardwareBackPress',
      eventListener
    );
  }, []);

  const remove = useCallback(() => listenerRef.current.remove(), []);

  useUnmount(remove);

  return { add, remove };
};

export default useBackHandlerEvents;
