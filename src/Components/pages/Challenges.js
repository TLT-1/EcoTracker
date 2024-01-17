import React, { useState, useEffect } from 'react';
import { View, Text, Image, ImageBackground, FlatList, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // install @expo/vector-icons
import Navbar from '../Navbar';
import Footer from '../Footer';
import Snowfall from 'react-snowfall';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Challenges = ({ navigation }) => {
    const challenges = [
        {
            id: '1',
            title: 'Drink Water',
            description: 'Drink 8 glasses of water every day to stay hydrated.',
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

    useEffect(() => {
        // Load the completed challenges from async storage when the component mounts
        AsyncStorage.getItem('completedChallenges').then(data => {
            if (data) {
                setCompletedChallenges(JSON.parse(data));
            }
        });
    }, []);

    useEffect(() => {
        // Save the completed challenges to async storage whenever it changes
        AsyncStorage.setItem('completedChallenges', JSON.stringify(completedChallenges));
    }, [completedChallenges]);

    useEffect(() => {
        const now = new Date();
        const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
        const timeUntilTomorrow = tomorrow - now;

        const timer = setTimeout(() => {
            setCompletedChallenges({});
        }, timeUntilTomorrow);

        return () => clearTimeout(timer);
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
                    onPress={() => {
                        setCompletedChallenges({
                            ...completedChallenges,
                            [item.id]: !isCompleted // Toggle the completion status of the challenge
                        });
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
                <Image source={require("../../../assets/ecoTreesSnow.png")} style={{ position: 'absolute', bottom: -40, width: '100%', height: 160 }} />
            </ImageBackground>
            <Snowfall snowflakeCount={250} />
            <Footer style={{ height: 18 }} navigation={navigation} />
        </View>
    );

};

export default Challenges;