import { StyleSheet, useWindowDimensions } from "react-native";

export default function useResponsiveStyles() {
    const windowWidth = useWindowDimensions().width;
    const windowHeight = useWindowDimensions().height;

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "transparent",
            flexWrap: 'wrap',
        },
        title: {
            width: "17%",
            aspectRatio: 1,
            resizeMode: "contain",

        },
        input: {
            width: windowWidth * 0.13,
            height: windowHeight * 0.03,
            fontSize: windowWidth * 0.01,
            paddingLeft: windowWidth * 0.005,
            margin: windowWidth * 0.01,
            borderColor: '#062A52',
            borderWidth: 2,
            borderRadius: 15,
            backgroundColor: 'white',
        },
        button: {
            width: windowWidth * 0.04,
            height: windowHeight * 0.04,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#062A52',
            borderRadius: 15,
            marginTop: windowHeight * 0.005,
        },
        buttonText: {
            color: "white",
            fontSize: Math.min(windowWidth, windowHeight) * 0.015,
            fontWeight: "bold",
            textShadowOffset: { width: 1, height: 1 },
            textShadowRadius: 1,
            marginBottom: 3,
        },
    });

    return styles;
}
