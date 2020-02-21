import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  content: StyleSheet.absoluteFill,
  image: {
    width: '100%',
    height: '100%'
  },
  progressContainer: {
    ...StyleSheet.absoluteFillObject,
    top: undefined,
    flexDirection: 'row',
    marginHorizontal: 8,
    marginVertical: 20
  },
  readMore: {
    alignSelf: 'center',
    position: 'absolute',
    bottom: 40,
    borderRadius: 25
  }
});

export default styles;
