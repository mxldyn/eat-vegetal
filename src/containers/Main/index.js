import React from 'react';
import PropTypes from 'prop-types';

import { Content, SafeAreaView } from '../../components';
import { useNavigationEvents } from '../../hooks';
import { VOID_FUNC } from '../../config/constants';
import testID from '../../utils/testID';

import ids from './identifiers';
import baseStyles from './styles';

const Main = ({
  navigation: {
    state: { routeName }
  },
  styles,
  children,
  wrapChildren,
  onFocus,
  onBlur
}) => {
  const content = wrapChildren ? (
    <Content
      style={[baseStyles.content, styles.content]}
      contentContainerStyle={[
        baseStyles.contentContainer,
        styles.contentContainer
      ]}
    >
      {children}
    </Content>
  ) : (
    children
  );

  useNavigationEvents(routeName, onFocus, onBlur);

  return (
    <SafeAreaView
      {...testID(`${ids.SCREEN}_${routeName}`)}
      style={[baseStyles.contentSafeArea, styles.contentSafeArea]}
      forceInset={{ horizontal: 'always', vertical: 'never' }}
    >
      {content}
    </SafeAreaView>
  );
};

const stylesPropsTypes = PropTypes.oneOfType([
  PropTypes.array,
  PropTypes.object,
  PropTypes.number,
  PropTypes.bool
]);

Main.defaultProps = {
  styles: {
    contentSafeArea: null,
    contentContainer: null,
    content: null
  },
  children: null,
  wrapChildren: false,
  onFocus: VOID_FUNC,
  onBlur: VOID_FUNC
};

Main.propTypes = {
  navigation: PropTypes.object.isRequired,
  styles: PropTypes.shape({
    contentSafeArea: stylesPropsTypes,
    contentContainer: stylesPropsTypes,
    content: stylesPropsTypes
  }),
  wrapChildren: PropTypes.bool,
  children: PropTypes.node,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func
};

export default Main;
