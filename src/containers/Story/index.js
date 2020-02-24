import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { ActivityIndicator } from 'react-native-paper';

import { makeGetVegetal, makeGetStatus } from '../../selectors/home';
import { Stories } from '../../components';
import Main from '../Main';

const Story = ({ navigation }) => {
  const {
    vegetal,
    status: { fetchingId }
  } = useSelector(
    createStructuredSelector({
      vegetal: makeGetVegetal(),
      status: makeGetStatus()
    })
  );

  return (
    <Main navigation={navigation}>
      {fetchingId ? (
        <ActivityIndicator />
      ) : (
        <Stories {...vegetal} textColor='white' backgroundColor='black' />
      )}
    </Main>
  );
};

Story.propTypes = {
  navigation: PropTypes.object.isRequired
};

export default Story;
