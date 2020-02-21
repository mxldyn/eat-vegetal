import { StyleSheet } from 'react-native';
import { Colors } from 'react-native-paper';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 4,
    margin: 2,
    backgroundColor: Colors.grey700
  },
  content: {
    height: 4
  },
  activeContent: {
    backgroundColor: Colors.white
  }
});

export default styles;
