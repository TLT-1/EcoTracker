import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      backgroundColor: 'transparent',
    },
    titleScreen: {
      position: 'absolute',
      alignItems: 'center',
      justifyContent: 'flex-start',
      width: '100%',
      height: '100%',
    },
    titleScreenImage: {
      flex: 1,
      width: '100%',
      height: '100%',
    },
    logo: {
        position: 'absolute',
        width: 500,
        height: 500,
        resizeMode: 'contain',
    },
});

export default styles;
