import React, { useState, useEffect } from 'react';
import { View, Text, Image, ImageBackground, FlatList, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Navbar from '../Navbar';
import Footer from '../Footer';
import Snowfall from 'react-snowfall';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { isToday } from 'date-fns';


const Challenges = ({ navigation }) => {
    const challenges = [
        {
            id: '1',
            title: 'Drink Water',
            description: 'Drink at least 8 glasses of water every day to stay hydrated.',
        },
        {
            id: '2',
            title: 'Turn off Lights',
            description: 'Make sure to turn off lights when you leave a room to save energy.',
        },
        {
            id: '3',
            title: 'Stand',
            description: 'Stand up every hour to stay active.',
        },
        {
            id: '4',
            title: 'Exercise',
            description: 'Exercise for 30 minutes every day to stay healthy.',
        },
        {
            id: '5',
            title: 'Stretch',
            description: 'Stretch for 10 minutes every day to stay flexible.',
        },
        {
            id: '6',
            title: 'Sleep',
            description: 'Get 8 hours of sleep every night to stay healthy.',
        },
    ];
    const [completedChallenges, setCompletedChallenges] = useState({});

    const setCompletedChallengesWithStorage = async (value) => {
        try {
            await AsyncStorage.setItem('@completedChallenges', JSON.stringify(value));
            const today = new Date();
            const dateOnly = new Date(today.getFullYear(), today.getMonth(), today.getDate()).toString();
            await AsyncStorage.setItem('@date', dateOnly);
            setCompletedChallenges(value);
        } catch (e) {
            // saving error
        }
    };

    const loadCompletedChallenges = async () => {
        try {
            const storedDate = new Date(await AsyncStorage.getItem('@date'));
            const today = new Date();
            const currentDateOnly = new Date(today.getFullYear(), today.getMonth(), today.getDate());

            if (storedDate.toString() !== currentDateOnly.toString()) {
                // If the stored date is different from the current date, reset the completed challenges
                setCompletedChallenges({});
            } else {
                const value = await AsyncStorage.getItem('@completedChallenges');
                if (value !== null) {
                    setCompletedChallenges(JSON.parse(value));
                }
            }
        } catch (e) {
            // loading error
        }
    };

    useEffect(() => {
        loadCompletedChallenges();
    }, []);

    const renderItem = ({ item }) => {
        // Determine if the current challenge is completed
        const isCompleted = !!completedChallenges[item.id];

        return (
            <View style={styles.item}>
                <View>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={{ fontSize: 16 }}>{item.description}</Text>
                </View>
                <TouchableOpacity
                    style={{ marginLeft: 30 }}
                    onPress={async () => {
                        const newCompletedChallenges = {
                            ...completedChallenges,
                            [item.id]: !isCompleted // Toggle the completion status of the challenge
                        };
                        await setCompletedChallengesWithStorage(newCompletedChallenges);
                    }}>
                    <MaterialIcons name="check-circle" size={32} color={isCompleted ? 'green' : 'grey'} />
                </TouchableOpacity>
            </View>
        );
    };

    const styles = {
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
        item: {
            padding: 20,
            marginVertical: 8,
            marginHorizontal: 16,
            marginTop: 20,
            backgroundColor: 'white',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderRadius: 10,
            borderWidth: 2,
            borderColor: '#062a52',
            width: 600,
            height: 80,
        },
        title: {
            fontSize: 32,
        },
        title2: {
            fontSize: 50,
            fontWeight: 'bold',
            color: 'white',
            textAlign: 'center',
        },
    };
    return (
        <View style={{ flex: 1 }}>
            <Navbar />
            <ImageBackground source={require("../../../assets/ecoBackground.png")} style={styles.container}>
                <Text style={styles.title2}>Challenges</Text>
                <FlatList
                    data={challenges}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    style={{ zIndex: 1 }}
                    numColumns={2}
                />
                <Image source={require("../../../assets/ecoMountain.png")} style={{ position: 'absolute', bottom: 0, width: '100%', height: 500 }} />
                <Snowfall snowflakeCount={250} />
                <Image source={require("../../../assets/ecoTreesSnow.png")} style={{ position: 'absolute', bottom: -40, width: '100%', height: 160 }} />
            </ImageBackground>
            <Footer style={{ height: 18 }} navigation={navigation} />
        </View>
    );

};

export default Challenges;