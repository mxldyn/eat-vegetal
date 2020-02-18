import React, { memo, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Colors, Portal, Snackbar as SnackbarBase } from 'react-native-paper';
import { useSafeArea } from 'react-native-safe-area-view';
import uuidv1 from 'uuid/v1';

import { useBackHandlerEvents } from '../../hooks';
import {
  IS_IOS,
  SUPPORT_NOTCH,
  SNACKBAR_VARIANTS,
  VOID_FUNC
} from '../../config/constants';
import testID from '../../utils/testID';

import ids from './identifiers';
import styles from './styles';

const { SUCCESS, WARNING, ERROR, INFO } = SNACKBAR_VARIANTS;

const Snackbar = ({ duration, open, message, variant, onClose }) => {
  const { top, right, bottom, left } = useSafeArea();
  const notchStyle = SUPPORT_NOTCH && {
    position: 'absolute',
    top,
    right,
    bottom,
    left
  };
  const style = styles[variant];
  const key = uuidv1();

  const handleBackPress = useCallback(() => {
    if (open) {
      onClose();
    }

    return true;
  }, [onClose, open]);

  const backHandlerEvents = useBackHandlerEvents(handleBackPress);

  useEffect(
    useCallback(() => {
      if (open) {
        backHandlerEvents.add();
      } else {
        backHandlerEvents.remove();
      }
    }, [backHandlerEvents, open]),
    [open]
  );

  const componentJSX = (
    <SnackbarBase
      {...testID(`${ids.MESSAGE}_${message}`)}
      {...{ key, duration }}
      style={[styles.container, style]}
      visible={open}
      onDismiss={onClose}
      action={{
        accessibilityLabel: ids.BUTTON_CLOSE,
        label: ' X ',
        onPress: VOID_FUNC
      }}
      theme={{
        colors: {
          accent: Colors.white
        }
      }}
    >
      {message}
    </SnackbarBase>
  );

  if (IS_IOS || !SUPPORT_NOTCH) {
    return <Portal>{componentJSX}</Portal>;
  }

  return (
    <Portal>
      <View style={notchStyle}>{componentJSX}</View>
    </Portal>
  );
};

Snackbar.defaultProps = {
  duration: SnackbarBase.DURATION_SHORT
};

Snackbar.propTypes = {
  duration: PropTypes.number,
  open: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  variant: PropTypes.oneOf([SUCCESS, WARNING, ERROR, INFO, '']).isRequired,
  onClose: PropTypes.func.isRequired
};

export default memo(Snackbar);
