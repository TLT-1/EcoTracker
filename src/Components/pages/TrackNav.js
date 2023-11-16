import React from 'react';
import { View, Text, Button } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Driving from '../pages/Driving';
import Energy from '../pages/Energy';
import Navbar from '../Navbar';
import Footer from '../Footer';

const Stack = createStackNavigator();

function TrackOptions({ navigation }) {
    return (
        <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-between' }}>
            <Navbar />
            <Text>Choose an option:</Text>
            <Button
                title="Driving"
                onPress={() => navigation.navigate('Driving')}
            />
            <Button
                title="Energy"
                onPress={() => navigation.navigate('Energy')}
            />
            <Footer navigation={navigation} />
        </View>
    );
}

function TrackNav() {
    return (
        <View style={{ flex: 1 }}>
            <Stack.Navigator>
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
