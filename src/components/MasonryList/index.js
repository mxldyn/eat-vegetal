import React, { memo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { ActivityIndicator, useTheme } from 'react-native-paper';
import RNMasonryList from 'react-native-masonry-list';

import Item from './Item';
import styles from './styles';

const MasonryList = ({
  page,
  data,
  refreshing,
  loading,
  onLoadMore,
  threshold,
  onPressImage,
  ...rest
}) => {
  const { colors } = useTheme();

  const handleEndReached = useCallback(() => {
    if (loading || refreshing) {
      return;
    }

    const nextPage = page + 1;

    onLoadMore(nextPage);
  }, [loading, onLoadMore, page, refreshing]);

  const renderItem = useCallback(
    props => <Item {...props} onPress={onPressImage} />,
    [onPressImage]
  );

  const renderListFooter = useCallback(
    () =>
      !refreshing &&
      (loading ? (
        <ActivityIndicator
          style={styles.listFooter}
          color={loading ? colors.primary : colors.transparent}
          size={30}
        />
      ) : (
        <View style={styles.listFooterOff} />
      )),
    [colors.primary, colors.transparent, loading, refreshing]
  );

  return (
    <RNMasonryList
      images={data}
      refreshing={refreshing}
      completeCustomComponent={renderItem}
      onEndReached={handleEndReached}
      onEndReachedThreshold={threshold}
      masonryFlatListColProps={{ ListFooterComponent: renderListFooter }}
      {...rest}
    />
  );
};

MasonryList.defaultProps = {
  refreshing: undefined,
  threshold: 0.3,
  page: 1
};

MasonryList.propTypes = {
  page: PropTypes.number,
  data: PropTypes.array.isRequired,
  refreshing: PropTypes.bool,
  loading: PropTypes.bool.isRequired,
  onLoadMore: PropTypes.func.isRequired,
  threshold: PropTypes.number,
  onPressImage: PropTypes.func.isRequired
};

export default memo(MasonryList);
