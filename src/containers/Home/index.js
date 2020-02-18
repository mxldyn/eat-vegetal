import React from 'react';
import PropTypes from 'prop-types';
import { Headline } from 'react-native-paper';

import MasonryList from '../../components/MasonryList';
import Main from '../Main';

import styles from './styles';

const Home = ({ navigation }) => (
  <Main styles={{ contentContainer: styles.container }} navigation={navigation}>
    <Headline>{navigation.state.routeName}</Headline>
    <MasonryList />
  </Main>
);

Home.propTypes = {
  navigation: PropTypes.object.isRequired
};

export default Home;
