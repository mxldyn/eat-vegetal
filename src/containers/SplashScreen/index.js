import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import FastImage from 'react-native-fast-image';

import useMount from '../../hooks/useMount';
import { HOME_SCREEN } from '../../navigation/screens';

import styles from './styles';

const SplashScreen = ({ navigation }) => {
  const { navigate } = navigation;

  useMount(() => setTimeout(() => navigate(HOME_SCREEN), 5000));

  return (
    <View style={styles.title}>
      <FastImage
        style={styles.pic}
        source={{
          uri:
            'https://img.xda-cdn.com/-XFJ4QY0Aoi_KMIW6zVTnQqkt7o=/https%3A%2F%2Fimg.xda-cdn.com%2Fs0iZPLZQQQlto4jNW0ozWfOkKcY%3D%2Fhttp%253A%252F%252Fi.imgur.com%252FVdlaDTZ.png',
          priority: FastImage.priority.normal
        }}
        resizeMode={FastImage.resizeMode.contain}
      />
    </View>
  );
};

SplashScreen.propTypes = {
  navigation: PropTypes.object.isRequired
};

export default SplashScreen;
