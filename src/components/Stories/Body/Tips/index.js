import React, { memo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Text } from 'react-native-paper';

import { Icon } from '../../../../utils/icon';

import styles from './styles';

const Tips = ({ textColor, tips, fontSize }) => {
  const renderTip = useCallback(
    (tip, index) => (
      <View key={`${index}`} style={styles.tipContainer}>
        <Icon color={textColor} name='arrow-right' size={fontSize} />
        <Text style={[styles.text, { fontSize }]}>{tip}</Text>
      </View>
    ),
    [fontSize, textColor]
  );

  return <View style={styles.container}>{tips.map(renderTip)}</View>;
};

Tips.propTypes = {
  textColor: PropTypes.string.isRequired,
  tips: PropTypes.arrayOf(PropTypes.string).isRequired,
  fontSize: PropTypes.number.isRequired
};

export default memo(Tips);
