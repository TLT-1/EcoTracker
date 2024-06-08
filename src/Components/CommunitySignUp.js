// CommunitySignUp.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const CommunitySignUp = () => {
    // Replace with your sign-up logic
    const handleSignUp = () => {
        navigation.navigate('SignUp');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Join the EcoTrack Community</Text>
            <Text style={styles.subHeader}>
                Sign up to access advanced features and connect with like-minded{'\n'} individuals on your eco-friendly journey.
            </Text>
            <TouchableOpacity style={styles.button} onPress={handleSignUp}>
                <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center', // Center the content
        padding: 20, // Add padding for spacing
    },
    header: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center', // Center the text
        marginBottom: 10, // Add some margin at the bottom
        color: '#fff',
    },
    subHeader: {
        fontSize: 16,
        textAlign: 'center', // Center the text
        marginBottom: 20, // Add some margin at the bottom
        color: '#fff',
    },
    button: {
        backgroundColor: '#fff', // Button color
        paddingVertical: 10, // Vertical padding
        paddingHorizontal: 20, // Horizontal padding
        borderRadius: 25, // Rounded corners
    },
    buttonText: {
        color: '#000', // Text color
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default CommunitySignUp;
