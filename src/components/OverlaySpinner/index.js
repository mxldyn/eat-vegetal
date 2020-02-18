import React, { memo, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Keyboard, StatusBar } from 'react-native';
import {
  ActivityIndicator,
  Modal,
  Portal,
  Subheading,
  useTheme
} from 'react-native-paper';

import { useBackHandlerEvents } from '../../hooks';
import { VOID_FUNC } from '../../config/constants';

import styles from './styles';

const OverlaySpinner = ({ run, text, onStart }) => {
  const { colors } = useTheme();

  const handleBackPress = useCallback(() => true, []);

  const backHandlerEvents = useBackHandlerEvents(handleBackPress);

  useEffect(
    useCallback(() => {
      if (run) {
        Keyboard.dismiss();
        backHandlerEvents.add();
        onStart();
      } else {
        backHandlerEvents.remove();
      }
    }, [backHandlerEvents, onStart, run]),
    [run]
  );

  return (
    <Portal>
      <Modal
        contentContainerStyle={styles.modal}
        dismissable={false}
        visible={run}
      >
        <StatusBar animated backgroundColor={colors.backdrop} />
        <ActivityIndicator size='large' />
        <Subheading style={styles.text}>{text}</Subheading>
      </Modal>
    </Portal>
  );
};

OverlaySpinner.defaultProps = {
  onStart: VOID_FUNC
};

OverlaySpinner.propTypes = {
  run: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
  onStart: PropTypes.func
};

export default memo(OverlaySpinner);
