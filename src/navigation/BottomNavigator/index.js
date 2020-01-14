import React, { memo, useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { BottomNavigation, Surface } from 'react-native-paper';

import { SafeAreaView } from '../../components';
import { IS_IOS } from '../../config/constants';

import styles from './styles';
import { getState, isLocked } from './utils';

const BottomNavigator = ({ nav, onNavigate }) => {
  const [navigationState, setNavigationState] = useState(getState(nav));

  const handleIndexChange = useCallback(
    index =>
      onNavigate({
        routeName: navigationState.routes[index].key
      }),
    [navigationState.routes, onNavigate]
  );

  const renderScene = useCallback(() => null, []);

  useEffect(
    useCallback(() => {
      const nextState = getState(nav);

      if (nextState.index !== navigationState.index) {
        setNavigationState(nextState);
      }
    }, [nav, navigationState.index]),
    [nav]
  );

  if (isLocked(nav)) {
    return null;
  }

  if (IS_IOS) {
    return (
      <Surface style={styles.surface}>
        <BottomNavigation
          style={styles.navigation}
          navigationState={navigationState}
          onIndexChange={handleIndexChange}
          renderScene={renderScene}
        />
      </Surface>
    );
  }

  return (
    <Surface style={styles.surface}>
      <SafeAreaView
        style={styles.safeArea}
        forceInset={{ top: 'never', bottom: 'always', horizontal: 'always' }}
      >
        <BottomNavigation
          style={styles.navigation}
          navigationState={navigationState}
          onIndexChange={handleIndexChange}
          renderScene={renderScene}
        />
      </SafeAreaView>
    </Surface>
  );
};

BottomNavigator.propTypes = {
  nav: PropTypes.object.isRequired,
  onNavigate: PropTypes.func.isRequired
};

export default memo(BottomNavigator);
