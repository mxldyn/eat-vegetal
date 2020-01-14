import { StyleSheet } from 'react-native';

import theme from '../../theme';

const { colors } = theme;

const styles = StyleSheet.create({
  surface: {
    elevation: 8
  },
  safeArea: {
    backgroundColor: colors.primary
  },
  navigation: {
    flex: 0
  }
});

export default styles;
