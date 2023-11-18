import React from 'react';
import { View, Text, TouchableOpacity, ImageBackground, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Driving from '../pages/Driving';
import Energy from '../pages/Energy';
import Navbar from '../Navbar';
import Footer from '../Footer';
import styles from '../Styles/TrackStyles';

const Stack = createStackNavigator();

function TrackOptions({ navigation }) {
    return (
        <View style={{ flex: 1 }}>
            <Navbar />
            <ImageBackground source={require("../../../assets/ecoBackground.png")} style={[styles.container, { marginTop: 0 }]}>
                <View style={{ marginTop: 100, alignItems: 'center' }}>
                    <Text style={[styles.buttonText, { marginBottom: 50 }]}>Choose An Option To Track</Text>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Driving')}>
                        <Text style={styles.buttonText}>Driving</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Energy')}>
                        <Text style={styles.buttonText}>Energy</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
            <Footer navigation={navigation} />
        </View>
    );
}

function TrackNav() {
    return (
        <View style={{ flex: 1 }}>
            <Stack.Navigator initialRouteName="Track">
                <Stack.Screen
                    name="Track"
                    component={TrackOptions}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Driving"
                    component={Driving}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Energy"
                    component={Energy}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
        </View>
    );
}

export default TrackNav;
