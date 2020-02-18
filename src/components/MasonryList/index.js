import React from 'react';
import RNMasonryList from 'react-native-masonry-list';

import imgs from './data';

const MasonryList = () => <RNMasonryList images={imgs} numColumns={2} />;

export default MasonryList;
