import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    factBox: {
        position: 'absolute',
        right: 10,
        bottom: 10,
        width: '20%',
        height: '20%',
        backgroundColor: '#F6AE01',
        padding: 10,
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    factText: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    closeButton: {
        backgroundColor: '#FFF',
        padding: 5,
        marginTop: 20,
        width: 50,
        height: 25,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
    },
});