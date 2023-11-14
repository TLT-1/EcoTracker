import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "transparent",
    },
    logo: {
        position: "absolute",
        width: "25%", // Adjusted the percentage to make the size responsive (bc chad/rebecca said responsive is cool)
        aspectRatio: 1, // Maintain the aspect ratio for responsive scaling (bc chad/rebecca said responsive is cool)
        resizeMode: "contain",
        top: -50,
    },
    input: {
        width: 400,
        height: 50,
        fontSize: 18,
        padding: 10,
        margin: 10,
        borderColor: '#062A52',
        borderWidth: 2,
        borderRadius: 5,
        backgroundColor: 'white',
        borderRadius: 15,
    },
    button: {
        width: 120,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#062A52',
        borderRadius: 5,
        marginTop: 10,
        borderRadius: 15,
    },
    buttonText: {
        color: 'white',
        fontSize: 20,
        textShadowColor: 'black',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 1,
    },
    linkText: {
        paddingBottom: 10,
        color: 'white',
        textDecorationLine: 'underline',
        textShadowColor: 'black',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 1,
    },

    errorText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default styles;
