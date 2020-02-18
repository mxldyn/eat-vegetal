import React from 'react';
import PropTypes from 'prop-types';

import { uploadImage } from '../../actions/discover';
import { Camera } from '../../components';
import { useActions } from '../../hooks';
import Main from '../Main';

import { CAMERA_TITLE_MSG } from './messages';

const Discover = ({ navigation }) => {
  const { onUploadImage } = useActions({
    onUploadImage: uploadImage
  });

  return (
    <Main navigation={navigation}>
      <Camera title={CAMERA_TITLE_MSG} onTakePicture={onUploadImage} />
    </Main>
  );
};

Discover.propTypes = {
  navigation: PropTypes.object.isRequired
};

export default Discover;
