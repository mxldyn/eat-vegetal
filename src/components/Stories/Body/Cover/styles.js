import { StyleSheet } from 'react-native';
import { Colors } from 'react-native-paper';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginHorizontal: 20,
    marginBottom: 50
  },
  title: {
    fontSize: 40
  },
  subTitle: {
    fontSize: 25,
    color: Colors.grey200
  }
});

export default styles;
