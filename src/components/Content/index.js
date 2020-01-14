import React, { createRef, forwardRef, useCallback, useRef } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { IS_IOS } from '../../config/constants';

const Content = forwardRef((props, ref) => {
  const _ref = ref || createRef();
  const _cantResetScrollToEndRef = useRef(false);
  const _isScrollEndRef = useRef(false);

  const handleKeyboardDidShow = useCallback(() => {
    _cantResetScrollToEndRef.current = true;
  }, []);

  const handleKeyboardDidHide = useCallback(() => {
    if (!_cantResetScrollToEndRef.current || !_isScrollEndRef.current) {
      return;
    }

    _cantResetScrollToEndRef.current = false;
    _ref.current.scrollToEnd(false);
  }, [_ref]);

  const handleScroll = useCallback(
    ({ nativeEvent: { layoutMeasurement, contentOffset, contentSize } }) => {
      _isScrollEndRef.current =
        layoutMeasurement.height + contentOffset.y >= contentSize.height - 1;
    },
    []
  );

  return (
    <KeyboardAwareScrollView
      ref={_ref}
      automaticallyAdjustContentInsets={false}
      enableResetScrollToCoords={false}
      resetScrollToCoords={null}
      onKeyboardDidShow={handleKeyboardDidShow}
      onKeyboardDidHide={handleKeyboardDidHide}
      onScroll={handleScroll}
      {...props}
    />
  );
});

Content.displayName = 'Content';

const ContentComponent = IS_IOS ? Content : KeyboardAwareScrollView;

export default ContentComponent;
