import React from 'react';
import PropTypes from 'prop-types';

import Cover from './Cover';
import Info from './Info';
import Season from './Season';
import Pairing from './Pairing';
import Tips from './Tips';

const Body = ({ type, ...rest }) => {
  switch (type) {
    case 'cover':
      return <Cover {...rest} />;
    case 'info':
      return <Info {...rest} />;
    case 'season':
      return <Season {...rest} />;
    case 'pairing':
      return <Pairing {...rest} />;
    case 'tips':
      return <Tips {...rest} />;
    default:
      return null;
  }
};

Body.propTypes = {
  type: PropTypes.string.isRequired
};

export default Body;
