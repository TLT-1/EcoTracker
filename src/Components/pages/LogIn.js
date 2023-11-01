import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, Animated, Easing, Button, TextInput,  Alert } from "react-native";
//import styles from "../Styles/LogInStyles";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import axios from 'axios';



{/* 
function LogIn() {
    const [scaleValue] = useState(new Animated.Value(1));

    useEffect(() => {
        const pulseAnimation = Animated.sequence([
            Animated.timing(scaleValue, {
                toValue: 1.15,
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
    
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            // Make POST request using axios with data
            const response = await axios({
                method: 'POST',
                url: 'http://localhost:5000/login',
                headers: { 'Content-Type': 'application/json' },
                data: {
                    username: "test2",
                    password: "test2@gmail.com",
                }

            });

            console.log(response.data); // Log the response from the server
        } catch (error) {
            console.error('Error:', error);
        }
    };
    
    


    return (
        
        
        < View style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh', // full viewport height
            background: 'linear-gradient(to bottom, rgb(27, 135, 14), rgb(1, 35, 5) 100%)'
        }}>
            
            <Animated.Image
                source={require("../../../assets/ecoTrackLogosu.png")}
                style={[styles.logo, { transform: [{ scale: scaleValue }] }]}
            />



            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    placeholder="Username or Email"
                    value={username}
                    onChangeText={text => setUsername(text)}
                    autoCapitalize="none"
                />
                <br></br>
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    value={password}
                    onChangeText={text => setPassword(text)}
                    secureTextEntry={true}
                    autoCapitalize="none"
                />
                <br></br>
                <TouchableOpacity style={styles.button} onPress={() => { } }>
                    <Text style={styles.buttonText}>Sign In</Text>
                </TouchableOpacity>
            </View>


            <Text style={styles.text}>Don't Have an Account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                <Text style={styles.linkText}>Sign Up</Text>
            </TouchableOpacity>


        </View >
        


        
    );
}
export default LogIn;
*/ }




const LogIn = () => {
    const [userInput, setUserInput] = useState('');

    const handleSubmit = () => {
        fetch('http://localhost:5000/login', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_input: userInput,
            }),
        })
            .then((response) => response.json())
            .then((json) => {
                Alert.alert('Success', 'Input submitted successfully');
                console.log(json);
            })
            .catch((error) => {
                console.error(error);
                Alert.alert('Error', 'Failed to submit input');
            });
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                onChangeText={setUserInput}
                value={userInput}
                placeholder="Enter input"
            />
            <Button
                onPress={handleSubmit}
                title="Submit"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
});

export default LogIn;