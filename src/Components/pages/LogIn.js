import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, Animated, Easing, Button, TextInput, TouchableOpacity } from "react-native";
import styles from "../Styles/LogInStyles";





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
                <TouchableOpacity style={styles.button} onPress={() => { /* Handle login logic here */ }}>
                    <Text style={styles.buttonText}>Sign In</Text>
                </TouchableOpacity>
            </View>


            <Text style={{color:'blue'} }>Dont Have an Account? Sign Up</Text>


        </View >
        


        
    );
}
export default LogIn;