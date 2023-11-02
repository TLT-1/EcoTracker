import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    footer: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        backgroundColor: "#062a52",
        padding: 0,
        width: "100%",
    },
    footerText: {
        color: "#fff",
        fontSize: 12,
        textShadowColor: 'black',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 1,
    },
});

export default styles;