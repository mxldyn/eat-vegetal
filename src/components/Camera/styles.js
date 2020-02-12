import { StyleSheet } from 'react-native';
import { Colors } from 'react-native-paper';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  title: {
    textAlign: 'center',
    padding: 30,
    fontSize: 30,
    color: Colors.white
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-end'
  }
});

export default styles;
