import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, ImageBackground, Animated, Easing, Button, TextInput, Alert, Dimensions, TouchableOpacity } from "react-native";
import styles from "../Styles/SignUpStyle";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import axios from 'axios';
import Footer from "../Footer";

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

    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/inuseemail')
            .then(res => res.json())
            .then(initialData => {
                setData(initialData);


            })

            .catch(error => {
                console.error("There was an error fetching the data:", error);
            });
    }, []);

    const [first, setFirst] = useState('');
    const [last, setLast] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isValid, setIsValid] = useState(false);
    const [isValidEmail, setIsValidEmail] = useState(false);
    
    const generateRandomCode = () => {
        return Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
    };

    const [code, setCode] = useState(generateRandomCode().toString());


    //console.log(username, password)
    //setCode(code);

    const handleLogin = async () => {
        try {
            // Make POST request using axios with data
            const response = await axios({
                method: 'POST',
                url: 'http://localhost:5000/signup',
                headers: { 'Content-Type': 'application/json' },
                data: {
                    first: first,
                    last: last,
                    email: email,
                    password: password,
                    code: code
                }
            });

            //console.log(response.data);  // Print out the response data
        } catch (error) {
            console.error(error);
        }
    };
    const verify = async () => {
        try {
            // Make POST request using axios with data
            const response = await axios({
                method: 'POST',
                url: 'http://localhost:5000/verify',
                headers: { 'Content-Type': 'application/json' },
                data: {
                    code: code  // Make sure this is the variable containing the code you want to send
                }
            });
            console.log(response.data);  // Print out the response data
            
        } catch (error) {
            console.error(error);
        }
    };


    //handleLogin();

    const handlePasswordChange = (text) => {
        setPassword(text);

        // Check if the password has at least 7 characters, a capital letter, and a number
        const hasUpperCase = /[A-Z]/.test(text);
        const hasNumber = /\d/.test(text);

        setIsValid(text.length >= 7 && hasUpperCase && hasNumber);
    };

    const handleEmail = (text) => {
        return new Promise((resolve) => {
            setEmail(text);

            if (data && Array.isArray(data.emails) && data.emails.includes(text)) {
                alert('Email in use, Please use a different one');
                setIsValidEmail(false);
                resolve(false);
            } else {
                setIsValidEmail(true);
                resolve(true);
            }
        });
    };

    const handlePress = async () => {

        const emailIsValid = await handleEmail(email);
        if (!first.trim() || !last.trim() || !email.trim() || !isValid) {
            alert('Field is empty', 'Please fill out all the fields.');
        } else {
            if (emailIsValid && isValid) {
                await verify();
                await handleLogin();
                //send email
                
                navigation.navigate('Verification');
            }
        }
    };

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

            <Animated.Image
                source={require("../../../assets/ecoTrackLogosu.png")}
                style={[styles.logo, { transform: [{ scale: scaleValue }] }]}
            />

            <Image source={require("../../../assets/ecoMountain.png")}
                style={{
                    width: Dimensions.get('window').width,
                    height: 250,
                    position: 'absolute',
                    bottom: 0
                }}
                resizeMode="cover"
            />

            <View style={{ ...styles.container, marginTop: 50 }}>

                <TextInput
                    style={{ ...styles.input, fontSize: 18 }}
                    placeholder="First Name"
                    value={first}
                    onChangeText={text => setFirst(text)}
                    autoCapitalize="none"
                />
                <TextInput
                    style={{ ...styles.input, fontSize: 18 }}
                    placeholder="Last Name"
                    value={last}
                    onChangeText={text => setLast(text)}
                    autoCapitalize="none"
                />
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
                    onChangeText={handlePasswordChange}
                    secureTextEntry={true}
                    autoCapitalize="none"
                />
                {!isValid && password.length > 0 && (
                    <Text style={styles.errorText}>
                        Password must be at least 7 characters long, contain a capital letter and a number.
                    </Text>
                )}
                <br></br>
                <TouchableOpacity
                    style={styles.button}
                    onPress={async () => { handlePress() }}
                >
                    <Text style={styles.buttonText}>Sign Up</Text>
                </TouchableOpacity>
            </View>
            <Text style={{ ...styles.text, color: 'white' }}>Have an Account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('LogIn')}>
                <Text style={styles.linkText}>Sign In</Text>
            </TouchableOpacity>
            <Footer style={{ height: 18 }} />
        </ImageBackground>
    );
}
export default LogIn;



