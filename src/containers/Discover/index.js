import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

import { Camera } from '../../components';
import Main from '../Main';

import { CAMERA_TITLE_MSG } from './messages';

const Discover = ({ navigation }) => {
  const handleTakePicture = useCallback(() => {}, []);

  return (
    <Main navigation={navigation}>
      <Camera title={CAMERA_TITLE_MSG} onTakePicture={handleTakePicture} />
    </Main>
  );
};

Discover.propTypes = {
  navigation: PropTypes.object.isRequired
};

export default Discover;
