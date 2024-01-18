import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import FactStyles from './Styles/FactStyles';

const facts = [
    "Around 27,000 trees are cut down each day just to produce toilet paper.",
    "The oceans hold approximately 96.5% of the earth’s water, but only 1% of the earth’s water is safe for human consumption.",
    "Plastic bags and other plastic garbage that end up in the ocean kill over 1,000,000 sea animals every year.",
    "2023 was the hottest year on record, with an average global temperature of 1.28°C above the pre-industrial level",
    "The Amazon rainforest produces more than 20% of the world’s oxygen and is home to more than 10% of the world’s known biodiversity.",
    "More than 100 billion pounds of food is wasted each year in the United States, which is equivalent to about 1,200 calories per person per day.",
    "The Great Pacific Garbage Patch is a collection of marine debris in the North Pacific Ocean that is estimated to be twice the size of Texas and contains up to 1.8 trillion pieces of plastic.",
    "The average American uses about 100 gallons of water per day, while the average African family uses about 5 gallons of water per day",
    "Air pollution causes more than 6 million deaths per year, making it the world’s largest single environmental health risk",
    // Add more facts as needed
];

const Fact = ({ isModalVisible, setModalVisible }) => {
    const [fact, setFact] = useState('');
    const slideAnim = useRef(new Animated.Value(500)).current; // Initial value for bottom: 500

    useEffect(() => {
        if (isModalVisible) {
            const randomFact = facts[Math.floor(Math.random() * facts.length)];
            setFact(randomFact);
            setTimeout(() => {
                Animated.timing(slideAnim, {
                    toValue: 0,
                    duration: 500,
                    useNativeDriver: true,
                }).start();
            }, 3000);
        } else {
            Animated.timing(slideAnim, {
                toValue: 500,
                duration: 500,
                useNativeDriver: true,
            }).start();
        }
    }, [isModalVisible]);

    if (!isModalVisible) {
        return null;
    }

    return (
        <Animated.View style={[{ position: 'absolute', transform: [{ translateY: slideAnim }] }, FactStyles.factBox]}>
            <Text style={FactStyles.factText}>{fact}</Text>
            <TouchableOpacity style={FactStyles.closeButton} onPress={() => setModalVisible(false)}>
                <Text>Close</Text>
            </TouchableOpacity>
        </Animated.View>
    );
};

export default Fact;