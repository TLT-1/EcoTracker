import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, ImageBackground } from 'react-native'
import styles from '../Styles/TrackStyles';
import Navbar from '../Navbar';
import Footer from '../Footer';

const Diet = ({ navigation }) => {
    const [dietLevel, setDietLevel] = useState('');
    const [food, setFood] = useState('');

    const handleSubmit = () => {
        const data = {
            dietLevel,
            food
        };

        fetch('/api/diet', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.error(error));
    };

    const handleClear = () => {
        setDietLevel('');
        setFood('');
    };

    return (
        <View style={{ flex: 1 }}>
            <Navbar />
            <ImageBackground source={require("../../../assets/ecoBackground.png")} style={{ ...styles.container, overflow: 'hidden' }}>
                <Image source={require("../../../assets/ecoDiet.png")} style={styles.title} />

                <Text style={styles.buttonText}>Diet Level:</Text>
                <TextInput style={styles.input} value={dietLevel} onChangeText={setDietLevel} />

                <Text style={styles.buttonText}>Food:</Text>
                <TextInput style={styles.input} value={food} onChangeText={setFood} />

                <View style={styles.button}>
                    <Button title="Submit" onPress={handleSubmit} color="transparent" />
                </View>
                <View style={styles.button}>
                    <Button title="Clear" onPress={handleClear} color="transparent" />
                </View>
                <Image source={require("../../../assets/ecoTrees.png")} style={{ position: 'absolute', bottom: -40, width: '100%', height: 160 }} />
            </ImageBackground>
            <Footer style={{ height: 18 }} navigation={navigation} />
        </View>
    );
};

export default Diet;
