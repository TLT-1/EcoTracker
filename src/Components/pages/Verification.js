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

    const [code, setCode] = useState('');
    const [password, setPassword] = useState('');
    //console.log(username, password)

    const [data, setData] = useState([]);

    const handleLogin = async () => {
        try {
            // Make GET request using axios with query parameters
            const response = await axios.get('http://localhost:5000/verify', {
                params: { code: code }
            });

            console.log(response.data); // Print out the response data

            // Check if the returned code from the backend matches the user input
            if (response.data.code === code) {
                // If they match, navigate to the next screen
                navigation.navigate('Title'); // Replace 'NextScreen' with your actual screen/route name
            } else {
                // Handle the case where they don't match
                console.error('The codes do not match.');
            }
        } catch (error) {
            console.error(error);
        }
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
            <Text style={{...styles.text, color: 'black'} }>Verfication Email</Text>
            <Text style={{ ...styles.text, color: 'black' }}>We've just sent the OTP code via Email to ...</Text>
                <TextInput
                    style={{ ...styles.input, fontSize: 18 }}
                    placeholder=" ******** "
                    value={code}
                    onChangeText={text => setCode(text)}
                    autoCapitalize="none"
                />
                <Text style={{ ...styles.text, color: 'black'} }> Resend OTP code</Text>
                
                <TouchableOpacity
                    style={styles.button}
                    onPress={async () => {
                        await handleLogin();

                    }}
                >
                    <Text style={styles.buttonText}>Confirm</Text>
                </TouchableOpacity>

            </View>


            
            <Footer style={{ height: 18 }} />
        </ImageBackground >

    );
}
export default Verification;



