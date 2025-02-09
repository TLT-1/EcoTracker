import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Linking from 'expo-linking';
import TitleScreen from "./src/Components/pages/TitleScreen";
import LogIn from "./src/Components/pages/LogIn";
import SignUp from "./src/Components/pages/SignUp";
import PP from "./src/Components/pages/PP";
import ToS from "./src/Components/pages/ToS";
import News from './src/Components/pages/News';
import Verification from "./src/Components/pages/Verification";
import UserAccount from "./src/Components/pages/UserAccount";
import Contact from './src/Components/pages/Contact';
import Driving from './src/Components/pages/Driving';
import Energy from './src/Components/pages/Energy';
import Diet from './src/Components/pages/Diet';
import Exercise from './src/Components/pages/Exercise';
import Water from './src/Components/pages/Water';
import Challenges from './src/Components/pages/Challenges';
import PasswordReset from './src/Components/pages/PasswordReset';
import TrackNav from './src/Components/pages/TrackNav';
import PasswordResetTemp from './src/Components/pages/PasswordResetTemp';
import Test from './src/Components/pages/Testing';
import Snowfall from 'react-snowfall';
import ThemeContext from './src/Components/ThemeContext';


function HomeScreen({ navigation }) {
    return (
        <>
            <Snowfall snowflakeCount={250} />
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Home Screen</Text>
                <Button
                    title="Go to Details"
                    onPress={() => navigation.navigate('Details')}
                />
            </View>
        </>
    );
}

function DetailsScreen({ navigation }) {
    return (
        <>
            <Snowfall snowflakeCount={250} />
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Details Screen</Text>
                {/* <Button
                    title="Go to Details... again"
                    onPress={() => navigation.navigate('Details')}
                />
                <Button title="Go to Home" onPress={() => navigation.navigate('Home')} /> */}
                <Button title="Go Back" onPress={() => navigation.goBack()} />
                {/* <Button
                    title="Go back to first screen in stack"
                    onPress={() => navigation.popToTop()}
                /> */}
                <Button title="Go to Title" onPress={() => navigation.navigate('Title')} />
                {/*<Button
            title="Go to Details... again"
            onPress={() => navigation.push('Details')}
            /> */}
            </View>
        </>
    );
}


const Stack = createNativeStackNavigator();
const TrackNavStack = createNativeStackNavigator();

const prefix = Linking.createURL('/');
const linking = {
    prefixes: [prefix],
};

function TrackNavStackScreen() {
    return (
        <>
            <TrackNavStack.Navigator initialRouteName="TrackNav">
                <TrackNavStack.Screen name="TrackNav" component={TrackNav} options={{ headerShown: false }} />
                <TrackNavStack.Screen name="Driving" component={Driving} options={{ headerShown: false }} />
                <TrackNavStack.Screen name="Energy" component={Energy} options={{ headerShown: false }} />
                <TrackNavStack.Screen name="Diet" component={Diet} options={{ headerShown: false }} />
                <TrackNavStack.Screen name="Exercise" component={Exercise} options={{ headerShown: false }} />
                <TrackNavStack.Screen name="Water" component={Water} options={{ headerShown: false }} />
            </TrackNavStack.Navigator>
        </>
    );
}

function App() {
    const [key, setKey] = useState(Math.random());

    const [theme, setTheme] = useState('winter');

    useEffect(() => {
        const handlePopState = () => {
            setKey(Math.random());  // Force a re-render by changing the state
        };

        window.addEventListener('popstate', handlePopState);

        return () => {
            window.removeEventListener('popstate', handlePopState);
        };
    }, []);

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            <View key={key} style={{ flex: 1 }}>
                <Snowfall snowflakeCount={250} />

                <NavigationContainer linking={linking} fallback={<Text>Loading...</Text>}>
                    <Stack.Navigator initialRouteName="Title">
                        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Overview' }} />
                        <Stack.Screen name="Details" component={DetailsScreen} />
                        <Stack.Screen name="Title" component={TitleScreen} options={{ headerShown: false }} />
                        <Stack.Screen name="LogIn" component={LogIn} options={{ headerShown: false }} />
                        <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
                        <Stack.Screen name="PP" component={PP} options={{ headerShown: false }} />
                        <Stack.Screen name="ToS" component={ToS} options={{ headerShown: false }} />
                        <Stack.Screen name="Verification" component={Verification} options={{ headerShown: false }} />
                        <Stack.Screen name="UserAccount" component={UserAccount} options={{ headerShown: false }} />
                        <Stack.Screen name="Contact" component={Contact} options={{ headerShown: false }} />
                        <Stack.Screen name="PasswordReset" component={PasswordReset} options={{ headerShown: false }} />
                        <Stack.Screen name="PasswordResetTemp" component={PasswordResetTemp} options={{ headerShown: false }} />
                        <Stack.Screen name="News" component={News} options={{ headerShown: false }} />
                        <Stack.Screen name="Challenges" component={Challenges} options={{ headerShown: false }} />
                        <Stack.Screen name="Test" component={Test} options={{ headerShown: false }} />

                        <Stack.Screen name="TrackNav" component={TrackNavStackScreen} options={{ headerShown: false }} />

                    </Stack.Navigator>
                </NavigationContainer>
            </View>
        </ThemeContext.Provider>
    );
}


export default App;
