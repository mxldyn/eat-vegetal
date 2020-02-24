import { StyleSheet } from 'react-native';

import theme from '../../theme';

const { colors } = theme;

const styles = StyleSheet.create({
  surface: {
    elevation: 8
  },
  safeArea: {
    backgroundColor: colors.surface
  },
  navigation: {
    flex: 0
  },
  bar: {
    backgroundColor: colors.surface
  }
});

export default styles;
