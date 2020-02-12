import React, { memo, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import { RNCamera } from 'react-native-camera';
import { View } from 'react-native';
import { Colors, IconButton, Text } from 'react-native-paper';

import styles from './styles';

const Camera = ({ title, onTakePicture }) => {
  const _cameraRef = useRef();

  const handleTakePicture = useCallback(async () => {
    if (!_cameraRef.current) {
      return;
    }

    const { uri } =
      (await _cameraRef.current.takePictureAsync({ quality: 0.5 })) || {};

    if (uri) {
      onTakePicture(uri);
    }
  }, [onTakePicture]);

  return (
    <RNCamera ref={_cameraRef} style={styles.container} captureAudio={false}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.buttonContainer}>
        <IconButton
          color={Colors.white}
          icon='circle'
          size={70}
          onPress={handleTakePicture}
        />
      </View>
    </RNCamera>
  );
};

Camera.propTypes = {
  title: PropTypes.string.isRequired,
  onTakePicture: PropTypes.func.isRequired
};

export default memo(Camera);
