import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "transparent",
    },
    titleScreen: {
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-start",
        width: "100%",
        height: "100%",
    },
    titleScreenImage: {
        flex: 1,
        width: "100%",
        height: "100%",
    },
    logo: {
        position: "absolute",
        width: "25%", // Adjusted the percentage to make the size responsive (bc chad/rebecca said responsive is cool)
        aspectRatio: 1, // Maintain the aspect ratio for responsive scaling (bc chad/rebecca said responsive is cool)
        resizeMode: "contain",
        top: "0%",
    },
    inputContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#4CAF50' // Greenish background color
    },
    input: {
        width: '180%',
        height: 50,
        padding: 10,
        margin: 10,
        borderColor: 'blue',
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: 'white',
        borderRadius: 15,
    },
    button: {
        width: 170,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'blue',
        borderRadius: 5,
        marginTop: 10,
        borderRadius: 15,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
    },
    linkText: {
        color: 'blue',
        textDecorationLine: 'underline', // Optional: Adds an underline for the clickable text
    },
});

export default styles;
