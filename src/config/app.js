import { FlatList, ScrollView } from 'react-native';
import 'moment/locale/es';

if (FlatList.defaultProps) {
  FlatList.defaultProps.automaticallyAdjustContentInsets = false;
  FlatList.defaultProps.keyboardShouldPersistTaps = 'handled';
} else {
  FlatList.defaultProps = {
    automaticallyAdjustContentInsets: false,
    keyboardShouldPersistTaps: 'handled'
  };
}

if (ScrollView.defaultProps) {
  ScrollView.defaultProps.automaticallyAdjustContentInsets = false;
  ScrollView.defaultProps.keyboardShouldPersistTaps = 'handled';
} else {
  ScrollView.defaultProps = {
    automaticallyAdjustContentInsets: false,
    keyboardShouldPersistTaps: 'handled'
  };
}
