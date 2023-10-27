import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, Animated, Easing } from "react-native";
import styles from "../Styles/TitleScreenStyles";

const TitleScreen = () => {
    const [scaleValue] = useState(new Animated.Value(1));


    

    useEffect(() => {
        const pulseAnimation = Animated.sequence([
            Animated.timing(scaleValue, {
                toValue: 1.1,
                duration: 1500,
                easing: Easing.ease,
                useNativeDriver: true,
            }),
            Animated.timing(scaleValue, {
                toValue: 1,
                duration: 1500,
                easing: Easing.ease,
                useNativeDriver: true,
            }),
        ]);

        Animated.loop(pulseAnimation).start();
    }, [scaleValue]);

    

    

    return (
        <View style={styles.container}>
            <View style={styles.titleScreen}>
                <Image
                    source={require("../../../assets/ecoTrackTitleScreen.png")}
                    style={styles.titleScreenImage}
                />
                <Animated.Image
                    source={require("../../../assets/ecoTrackLogosu.png")}
                    style={[styles.logo, { transform: [{ scale: scaleValue }] }]}
                />
            </View>
        </View>
    );
};

export default TitleScreen;
