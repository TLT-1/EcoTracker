import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    navbar: {
        backgroundColor: '#062A52',
        position: 'relative',
        top: 0,
        left: 0, // Position at the left
        width: '100%', // Take the full width of the screen
        height: 60, // Adjust height for a thicker/thinner navbar
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
        backgroundColor: '#062A52',
        position: 'absolute',
        top: 50,
        left: 15,
        width: 120,
        padding: 10,
        borderRadius: 5,

    },
    menuItem: {
        color: 'white',
        fontSize: 20,
        textAlign: 'center',
        textShadowColor: 'black',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 1,
        marginHorizontal: 50,
        marginVertical: 10,
    },
});

export default styles;
