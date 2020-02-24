import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { fetchVegetables } from '../../actions/home';
import { makeGetVegetables, makeGetStatus } from '../../selectors/home';
import { useActions } from '../../hooks';
import { MasonryList } from '../../components';
import { INITIAL_PAGE } from '../../config/constants';
import Main from '../Main';

const Home = ({ navigation }) => {
  const {
    vegetables: { data, page },
    status: { fetching, refreshing }
  } = useSelector(
    createStructuredSelector({
      vegetables: makeGetVegetables(),
      status: makeGetStatus()
    })
  );
  const { onFetchVegetables } = useActions({
    onFetchVegetables: fetchVegetables
  });

  const handleFocus = useCallback(() => {
    if (!data.length) {
      onFetchVegetables(INITIAL_PAGE);
    }
  }, [data.length, onFetchVegetables]);

  const handleLoadMore = useCallback(nextPage => onFetchVegetables(nextPage), [
    onFetchVegetables
  ]);

  const handleRefresh = useCallback(
    () => onFetchVegetables(INITIAL_PAGE, true),
    [onFetchVegetables]
  );

  const handlePressImage = useCallback(() => {}, []);

  return (
    <Main navigation={navigation} onFocus={handleFocus}>
      <MasonryList
        {...{ page, data, refreshing }}
        loading={fetching}
        onLoadMore={handleLoadMore}
        onRefresh={handleRefresh}
        onPressImage={handlePressImage}
      />
    </Main>
  );
};

Home.propTypes = {
  navigation: PropTypes.object.isRequired
};

export default Home;
