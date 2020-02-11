import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { RNCamera } from 'react-native-camera';
import { View, Text, TouchableOpacity } from 'react-native';
import { IconButton, Colors } from 'react-native-paper';

import styles from './styles';

const Camera = ({ title }) => {
  const [path, setPath] = useState('');
  const [camera, setCamera] = useState();

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log(path);
  });

  const cameraHook = useCallback(ref => {
    setCamera(ref);
  }, []);
  const takePictureHook = useCallback(() => takePicture(this), []);

  /* global takePicture:true */
  takePicture = async () => {
    // eslint-disable-next-line no-console
    console.log('SNAP');

    if (camera) {
      const options = { quality: 0.5, base64: true };
      const data = await camera.takePictureAsync(options);

      setPath(data.uri);
    }
  };

  return (
    <View style={styles.container}>
      <RNCamera ref={cameraHook} style={styles.camera} captureAudio={false} />
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity style={styles.shotTouchable} onPress={takePictureHook}>
        <IconButton icon='circle' color={Colors.white} size={70} />
      </TouchableOpacity>
    </View>
  );
};

Camera.propTypes = {
  title: PropTypes.string.isRequired
};

export default Camera;
