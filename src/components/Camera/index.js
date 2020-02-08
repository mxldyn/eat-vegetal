/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/no-this-in-sfc */
/* eslint-disable no-console */
/* eslint-disable no-undef */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { RNCamera } from 'react-native-camera';
import { View, Text, TouchableOpacity } from 'react-native';

import styles from './styles';

const SNAP = 'SNAP';

const Camera = ({ title }) => {
  const [path, setPath] = useState('');

  takePicture = async () => {
    console.log('SNAP');

    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options);

      console.log(data.uri);
      setPath(data.uri);
      console.log(path);
    }
  };

  return (
    <View style={styles.container}>
      <RNCamera
        ref={ref => {
          this.camera = ref;
        }}
        style={styles.camera}
        captureAudio={false}
      />
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity
        style={styles.shotTouchable}
        onPress={() => this.takePicture(this)}
      >
        <Text style={styles.shotButton}> {SNAP} </Text>
      </TouchableOpacity>
    </View>
  );
};

Camera.propTypes = {
  title: PropTypes.string.isRequired
};

export default Camera;
