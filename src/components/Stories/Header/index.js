import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { IconButton, Text } from 'react-native-paper';
import FastImage from 'react-native-fast-image';

import styles from './styles';

const Header = ({ name, uri, color, onClose }) => (
  <View style={styles.container}>
    <FastImage source={{ uri }} style={styles.image} />
    <Text style={[styles.name, { color }]} numberOfLines={1}>
      {name}
    </Text>
    <IconButton icon='close' color={color} size={25} onPress={onClose} />
  </View>
);

Header.propTypes = {
  name: PropTypes.string.isRequired,
  uri: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired
};

export default memo(Header);
