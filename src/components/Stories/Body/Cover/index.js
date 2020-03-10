import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Text } from 'react-native-paper';

import { FAMILY_MSG } from '../messages';

import styles from './styles';

const Cover = ({ name, textColor, familyText, familyColor, fontSize }) => (
  <View style={styles.container}>
    <Text style={[styles.title, { color: textColor }]}>{name}</Text>
    <Text style={styles.subTitle}>{FAMILY_MSG}</Text>
    <Text style={{ fontSize, color: familyColor }}>{familyText}</Text>
  </View>
);

Cover.propTypes = {
  name: PropTypes.string.isRequired,
  textColor: PropTypes.string.isRequired,
  familyText: PropTypes.string.isRequired,
  familyColor: PropTypes.string.isRequired,
  fontSize: PropTypes.number.isRequired
};

export default memo(Cover);
