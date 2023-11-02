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
});

export default styles;
