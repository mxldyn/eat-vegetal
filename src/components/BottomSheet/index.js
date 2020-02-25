import React, {
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState
} from 'react';
import PropTypes from 'prop-types';
import { Keyboard, TouchableWithoutFeedback, View } from 'react-native';
import Animated, { Easing } from 'react-native-reanimated';
import { Modal, Portal } from 'react-native-paper';

import {
  useBackHandlerEvents,
  useKeyboardState,
  useRefMounted,
  useWindowDimensions
} from '../../hooks';
import { VOID_FUNC } from '../../config/constants';
import testID from '../../utils/testID';

import ids from './identifiers';
import styles from './styles';
import {
  ANIMATION_DURATION,
  DEFAULT_PER_HEIGHT,
  FULL_PER_HEIGHT,
  HIDE_EXTRA_HEIGHT,
  SHOW_TIMEOUT,
  getContentStyles,
  getHeight
} from './utils';

const BottomSheet = forwardRef(
  (
    {
      children,
      style,
      fixed,
      fullHeight,
      dismissable,
      perHeight,
      onChangeSheetHeight,
      onShow,
      onHide
    },
    ref
  ) => {
    const dimensions = useWindowDimensions();
    const _mountedRef = useRefMounted();
    const _backPressEventRef = useRef({
      add: VOID_FUNC,
      remove: VOID_FUNC
    });
    const _translateYRef = useRef(new Animated.Value(dimensions.maxSize));
    const _isTransitioningRef = useRef(false);
    const [open, setOpen] = useState(false);
    const [flexStyle, setFlexStyle] = useState(0);
    const [height, setHeight] = useState(
      getHeight(dimensions.height, fullHeight ? FULL_PER_HEIGHT : perHeight)
    );
    const { isKeyboardShow } = useKeyboardState();

    const showSheet = useCallback(
      () =>
        Animated.timing(_translateYRef.current, {
          toValue: 0,
          duration: ANIMATION_DURATION,
          easing: Easing.out(Easing.ease)
        }).start(data => {
          _backPressEventRef.current.add();
          _isTransitioningRef.current = false;
          onShow(data);
        }),
      [onShow]
    );

    const hideSheet = useCallback(
      () =>
        Animated.timing(_translateYRef.current, {
          toValue: height + HIDE_EXTRA_HEIGHT,
          duration: ANIMATION_DURATION,
          easing: Easing.ease
        }).start(data => {
          if (!_mountedRef.current) {
            return;
          }

          _backPressEventRef.current.remove();
          _isTransitioningRef.current = false;
          setOpen(false);
          onHide(data);
        }),
      [_mountedRef, height, onHide]
    );

    const show = useCallback(() => {
      if (!_mountedRef.current || _isTransitioningRef.current) {
        return;
      }

      _isTransitioningRef.current = true;
      Keyboard.dismiss();
      setOpen(true);
      setTimeout(showSheet, SHOW_TIMEOUT);
    }, [_mountedRef, showSheet]);

    const hide = useCallback(() => {
      if (!_mountedRef.current || _isTransitioningRef.current) {
        return;
      }

      _isTransitioningRef.current = true;
      Keyboard.dismiss();
      hideSheet();
    }, [_mountedRef, hideSheet]);

    const handleOverlayPress = useCallback(() => {
      if (dismissable) {
        hide();
      }
    }, [dismissable, hide]);

    const handleBackPress = useCallback(() => {
      if (dismissable) {
        hide();
      }

      return dismissable;
    }, [dismissable, hide]);

    const backHandlerEvents = useBackHandlerEvents(handleBackPress);

    _backPressEventRef.current = {
      add: backHandlerEvents.add,
      remove: backHandlerEvents.remove
    };

    useEffect(
      useCallback(() => {
        const newFlexStyle = isKeyboardShow ? 1 : 0;

        if (_mountedRef.current && !fullHeight && newFlexStyle !== flexStyle) {
          setFlexStyle(newFlexStyle);
        }
      }, [_mountedRef, flexStyle, fullHeight, isKeyboardShow]),
      [isKeyboardShow]
    );

    useEffect(
      useCallback(() => {
        onChangeSheetHeight(height);
      }, [height, onChangeSheetHeight]),
      [height]
    );

    useEffect(() => {
      const newHeight = getHeight(dimensions.height, perHeight);

      if (_mountedRef.current && !fullHeight && newHeight !== height) {
        setHeight(newHeight);
      }
    }, [_mountedRef, dimensions.height, fullHeight, height, perHeight]);

    useImperativeHandle(ref, () => ({
      show,
      hide
    }));

    const overlayJSX = (
      <TouchableWithoutFeedback
        {...testID(ids.TOUCH_OVERLAY)}
        onPress={handleOverlayPress}
      >
        <View style={styles.overlay} />
      </TouchableWithoutFeedback>
    );

    const contentStyles = getContentStyles(
      style,
      _translateYRef.current,
      height,
      flexStyle,
      fixed,
      fullHeight
    );
    const contentJSX = (
      <Animated.View style={contentStyles}>{children}</Animated.View>
    );

    return (
      <Portal>
        <Modal
          contentContainerStyle={styles.modal}
          visible={open}
          dismissable={false}
          wrapInSafeArea={false}
        >
          {overlayJSX}
          {contentJSX}
        </Modal>
      </Portal>
    );
  }
);

BottomSheet.displayName = 'BottomSheet';

BottomSheet.defaultProps = {
  style: null,
  fixed: false,
  fullHeight: false,
  dismissable: true,
  perHeight: DEFAULT_PER_HEIGHT,
  onChangeSheetHeight: VOID_FUNC,
  onShow: VOID_FUNC,
  onHide: VOID_FUNC
};

BottomSheet.propTypes = {
  children: PropTypes.node.isRequired,
  style: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
    PropTypes.number,
    PropTypes.bool
  ]),
  fixed: PropTypes.bool,
  fullHeight: PropTypes.bool,
  dismissable: PropTypes.bool,
  perHeight: PropTypes.number,
  onChangeSheetHeight: PropTypes.func,
  onShow: PropTypes.func,
  onHide: PropTypes.func
};

export default memo(BottomSheet);
