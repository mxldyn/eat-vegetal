import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Text } from 'react-native-paper';

import Main from '../Main';
import { useMount, useActions } from '../../hooks';
import { HOME_SCREEN } from '../../navigation/screens';
import { makeGetTip } from '../../selectors/splash';
import { fetchTip } from '../../actions/splash';

import styles from './styles';

const SplashScreen = ({ navigation }) => {
  const { text } = useSelector(makeGetTip());
  const { onFetchTip } = useActions({
    onFetchTip: fetchTip
  });

  useMount(() => setTimeout(navigation.navigate, 5e3, HOME_SCREEN));

  return (
    <Main
      styles={{ contentSafeArea: styles.contentSafeArea }}
      navigation={navigation}
      onFocus={onFetchTip}
    >
      <Text style={styles.text}>{text}</Text>
    </Main>
  );
};

SplashScreen.propTypes = {
  navigation: PropTypes.object.isRequired
};

export default SplashScreen;
