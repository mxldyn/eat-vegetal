import React, { memo, useCallback, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { RNCamera } from 'react-native-camera';
import { View } from 'react-native';
import { Colors, IconButton, Text } from 'react-native-paper';

import { useOverlaySpinner } from '../../hooks';

import styles from './styles';

const Camera = ({ title, onTakePicture }) => {
  const _cameraRef = useRef();
  const overlaySpinner = useOverlaySpinner();
  const [cameraReady, setCameraReady] = useState(false);

  const handleCameraReady = useCallback(() => setCameraReady(true), []);

  const handleTakePicture = useCallback(async () => {
    try {
      if (!_cameraRef.current) {
        return;
      }

      overlaySpinner.start();

      const { uri } =
        (await _cameraRef.current.takePictureAsync({
          quality: 0.5,
          width: 1920
        })) || {};

      if (!uri) {
        throw new Error('failed takePictureAsync');
      }

      onTakePicture(uri);
    } catch (err) {
      overlaySpinner.stop();
    }
  }, [onTakePicture, overlaySpinner]);

  return (
    <RNCamera
      ref={_cameraRef}
      style={styles.container}
      captureAudio={false}
      onCameraReady={handleCameraReady}
    >
      <Text style={styles.title}>{title}</Text>
      {!!cameraReady && (
        <View style={styles.buttonContainer}>
          <IconButton
            color={Colors.white}
            icon='circle'
            size={70}
            delayPressIn={0}
            onPress={handleTakePicture}
          />
        </View>
      )}
    </RNCamera>
  );
};

Camera.propTypes = {
  title: PropTypes.string.isRequired,
  onTakePicture: PropTypes.func.isRequired
};

export default memo(Camera);
