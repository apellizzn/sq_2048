import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
  cell: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#d6d7da',
    height: '100%',
    width: '100%',
    borderWidth: 5,
    borderColor: '#333333'
  },
  cellText: {
    fontSize: 36,
  },
  rowMargin: {
    margin: 1,
  },
  colMargin: {
    margin: 1
  }
});
export default styles;
