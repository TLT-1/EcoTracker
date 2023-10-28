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
        width: "20%", // Adjusted the percentage to make the size responsive (bc chad/rebecca said responsive is cool)
        aspectRatio: 1, // Maintain the aspect ratio for responsive scaling (bc chad/rebecca said responsive is cool)
        resizeMode: "contain",
    },
});

export default styles;
