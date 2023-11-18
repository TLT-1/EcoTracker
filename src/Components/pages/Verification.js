import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, ImageBackground, Animated, Easing, Button, TextInput, Alert, Dimensions, TouchableOpacity } from "react-native";
import styles from "../Styles/VerificationStyles";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Footer from '../Footer';
import axios from 'axios';




function Verification() {
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

    const [userInput, setUserInput] = useState(''); // State for storing user input
    const [backendCode, setBackendCode] = useState(''); // State for storing code from the backend
    //const navigation = useNavigation(); // Navigation hook

    // Function to fetch code from the backend
    const fetchCodeFromBackend = async () => {
        try {
            const response = await axios.get('http://localhost:5000/verify');
            console.log(response.data)
            setBackendCode(response.data.code); // Store the fetched code in state
        } catch (error) {
            console.error(error);
        }
    };

    // Call this function when the component mounts
    useEffect(() => {
        fetchCodeFromBackend();
    }, []);

    const handleLogin = () => {
        // Compare the user-entered code with the code fetched from the backend
        if (userInput === backendCode) {
            // If they match, navigate to the next screen
            navigation.navigate('Title'); // Replace 'NextScreen' with your actual screen/route name
            //console.log(backendCode)
        } else {
            // Handle the case where they don't match
            console.error('The codes do not match.');
            alert('Wrong code');
            //console.log(backendCode);
            //console.log(userInput);
        }
        //navigation.navigate('Title');
    };
    //handleLogin();



    return (
        <ImageBackground
            source={require("../../../assets/ecoBackground.png")}
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh', // full viewport height
            }}
        >
            <Image source={require("../../../assets/ecoSun.png")}
                style={{
                    width: 300,
                    height: 300,
                    position: 'absolute',
                    bottom: 0
                }} />
            <Animated.Image
                source={require("../../../assets/ecoTrackLogosu.png")}
                style={[styles.logo, { transform: [{ scale: scaleValue }] }]}
            />


            <View style={{ ...styles.container, marginBottom: 100 }}>
                <Text style={{ ...styles.text, color: 'white', fontSize: 18 }}>Verfication Email</Text>
                <Text style={{ ...styles.text, color: 'white', fontSize: 16 }}>We've just sent the OTP code via Email to...</Text>
                <TextInput
                    style={{ ...styles.input, fontSize: 18 }}
                    placeholder=" ******** "
                    value={userInput}
                    onChangeText={text => setUserInput(text)}
                    autoCapitalize="none"
                />
                <Text style={{ ...styles.text, color: 'white', fontSize: 16 }}> Resend OTP code</Text>

                <TouchableOpacity
                    style={styles.button}
                    onPress={async () => {
                        await handleLogin();

                    }}
                >
                    <Text style={styles.buttonText}>Confirm</Text>
                </TouchableOpacity>

            </View>



            <Footer style={{ height: 18 }} navigation={navigation} />
        </ImageBackground >

    );
}
export default Verification;



