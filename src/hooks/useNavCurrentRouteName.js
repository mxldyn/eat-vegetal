import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { makeGetNav } from '../selectors/nav';
import { getCurrentRouteName } from '../navigation/utils';

const useNavCurrentRouteName = () => {
  const nav = useSelector(makeGetNav());
  const [currentRouteName, setCurrentRouteName] = useState(
    getCurrentRouteName(nav)
  );

  useEffect(() => {
    const nextRouteName = getCurrentRouteName(nav);

    if (nextRouteName !== currentRouteName) {
      setCurrentRouteName(nextRouteName);
    }
  }, [currentRouteName, nav]);

  return currentRouteName;
};

export default useNavCurrentRouteName;
