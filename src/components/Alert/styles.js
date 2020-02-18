import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  center: {
    alignSelf: 'center',
    textAlign: 'center'
  },
  icon: {
    marginTop: 30,
    marginHorizontal: 24
  },
  titleIcon: {
    marginTop: 10
  },
  title: {
    marginTop: 30
  },
  content: {
    paddingHorizontal: 0,
    paddingBottom: 6
  },
  contentScroll: {
    paddingHorizontal: 24
  },
  actions: {
    marginBottom: 5
  },
  actionsScroll: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  button: {
    padding: 5
  }
});

export default styles;
