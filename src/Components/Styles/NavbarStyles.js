// NavbarStyles.js
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    navbar: {
        backgroundColor: '#062a52',
        position: 'absolute',
        top: 0,
        left: 0, // Position at the left
        width: '100%', // Take the full width of the screen
        height: 80, // Adjust height for a thicker/thinner navbar
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 20,
        zIndex: 1,
    },
    menuIcon: {
        fontSize: 36,
        color: 'white',
        textShadowColor: 'black',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
    menuContainer: {
        backgroundColor: '#522E06',
        position: 'absolute',
        top: 80,
        left: 15,
        width: 100,
        padding: 20,
        zIndex: 1,
    },
    menuItem: {
        color: 'white',
        fontSize: 20,
        marginBottom: 10,
        textAlign: 'center',
        textShadowColor: 'black',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 1,
        marginHorizontal: 50,
    },
});

export default styles;
