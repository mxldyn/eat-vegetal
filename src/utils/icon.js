import React, { memo } from 'react';
import PropTypes from 'prop-types';
// eslint-disable-next-line no-unused-vars
import { ViewStyle } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Foundation from 'react-native-vector-icons/Foundation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Zocial from 'react-native-vector-icons/Zocial';

const ICONS = [
  {
    type: 'AntDesign',
    icon: AntDesign
  },
  {
    type: 'Entypo',
    icon: Entypo
  },
  {
    type: 'EvilIcons',
    icon: EvilIcons
  },
  {
    type: 'Feather',
    icon: Feather
  },
  {
    type: 'FontAwesome',
    icon: FontAwesome
  },
  {
    type: 'FontAwesome5',
    icon: FontAwesome5
  },
  {
    type: 'Fontisto',
    icon: Fontisto
  },
  {
    type: 'Foundation',
    icon: Foundation
  },
  {
    type: 'Ionicons',
    icon: Ionicons
  },
  {
    type: 'MaterialCommunityIcons',
    icon: MaterialCommunityIcons
  },
  {
    type: 'MaterialIcons',
    icon: MaterialIcons
  },
  {
    type: 'Octicons',
    icon: Octicons
  },
  {
    type: 'SimpleLineIcons',
    icon: SimpleLineIcons
  },
  {
    type: 'Zocial',
    icon: Zocial
  }
];

const getIcon = type => ICONS.find(i => i.type === type).icon;

/**
 * @param {'AntDesign'|'Entypo'|'EvilIcons'|'Feather'|'FontAwesome'|'FontAwesome5'|'Fontisto'|'Foundation'|'Ionicons'|'MaterialCommunityIcons'|'MaterialIcons'|'Octicons'|'SimpleLineIcons'|'Zocial'} type
 * @param {{color: string, name: string, size: number, style: ViewStyle}} baseProps
 */
const icon = (type, baseProps = {}) => {
  const Component = getIcon(type);
  const CustomIcon = props => <Component {...props} {...baseProps} />;

  return CustomIcon;
};

const CustomIcon = ({ type, ...rest }) => {
  const Component = getIcon(type);

  return <Component {...rest} />;
};

CustomIcon.defaultProps = {
  type: 'MaterialCommunityIcons',
  color: undefined,
  size: undefined,
  style: undefined
};

CustomIcon.propTypes = {
  type: PropTypes.oneOf([
    'AntDesign',
    'Entypo',
    'EvilIcons',
    'Feather',
    'FontAwesome',
    'FontAwesome5',
    'Fontisto',
    'Foundation',
    'Ionicons',
    'MaterialCommunityIcons',
    'MaterialIcons',
    'Octicons',
    'SimpleLineIcons',
    'Zocial'
  ]),
  name: PropTypes.string.isRequired,
  color: PropTypes.string,
  size: PropTypes.number,
  style: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
    PropTypes.number,
    PropTypes.bool
  ])
};

export const Icon = memo(CustomIcon);
export default icon;
