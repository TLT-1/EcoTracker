import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, ImageBackground, Animated, Easing, Button, TextInput, Alert, Dimensions, TouchableOpacity } from "react-native";
import styles from "../Styles/UserAccountStyles";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import axios from 'axios';
import Footer from "../Footer";

const UserAccount = () => {
    const [user, setUser] = useState({
        name: 'John Doe', // Hardcoded for demonstration
        email: 'john.doe@example.com',
        birthday: '1/4/04',
    });


    const handleEditName = () => {
        // Logic to handle name change
        alert('Edit Name Clicked');
    };

    const handleEditEmail = () => {
        // Logic to handle email change
        alert('Edit Email Clicked');
    };

    const handleChangePassword = () => {
        // Implement navigation or modal popup for password change
        alert('Change Password Clicked');
    };

    const RenderIcon = () => <Text style={styles.icon}>🖉</Text>;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>User Account</Text>
            <View style={styles.infoContainer}>
                <Text style={styles.info}>Name: {user.name}</Text>
                <TouchableOpacity onPress={handleEditName}>
                    <RenderIcon />
                </TouchableOpacity>
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.info}>Email: {user.email}</Text>
                <TouchableOpacity onPress={handleEditEmail}>
                    <RenderIcon />
                </TouchableOpacity>
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.info}>Birthday: {user.birthday}</Text>
                
            </View>
            <Button
                title="Change Password"
                onPress={handleChangePassword}
                style={styles.button}
            />
        </View>
    );
};



export default UserAccount;