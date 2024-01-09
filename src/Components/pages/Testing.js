import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, ImageBackground, Animated, Easing, Touchable, Button, TextInput, Alert, Dimensions, TouchableOpacity, Modal } from "react-native";


import styles from "../Styles/TitleScreenStyles";
import Footer from '../Footer';
import Navbar from '../Navbar';
import Snowfall from 'react-snowfall';

const Test = () => {
    const [scaleValue] = useState(new Animated.Value(1));

    useEffect(() => {
        const pulseAnimation = Animated.sequence([
            Animated.timing(scaleValue, {
                toValue: 1.07,
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
            <Navbar />
            <ImageBackground
                source={require("../../../assets/ecoTrackTitleScreenChristmas.png")}
                style={styles.titleScreen}>

                <Animated.Image
                    source={require("../../../assets/ecoTrackLogosu.png")}
                    style={[styles.logo, { transform: [{ scale: scaleValue }] }]}
                />

                <View style={styles.contentContainer}>
                    <Text style={styles.title}>
                        Track and Reduce Your{'\n'}Carbon Footprint
                    </Text>
                    <Text style={styles.subtitle}>
                        Monitor your daily activities and get personalized insights and{'\n'}recommended to lower your impact.
                    </Text>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button} onPress={() => { }}>
                            <Text style={styles.buttonText}>Learn more</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={() => { }}>
                            <Text style={styles.buttonText}>Start tracking</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <Image
                    source={require("../../../assets/ecoTreesSnow.png")}
                    style={styles.treesImage}
                />
            </ImageBackground>
            <Snowfall snowflakeCount={250} />
            <Footer navigation={navigation} />
        </View>
    );
};

export default Test;
