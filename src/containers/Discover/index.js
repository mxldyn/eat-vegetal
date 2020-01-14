import React from 'react';
import PropTypes from 'prop-types';
import { RNCamera } from 'react-native-camera';

import Main from '../Main';

import styles from './styles';

const Discover = ({ navigation }) => (
  <Main navigation={navigation}>
    <RNCamera style={styles.camera} captureAudio={false} />
  </Main>
);

Discover.propTypes = {
  navigation: PropTypes.object.isRequired
};

export default Discover;
