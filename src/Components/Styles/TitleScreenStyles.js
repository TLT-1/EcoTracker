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
        flex: 1,
        position: "absolute",
        width: "30%", // Adjusted the percentage to make the size responsive
        aspectRatio: 1, // Maintain the aspect ratio for responsive scaling
        resizeMode: "contain",
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 16,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
    },
    button: {
        backgroundColor: '#4CAF50', // Example button color
        padding: 10,
        margin: 30,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white', // Example text color
        textAlign: 'center',
    },
    contentContainer: {
        width: '100%', // Take up full width
        alignItems: 'center', // Center items horizontally
        marginTop: 520, // Adjust this value to position below the logo
        paddingHorizontal: 20, // Optional: add some padding on the sides
    },
    treesImage: {
        position: 'absolute',
        bottom: -40,
        width: '100%',
        height: 160
    },
});

export default styles;
