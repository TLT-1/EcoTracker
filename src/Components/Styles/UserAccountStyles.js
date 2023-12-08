import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    info: {
        fontSize: 18,
        marginBottom: 10,
    },
    buttonContainer: {
        width: '10%',
        paddingHorizontal: 15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#062A52',
        borderRadius: 15,
    },
    button: {
        backgroundColor: '#062A52',
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
    infoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    icon: {
        fontSize: 18,
        marginLeft: 10,
    },
});
export default styles;