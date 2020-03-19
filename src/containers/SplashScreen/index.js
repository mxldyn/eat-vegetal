import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { useMount, useActions } from '../../hooks';
import { HOME_SCREEN } from '../../navigation/screens';
import { makeGetTip } from '../../selectors/splash';
import { fetchTip } from '../../actions/splash';

import styles from './styles';

const SplashScreen = ({ navigation }) => {
  useMount(() => setTimeout(navigation.navigate, 5e3, HOME_SCREEN));
  const { id, text } = useSelector(
    createStructuredSelector({ data: makeGetTip() })
  );
  const { onFetchTip } = useActions({ onFetchTip: fetchTip });

  // eslint-disable-next-line no-console
  console.log(`fechTip: ${JSON.stringify(onFetchTip())}`);
  // eslint-disable-next-line no-console
  console.log(`tip: ${id} ${text}`);
  // eslint-disable-next-line no-console
  console.log('----------END OF SplashScreen--------------');

  return (
    <View style={styles.text}>
      <Text>{`${id} ${text}`}</Text>
    </View>
  );
};

SplashScreen.propTypes = {
  navigation: PropTypes.object.isRequired
};

export default SplashScreen;
