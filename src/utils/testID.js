import { Platform } from 'react-native';

const testID = id =>
  Platform.select({
    android: { accessible: true, accessibilityLabel: id },
    ios: { testID: id }
  });

export default testID;
