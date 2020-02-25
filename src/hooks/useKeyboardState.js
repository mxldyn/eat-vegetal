import { useState } from 'react';
import { Keyboard } from 'react-native';

import { IS_IOS } from '../config/constants';

import useEffectOnce from './useEffectOnce';

const useKeyboardState = () => {
  const [state, setState] = useState({
    isKeyboardShow: false,
    startCoordinates: undefined,
    endCoordinates: undefined
  });

  useEffectOnce(() => {
    const handleKeyboardShow = ({ startCoordinates, endCoordinates }) =>
      setState({
        isKeyboardShow: true,
        startCoordinates,
        endCoordinates
      });

    const handleKeyboardHide = ({ startCoordinates, endCoordinates }) =>
      setState({
        isKeyboardShow: false,
        startCoordinates,
        endCoordinates
      });

    const keyboardShowListener = Keyboard.addListener(
      IS_IOS ? 'keyboardWillShow' : 'keyboardDidShow',
      handleKeyboardShow
    );
    const keyboardHideListener = Keyboard.addListener(
      IS_IOS ? 'keyboardWillHide' : 'keyboardDidHide',
      handleKeyboardHide
    );

    return () => {
      keyboardShowListener.remove();
      keyboardHideListener.remove();
    };
  });

  return state;
};

export default useKeyboardState;
