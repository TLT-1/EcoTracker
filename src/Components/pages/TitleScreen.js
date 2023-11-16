import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, ImageBackground, Animated, Easing } from "react-native";
import styles from "../Styles/TitleScreenStyles";
import Footer from '../Footer';
import Navbar from '../Navbar';

const TitleScreen = () => {
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



    /* this code will first go to the users profile on the back end and grab the id number, that will then be used for 
    the "initialData.id" so that it can grab all the other data with the right extention, to change data just change ie dietarychoice to driving for the driving data */
    const [data, setData] = useState([]);
    const [data_to, setData_to] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/profile')
            .then(res => res.json())
            .then(initialData => {
                setData(initialData);

                // Now fetch the second piece of data using the id from the initial data
                return fetch('http://localhost:5000/' + initialData.id + '/info/dietarychoice');
            })
            .then(res => res.json())
            .then(secondaryData => {
                setData_to(secondaryData);
            })
            .catch(error => {
                console.error("There was an error fetching the data:", error);
            });
    }, []);



    /* below in the "html(ish)" you will see a calling to data.id and data_to, currently with how its set up
    it will show the users id for the first one and for data_to it will show whatever is on the backend for the
    extention that you have provided. Now most of it is in a list so to extract each element you can just 
    index data_to ie data_to[0] and this might output 2007 if you are pulling from the driving extention */


    return (
        <View style={styles.container}>
            <Navbar />
            <ImageBackground
                source={require("../../../assets/ecoTrackTitleScreen.png")}
                style={styles.titleScreen}
            >


                {/* 
                <div>
                    <h1>Data from MongoDB</h1>
                    <ul>
                        <li>ID: {data.id}</li>
                        <li>ID: {data_to}</li>
                    </ul>
                </div>
                */ }





                <Animated.Image
                    source={require("../../../assets/ecoTrackLogosu.png")}
                    style={[styles.logo, { transform: [{ scale: scaleValue }] }]}
                />

            </ImageBackground>
            <Footer navigation={navigation} />
        </View>
    );
};

export default TitleScreen;
