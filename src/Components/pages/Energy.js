import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, ImageBackground } from 'react-native'
import styles from '../Styles/TrackStyles';
import Navbar from '../Navbar';
import Footer from '../Footer';

const Energy = ({ navigation }) => {
    const [appliance, setAppliance] = useState('');
    const [watts, setWatts] = useState('');
    const [hoursDay, setHoursDay] = useState('');

    const handleSubmit = () => {
        const data = {
            appliance,
            watts,
            hoursDay
        };

        fetch('/api/energy', {
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
        setAppliance('');
        setWatts('');
        setHoursDay('');
    };

    return (
        <View style={{ flex: 1 }}>
            <Navbar />
            <ImageBackground source={require("../../../assets/ecoBackground.png")} style={{ ...styles.container, overflow: 'hidden' }}>
                <Image source={require("../../../assets/ecoEnergy.png")} style={styles.title} />
                <Text style={styles.buttonText}>Appliance:</Text>
                <TextInput style={styles.input} value={appliance} onChangeText={setAppliance} />

                <Text style={styles.buttonText}>Watts:</Text>
                <TextInput style={styles.input} value={watts} onChangeText={setWatts} />

                <Text style={styles.buttonText}>Hours per day:</Text>
                <TextInput style={styles.input} value={hoursDay} onChangeText={setHoursDay} />

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

export default Energy;