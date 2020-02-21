import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Animated, Easing, View } from 'react-native';

import styles from './styles';
import { getDuration } from './utils';

const ProgressBar = ({ index, currentIndex, delay, loaded, pause, onNext }) => {
  const _scaleRef = useRef(new Animated.Value(0));
  const [pauseTime, setPauseTime] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [width, setWidth] = useState(0);

  const handleLayout = useCallback(
    ({ nativeEvent: { layout } }) => setWidth(layout.width),
    []
  );

  useEffect(() => {
    if (loaded && index === currentIndex) {
      Animated.timing(_scaleRef.current, {
        toValue: width,
        duration: getDuration(delay, pause, pauseTime, startTime),
        easing: Easing.linear
      }).start(({ finished }) => finished && onNext());
    } else {
      _scaleRef.current.setValue(index < currentIndex ? width : 0);
    }
  });

  useEffect(
    useCallback(() => {
      if (index !== currentIndex) {
        return;
      }

      const endTime = Date.now();

      if (pause) {
        setPauseTime(endTime);
      }

      if (!startTime) {
        setStartTime(endTime);
      }
    }, [currentIndex, index, pause, startTime]),
    [pause]
  );

  return (
    <View style={styles.container} onLayout={handleLayout}>
      <Animated.View
        style={[
          styles.content,
          index <= currentIndex && styles.activeContent,
          { width: _scaleRef.current }
        ]}
      />
    </View>
  );
};

ProgressBar.propTypes = {
  index: PropTypes.number.isRequired,
  currentIndex: PropTypes.number.isRequired,
  delay: PropTypes.number.isRequired,
  loaded: PropTypes.bool.isRequired,
  pause: PropTypes.bool.isRequired,
  onNext: PropTypes.func.isRequired
};

export default memo(ProgressBar);
