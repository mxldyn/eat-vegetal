import { StyleSheet } from 'react-native';

import { SNACKBAR_VARIANTS } from '../../config/constants';
import theme from '../../theme';

const { SUCCESS, WARNING, ERROR, INFO } = SNACKBAR_VARIANTS;
const { colors } = theme;

const styles = StyleSheet.create({
  container: {
    marginBottom: 65
  },
  [SUCCESS]: {
    backgroundColor: colors.success
  },
  [WARNING]: {
    backgroundColor: colors.warning
  },
  [ERROR]: {
    backgroundColor: colors.error
  },
  [INFO]: {
    backgroundColor: colors.info
  }
});

export default styles;
