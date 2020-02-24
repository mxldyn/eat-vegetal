import React, { memo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native-gesture-handler';
import FastImage from 'react-native-fast-image';

const Item = ({ data, onPress, ...rest }) => {
  const handlePress = useCallback(() => onPress(data), [data, onPress]);

  return (
    <TouchableOpacity onPress={handlePress}>
      <FastImage {...rest} />
    </TouchableOpacity>
  );
};

Item.propTypes = {
  data: PropTypes.object.isRequired,
  onPress: PropTypes.func.isRequired
};

export default memo(Item);
