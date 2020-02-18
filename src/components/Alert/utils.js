import { StyleSheet } from 'react-native';

const MAX_WIDTH = 500;
const PER_WIDTH = 0.8;
const MAX_PER_HEIGHT_TITLE = 0.2;
const MAX_PER_HEIGHT_CONTENT = 0.5;
const MAX_PER_HEIGHT_ACTIONS = 0.2;

const getDimensionsStyles = ({ height, minSize }, showOverflow = false) => {
  const overflow = showOverflow ? 'visible' : 'hidden';
  const calcWidth = minSize * PER_WIDTH;
  const dialog = {
    alignSelf: 'center',
    width: calcWidth > MAX_WIDTH ? MAX_WIDTH : calcWidth
  };
  const title = {
    maxHeight: height * MAX_PER_HEIGHT_TITLE,
    overflow
  };
  const content = {
    maxHeight: height * MAX_PER_HEIGHT_CONTENT,
    overflow
  };
  const actions = {
    maxHeight: height * MAX_PER_HEIGHT_ACTIONS,
    overflow
  };

  return StyleSheet.create({ dialog, title, content, actions });
};

export { getDimensionsStyles };
