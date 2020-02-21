import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 20,
    flexDirection: 'row',
    alignItems: 'center'
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginLeft: 8
  },
  name: {
    flex: 1,
    fontSize: 18,
    marginHorizontal: 12
  }
});

export default styles;
