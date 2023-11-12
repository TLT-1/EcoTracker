import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, ImageBackground, Animated, Easing, Button, TextInput, Alert, Dimensions, TouchableOpacity } from "react-native";
import styles from "../Styles/LogInStyles";
import Footer from '../Footer';
import axios from 'axios';

function LogIn() {
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

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    //console.log(username, password)

    const handleLogin = async () => {
        try {
            // Make POST request using axios with data
            const response = await axios({
                method: 'POST',
                url: 'http://localhost:5000/login',
                headers: { 'Content-Type': 'application/json' },
                data: {
                    email: email,
                    password: password,
                }
            });

            //console.log(response.data);  // Print out the response data
            if (response.data.success) {
                navigation.navigate('Title');
            } else {
                // If the login is not successful, show an alert
                alert("Login Failed", response.data.error || "Incorrect email or password");
            }
        } catch (error) {
            console.error(error);
            // If there is an error in the request, show an alert
            alert("Login Error", "An error occurred during login, please try again.");
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
                <TextInput
                    style={{ ...styles.input, fontSize: 18 }}
                    placeholder="Email"
                    value={email}
                    onChangeText={text => setEmail(text)}
                    autoCapitalize="none"
                />
                <TextInput
                    style={{ ...styles.input, fontSize: 18 }}
                    placeholder="Password"
                    value={password}
                    onChangeText={text => setPassword(text)}
                    secureTextEntry={true}
                    autoCapitalize="none"
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={async () => {
                        await handleLogin();

                    }}
                >
                    <Text style={styles.buttonText}>Sign In</Text>
                </TouchableOpacity>

            </View>


            <Text style={{ ...styles.text, color: 'white' }}>Don't Have an Account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                <Text style={{ ...styles.linkText, color: 'white' }}>Sign Up</Text>
            </TouchableOpacity>
            <Footer style={{ height: 18 }} />
        </ImageBackground >

    );
}
export default LogIn;



