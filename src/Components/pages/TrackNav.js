import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, ImageBackground, StyleSheet, Button } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Driving from '../pages/Driving';
import Energy from '../pages/Energy';
import Navbar from '../Navbar';
import Footer from '../Footer';
import useResponsiveStyles from '../Styles/TrackStyles';
import Diet from './Diet';
import Exercise from './Exercise';
import Snowfall from 'react-snowfall';
import Fact from '../Fact';

const Stack = createStackNavigator();

function TrackOptions({ navigation }) {
    const styles = useResponsiveStyles();
    const [isModalVisible, setModalVisible] = useState(true);

    return (
        <View style={{ flex: 1 }}>
            <Navbar />
            <ImageBackground source={require("../../../assets/ecoBackground.png")} style={[styles.container, { overflow: 'hidden' }]}>
                <View style={{ marginTop: -300, alignItems: 'center' }}>
                    <Text style={[styles.buttonText, { marginBottom: 50 }]}>Choose An Option To Track</Text>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Driving')}>
                        <Text style={styles.buttonText}>Driving</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Energy')}>
                        <Text style={styles.buttonText}>Energy</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Diet')}>
                        <Text style={styles.buttonText}>Diet</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Exercise')}>
                        <Text style={styles.buttonText}>Exercise</Text>
                    </TouchableOpacity>
                </View>
                <Image source={require("../../../assets/ecoTreesSnow.png")} style={{ position: 'absolute', bottom: -40, width: '100%', height: 160 }} />
                <Fact isModalVisible={isModalVisible} setModalVisible={setModalVisible} />
            </ImageBackground>
            <Snowfall style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} snowflakeCount={250} />
            <Footer style={{ height: 18 }} navigation={navigation} />
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
                <Stack.Screen
                    name="Diet"
                    component={Diet}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Exercise"
                    component={Exercise}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>

        </View>
    );
}

export default TrackNav;
