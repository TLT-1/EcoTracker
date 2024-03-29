import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
    },
    background: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 100, // adjust this value as needed
    },
    title: {
        fontSize: 34,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    infoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '20%',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
        marginBottom: 20,
    },
    info: {
        fontSize: 18,
        textAlign: 'left',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        width: '100%',
        paddingHorizontal: 10,
    },
    buttonContainer: {
        width: '7%',
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#062A52',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
    },
    footer: {
        height: 18,
    },
    profilePicContainer: {
        width: 120,
        height: 120,
        borderRadius: '50%',
        position: 'relative',
        overflow: 'hidden',
        border: '3px solid #fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    fileInput: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        opacity: 0,
    },
    chooseImageText: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        color: '#fff',
        pointerEvents: 'none',
    },
    profilePic: {
        width: '100%',
        height: '100%',
    },
    componentsContainer: {
        flex: 1,
        flexDirection: 'row',
    },
    leaderboardContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    leaderboard: {
        flex: 2,
        left: 40,
    },
    buttonsContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end', // Align children to the right
        left: 180,
        marginTop: 110,
    },
    addFriendsButton: {
    },
    themeButtonsContainer: {
        position: 'absolute',
        top: -20,
        left: 150,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        padding: 10,
    },
    themeButton: {
        backgroundColor: '#000',
        padding: 10,
        margin: 5,
        borderRadius: 5,
    },
    themeButtonText: {
        color: '#000',
    },
});