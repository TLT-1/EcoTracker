import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-start",
        backgroundColor: "transparent",
        marginTop: -70,
    },
    title: {
        width: "20%", // Adjusted the percentage to make the size responsive (bc chad/rebecca said responsive is cool)
        aspectRatio: 1, // Maintain the aspect ratio for responsive scaling (bc chad/rebecca said responsive is cool)
        resizeMode: "contain",
        marginBottom: -40,
    },
    input: {
        width: 400,
        height: 50,
        fontSize: 18,
        padding: 10,
        margin: 20,
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
        color: "white",
        fontSize: 20,
        fontWeight: "bold",
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 1,
        marginBottom: 3,
    },
});

export default styles;
