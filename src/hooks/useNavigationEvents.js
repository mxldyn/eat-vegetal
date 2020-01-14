import { useEffect, useLayoutEffect, useRef } from 'react';
import { StackActions } from 'react-navigation';

import useEffectOnce from './useEffectOnce';

const useNavigationEvents = (focus, blur, navigation) => {
  const isFocusingRef = useRef(false);
  const focusRef = useRef(focus);
  const blurRef = useRef(blur);

  useLayoutEffect(() => {
    if (!isFocusingRef.current) {
      isFocusingRef.current = true;
      focusRef.current();
    }
  }, []);

  useLayoutEffect(() => {
    focusRef.current = focus;
    blurRef.current = blur;
  }, [blur, focus]);

  useEffect(() => {
    isFocusingRef.current = false;
  }, [navigation.state.routeName]);

  useEffectOnce(() => {
    const {
      state: { key, index, routes }
    } = navigation.dangerouslyGetParent();

    navigation.dispatch(
      StackActions.completeTransition({
        key,
        toChildKey: routes[index].key
      })
    );

    const handleDidFocus = () => {
      if (!isFocusingRef.current) {
        focusRef.current();
      }

      isFocusingRef.current = false;
    };

    const handleWillFocus = () => {
      if (!isFocusingRef.current) {
        isFocusingRef.current = true;
        focusRef.current();
      }
    };

    const handleWillBlur = () => {
      isFocusingRef.current = false;
      blurRef.current();
    };

    const didFocusListener = navigation.addListener('didFocus', handleDidFocus);
    const willFocusListener = navigation.addListener(
      'willFocus',
      handleWillFocus
    );
    const willBlurListener = navigation.addListener('willBlur', handleWillBlur);

    return () => {
      didFocusListener.remove();
      willFocusListener.remove();
      willBlurListener.remove();
      handleWillBlur();
    };
  });
};

export default useNavigationEvents;
