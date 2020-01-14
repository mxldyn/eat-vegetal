import React from 'react';
import PropTypes from 'prop-types';
import { Headline } from 'react-native-paper';

import Main from '../Main';

import styles from './styles';

const Home = ({ navigation }) => (
  <Main
    styles={{ contentContainer: styles.container }}
    navigation={navigation}
    wrapChildren
  >
    <Headline>{navigation.state.routeName}</Headline>
  </Main>
);

Home.propTypes = {
  navigation: PropTypes.object.isRequired
};

export default Home;
