import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Text } from 'react-native-paper';

import { ORIGIN_MSG, VARIETIES_MSG, HARVEST_PLACE_MSG } from '../messages';

import styles from './styles';

const Info = ({ originText, varietiesText, harvestPlaceText, fontSize }) => (
  <View style={styles.container}>
    <Text>
      <Text style={[styles.text, { fontSize }]}>{`${ORIGIN_MSG}: `}</Text>
      <Text style={[styles.text, { fontSize }]}>{originText}</Text>
    </Text>
    <Text>
      <Text style={[styles.text, { fontSize }]}>{`${VARIETIES_MSG}: `}</Text>
      <Text style={[styles.text, { fontSize }]}>{varietiesText}</Text>
    </Text>
    <Text>
      <Text
        style={[styles.text, { fontSize }]}
      >{`${HARVEST_PLACE_MSG}: `}</Text>
      <Text style={[styles.text, { fontSize }]}>{harvestPlaceText}</Text>
    </Text>
  </View>
);

Info.propTypes = {
  originText: PropTypes.string.isRequired,
  varietiesText: PropTypes.string.isRequired,
  harvestPlaceText: PropTypes.string.isRequired,
  fontSize: PropTypes.number.isRequired
};

export default memo(Info);
