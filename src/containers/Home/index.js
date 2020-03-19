import React, { useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { ActivityIndicator } from 'react-native-paper';

import {
  clearVegetal,
  fetchVegetal,
  fetchVegetables
} from '../../actions/home';
import {
  makeGetVegetal,
  makeGetVegetables,
  makeGetStatus
} from '../../selectors/home';
import { useActions } from '../../hooks';
import { BottomSheet, MasonryList, Stories } from '../../components';
import { INITIAL_PAGE } from '../../config/constants';
import Main from '../Main';

import styles from './styles';

const Home = ({ navigation }) => {
  const {
    vegetal,
    vegetables: { data, page },
    status: { fetching, refreshing, fetchingId }
  } = useSelector(
    createStructuredSelector({
      vegetal: makeGetVegetal(),
      vegetables: makeGetVegetables(),
      status: makeGetStatus()
    })
  );

  const { onClearVegetal, onFetchVegetal, onFetchVegetables } = useActions({
    onClearVegetal: clearVegetal,
    onFetchVegetal: fetchVegetal,
    onFetchVegetables: fetchVegetables
  });
  const _bottomSheetRef = useRef();

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

  const handlePressImage = useCallback(
    ({ id }) => {
      onFetchVegetal(id);
      _bottomSheetRef.current.show();
    },
    [onFetchVegetal]
  );

  const handleClose = useCallback(() => _bottomSheetRef.current.hide(), []);

  const handleReadMore = useCallback(() => {}, []);

  return (
    <Main navigation={navigation} onFocus={handleFocus}>
      <MasonryList
        {...{ page, data, refreshing }}
        loading={fetching}
        onLoadMore={handleLoadMore}
        onRefresh={handleRefresh}
        onPressImage={handlePressImage}
      />
      <BottomSheet
        style={styles.storiesContainer}
        ref={_bottomSheetRef}
        fullHeight
        onHide={onClearVegetal}
      >
        {fetchingId ? (
          <ActivityIndicator />
        ) : (
          <Stories
            {...vegetal}
            onClose={handleClose}
            onReadMore={handleReadMore}
          />
        )}
      </BottomSheet>
    </Main>
  );
};

Home.propTypes = {
  navigation: PropTypes.object.isRequired
};

export default Home;
