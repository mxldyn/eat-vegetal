const ANIMATION_DURATION = 250;
const DEFAULT_PER_HEIGHT = 0.8;
const FULL_PER_HEIGHT = 1;
const HIDE_EXTRA_HEIGHT = 50;
const SHOW_TIMEOUT = 50;

const getContentStyles = (
  style,
  translateY,
  height,
  flexStyle,
  fixed,
  fullHeight
) => [
  [
    style,
    { transform: [{ translateY }] },
    { flex: fullHeight ? 1 : flexStyle },
    !fullHeight && (fixed ? { height } : { maxHeight: height })
  ]
];

const getHeight = (height, perHeight) => height * perHeight;

export {
  ANIMATION_DURATION,
  DEFAULT_PER_HEIGHT,
  FULL_PER_HEIGHT,
  HIDE_EXTRA_HEIGHT,
  SHOW_TIMEOUT,
  getContentStyles,
  getHeight
};
