import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import Main from '../Main';
import { useMount, useActions } from '../../hooks';
import { HOME_SCREEN } from '../../navigation/screens';
import { makeGetTip } from '../../selectors/splash';
import { fetchTip } from '../../actions/splash';

import styles from './styles';

const SplashScreen = ({ navigation }) => {
  useMount(() => setTimeout(navigation.navigate, 5e3, HOME_SCREEN));
  const { id, text } = useSelector(makeGetTip());
  const { onFetchTip } = useActions({ onFetchTip: fetchTip });

  return (
    <Main navigation={navigation} onFocus={onFetchTip}>
      <View style={styles.text}>
        <Text>{`${id} ${text}`}</Text>
      </View>
    </Main>
  );
};

SplashScreen.propTypes = {
  navigation: PropTypes.object.isRequired
};

export default SplashScreen;
