import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Text } from 'react-native-paper';

import styles from './styles';

const Pairing = ({ title, text, titleFontSize, textFontSize }) => (
  <View style={styles.container}>
    <Text style={[styles.title, { fontSize: titleFontSize }]}>{title}</Text>
    <Text style={[styles.textColor, { fontSize: textFontSize }]}>{text}</Text>
  </View>
);

Pairing.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  titleFontSize: PropTypes.number.isRequired,
  textFontSize: PropTypes.number.isRequired
};

export default memo(Pairing);
