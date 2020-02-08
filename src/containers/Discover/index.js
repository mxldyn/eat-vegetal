import React from 'react';
import PropTypes from 'prop-types';

import { Camera } from '../../components';
import Main from '../Main';

const Discover = ({ navigation }) => (
  <Main navigation={navigation}>
    <Camera title='Descubrir Vegetales' />
  </Main>
);

Discover.propTypes = {
  navigation: PropTypes.object.isRequired
};

export default Discover;
