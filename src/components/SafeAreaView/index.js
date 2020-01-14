import React, { forwardRef } from 'react';
import RNSafeAreaView from 'react-native-safe-area-view';

import { SUPPORT_NOTCH } from '../../config/constants';

const SafeAreaViewDisabled = forwardRef((props, ref) => (
  <RNSafeAreaView
    {...props}
    ref={ref}
    forceInset={{ horizontal: 'never', vertical: 'never' }}
  />
));

SafeAreaViewDisabled.displayName = 'SafeAreaView';

const SafeAreaView = SUPPORT_NOTCH ? RNSafeAreaView : SafeAreaViewDisabled;

export default SafeAreaView;
