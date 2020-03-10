import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import {
  TouchableWithoutFeedback,
  View,
  useWindowDimensions
} from 'react-native';
import { Button, Colors } from 'react-native-paper';
import Animated, { Easing } from 'react-native-reanimated';
import FastImage from 'react-native-fast-image';

import { usePrevious } from '../../hooks';
import { READ_MORE_MSG } from '../../config/messages';

import Body from './Body';
import Header from './Header';
import ProgressBar from './ProgressBar';
import styles from './styles';

const Stories = ({
  textColor,
  backgroundColor,
  name,
  iconImage,
  pages,
  onClose,
  onReadMore
}) => {
  const dimensions = useWindowDimensions();
  const _opacityRef = useRef(new Animated.Value(1));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [pause, setPause] = useState(false);
  const prevCurrentIndex = usePrevious(currentIndex);

  const handleNext = useCallback(() => {
    if (prevCurrentIndex + 1 >= pages.length) {
      return;
    }

    setCurrentIndex(i => i + 1);
    setLoaded(false);
  }, [pages.length, prevCurrentIndex]);

  const handlePrevious = useCallback(() => {
    if (prevCurrentIndex <= 0) {
      return;
    }

    setCurrentIndex(i => i - 1);
    setLoaded(false);
  }, [prevCurrentIndex]);

  const handleChange = useCallback(
    ({ nativeEvent: { locationX } }) =>
      locationX > dimensions.width / 2 ? handleNext() : handlePrevious(),
    [dimensions.width, handleNext, handlePrevious]
  );

  const handleChangePause = useCallback(value => () => setPause(value), []);

  const handleLoaded = useCallback(() => setLoaded(true), []);

  const currentPage = pages[currentIndex] || {};
  const currentImage = currentPage.image;
  const isLasStory = currentIndex + 1 >= pages.length;

  const renderProgressBar = useCallback(
    ({ delay }, index) => (
      <ProgressBar
        {...{ index, currentIndex, delay, pause }}
        key={`${index}`}
        loaded={!currentImage || loaded || true}
        onNext={handleNext}
      />
    ),
    [currentImage, currentIndex, handleNext, loaded, pause]
  );

  useEffect(() => {
    Animated.timing(_opacityRef.current, {
      toValue: pause ? 0 : 1,
      duration: 300,
      easing: Easing.ease
    }).start();
  }, [pause]);

  return (
    <TouchableWithoutFeedback
      delayLongPress={500}
      onPress={handleChange}
      onLongPress={handleChangePause(true)}
      onPressOut={handleChangePause(false)}
    >
      <View style={[styles.container, { backgroundColor }]}>
        <FastImage
          style={styles.image}
          source={{ uri: currentImage }}
          onLoadEnd={handleLoaded}
          resizeMode='contain'
        />
        <Animated.View
          style={[styles.content, { opacity: _opacityRef.current }]}
        >
          <Header
            name={name}
            uri={iconImage}
            color={textColor}
            onClose={onClose}
          />
          <Body {...currentPage} {...{ name, textColor }} />
          {!!isLasStory && (
            <Button
              style={styles.readMore}
              mode='contained'
              onPress={onReadMore}
            >
              {READ_MORE_MSG}
            </Button>
          )}
          <View style={styles.progressContainer}>
            {pages.map(renderProgressBar)}
          </View>
        </Animated.View>
      </View>
    </TouchableWithoutFeedback>
  );
};

Stories.defaultProps = {
  textColor: Colors.white,
  backgroundColor: Colors.black
};

Stories.propTypes = {
  textColor: PropTypes.string,
  backgroundColor: PropTypes.string,
  name: PropTypes.string.isRequired,
  iconImage: PropTypes.string.isRequired,
  pages: PropTypes.array.isRequired,
  onClose: PropTypes.func.isRequired,
  onReadMore: PropTypes.func.isRequired
};

export default memo(Stories);
