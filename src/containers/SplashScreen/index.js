import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';

import useMount from '../../hooks/useMount';

import styles from './styles';

const SplashScreen = ({ navigation }) => {
  const hello = 'hello this is splash';

  const changeScreen = () => {
    navigation.navigate('Home');
  };

  useMount(() => setTimeout(() => changeScreen(), 5000));

  return (
    <View style={styles.title}>
      <Text>{hello}</Text>
    </View>
  );
};

SplashScreen.propTypes = {
  navigation: PropTypes.object.isRequired
};

export default SplashScreen;
