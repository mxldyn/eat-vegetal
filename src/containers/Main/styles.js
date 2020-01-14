import { StyleSheet } from 'react-native';

import theme from '../../theme';

const { colors } = theme;

const styles = StyleSheet.create({
  content: {
    flex: 1,
    backgroundColor: colors.background
  },
  contentContainer: {
    flexGrow: 1
  },
  contentSafeArea: {
    flex: 1,
    backgroundColor: colors.background
  }
});

export default styles;
