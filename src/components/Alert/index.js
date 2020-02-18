import React, { memo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { ScrollView } from 'react-native';
import {
  Button,
  Dialog,
  Paragraph,
  Portal,
  useTheme
} from 'react-native-paper';

import { useWindowDimensions } from '../../hooks';
import { OK_MSG } from '../../config/messages';
import { isString } from '../../utils/is';
import { Icon } from '../../utils/icon';
import testID from '../../utils/testID';

import ids from './identifiers';
import styles from './styles';
import { getDimensionsStyles } from './utils';

const Alert = ({
  dismissable,
  center,
  icon,
  open,
  title,
  content,
  actions,
  onClose
}) => {
  const { colors } = useTheme();
  const dimensions = useWindowDimensions();

  const renderActions = useCallback(
    ({ style, testId, text, onPress }, key) => (
      <Button
        {...testID(testId)}
        {...{ key, onPress }}
        style={[styles.button, style]}
        uppercase
      >
        {text}
      </Button>
    ),
    []
  );

  const actionButtons = actions.length
    ? actions
    : [{ testId: ids.BUTTON_OK, text: OK_MSG, onPress: onClose }];
  const dimensionsStyles = getDimensionsStyles(dimensions);
  const centerStyle = center && styles.center;

  const iconJSX = !!icon && (
    <Icon
      style={[styles.icon, centerStyle]}
      color={colors.primary}
      size={50}
      {...(isString(icon) ? { name: icon } : icon)}
    />
  );

  const titleIconStyle = iconJSX && styles.titleIcon;
  const dialogTitleJSX = !!title && (
    <Dialog.Title
      style={[
        styles.title,
        dimensionsStyles.title,
        titleIconStyle,
        centerStyle
      ]}
      ellipsizeMode='tail'
      numberOfLines={2}
    >
      {title}
    </Dialog.Title>
  );

  const dialogContentJSX = (
    <Dialog.Content style={[styles.content, dimensionsStyles.content]}>
      <ScrollView contentContainerStyle={styles.contentScroll}>
        <Paragraph style={centerStyle}>{content}</Paragraph>
      </ScrollView>
    </Dialog.Content>
  );

  const dialogActionsJSX = (
    <Dialog.Actions style={[styles.actions, dimensionsStyles.actions]}>
      <ScrollView contentContainerStyle={[styles.actionsScroll, centerStyle]}>
        {actionButtons.map(renderActions)}
      </ScrollView>
    </Dialog.Actions>
  );

  return (
    <Portal>
      <Dialog
        style={dimensionsStyles.dialog}
        dismissable={dismissable}
        visible={open}
        onDismiss={onClose}
      >
        {iconJSX}
        {dialogTitleJSX}
        {dialogContentJSX}
        {dialogActionsJSX}
      </Dialog>
    </Portal>
  );
};

Alert.defaultProps = {
  dismissable: true,
  center: false,
  icon: null,
  title: '',
  content: '',
  actions: []
};

Alert.propTypes = {
  dismissable: PropTypes.bool,
  center: PropTypes.bool,
  icon: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  open: PropTypes.bool.isRequired,
  title: PropTypes.string,
  content: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      style: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.object,
        PropTypes.number
      ]),
      testId: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      onPress: PropTypes.func.isRequired
    })
  ),
  onClose: PropTypes.func.isRequired
};

export default memo(Alert);
