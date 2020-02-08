import { StyleSheet } from 'react-native';

const white = '#fff';

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  camera: {
    flex: 1
  },
  title: {
    position: 'absolute',
    alignSelf: 'center',
    padding: 30,
    fontSize: 30,
    color: white
  },
  shotTouchable: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: '7%'
  },
  shotButton: {
    color: white,
    fontSize: 20,
    borderColor: white
  }
});

export default styles;
