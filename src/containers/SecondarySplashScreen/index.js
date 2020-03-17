import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { useMount } from '../../hooks';
import { HOME_SCREEN } from '../../navigation/screens';
import { makeGetTip } from '../../selectors/splash';

import styles from './styles';

const SecondarySplashScreen = ({ navigation }) => {
  useMount(() => setTimeout(navigation.navigate, 5e3, HOME_SCREEN));
  const { tip } = useSelector(createStructuredSelector({ tip: makeGetTip() }));

  return (
    <View style={styles.text}>
      <Text>{tip}</Text>
    </View>
  );
};

SecondarySplashScreen.propTypes = {
  navigation: PropTypes.object.isRequired
};

export default SecondarySplashScreen;
