import { useCallback, useState } from 'react';
import { Dimensions } from 'react-native';

import useEventListener from './useEventListener';

const getDimensions = ({ fontScale, scale, height, width }) => {
  const isLandscape = width > height;
  const isPortrait = !isLandscape;
  const maxSize = height > width ? height : width;
  const minSize = height < width ? height : width;

  return {
    fontScale,
    scale,
    height,
    width,
    isLandscape,
    isPortrait,
    maxSize,
    minSize
  };
};

const useWindowDimensions = () => {
  const [dimensions, setDimensions] = useState(
    getDimensions(Dimensions.get('window'))
  );

  const handleChange = useCallback(
    ({ window }) => setDimensions(getDimensions(window)),
    []
  );

  useEventListener('change', handleChange, Dimensions);

  return dimensions;
};

export default useWindowDimensions;
