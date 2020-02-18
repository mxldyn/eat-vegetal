import { useEffect, useLayoutEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

import { makeGetNav } from '../selectors/nav';
import { getCurrentRouteName } from '../navigation/utils';

const useNavChange = handler => {
  const nav = useSelector(makeGetNav());
  const currentRouteNameRef = useRef(getCurrentRouteName(nav));
  const handlerRef = useRef(handler);

  useLayoutEffect(() => {
    handlerRef.current = handler;
  }, [handler]);

  useEffect(() => {
    const currentRouteName = getCurrentRouteName(nav);

    if (currentRouteName !== currentRouteNameRef.current) {
      currentRouteNameRef.current = currentRouteName;
      handlerRef.current();
    }
  }, [nav]);
};

export default useNavChange;
