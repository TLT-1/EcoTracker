import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import FactStyles from './Styles/FactStyles';

const facts = [
    "Around 27,000 trees are cut down each day just to produce toilet paper.",
    "The oceans hold approximately 96.5% of the earth’s water, but only 1% of the earth’s water is safe for human consumption.",
    "Plastic bags and other plastic garbage that end up in the ocean kill over 1,000,000 sea animals every year.",
    "2023 was the hottest year on record, with an average global temperature of 1.28°C above the pre-industrial level",
    "The Amazon rainforest produces more than 20% of the world’s oxygen and is home to more than 10% of the world’s known biodiversity.",
    "More than 100 billion pounds of food is wasted each year in the United States, which is equivalent to about 1,200 calories per person per day.",
    "The Great Pacific Garbage Patch is a collection of marine debris in the North Pacific Ocean that is estimated to be twice the size of Texas and contains up to 1.8 trillion pieces of plastic.",
    // Add more facts as needed
];

const Fact = ({ isModalVisible, setModalVisible }) => {
    const [fact, setFact] = useState('');

    useEffect(() => {
        if (isModalVisible) {
            const randomFact = facts[Math.floor(Math.random() * facts.length)];
            setFact(randomFact);
        }
    }, [isModalVisible]);

    if (!isModalVisible) {
        return null;
    }

    return (
        <View style={[{ position: 'absolute' }, FactStyles.factBox]}>
            <Text style={FactStyles.factText}>{fact}</Text>
            <TouchableOpacity style={FactStyles.closeButton} onPress={() => setModalVisible(false)}>
                <Text>Close</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Fact;