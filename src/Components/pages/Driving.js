import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, ImageBackground } from 'react-native'
import styles from '../Styles/DrivingStyles';

const Driving = () => {
    const [year, setYear] = useState('');
    const [make, setMake] = useState('');
    const [model, setModel] = useState('');
    const [avgSpeed, setAvgSpeed] = useState('');

    const handleSubmit = () => {
        const data = {
            year,
            make,
            model,
            avg_speed: avgSpeed
        };

        fetch('/api/driving', {
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

    return (
        <ImageBackground source={require("../../../assets/ecoBackground.png")} style={styles.container}>
            <Image source={require("../../../assets/ecoVehicle.png")} style={styles.title} />
            <Text style={styles.buttonText}>Year:</Text>
            <TextInput style={styles.input} value={year} onChangeText={setYear} />

            <Text style={styles.buttonText}>Make:</Text>
            <TextInput style={styles.input} value={make} onChangeText={setMake} />

            <Text style={styles.buttonText}>Model:</Text>
            <TextInput style={styles.input} value={model} onChangeText={setModel} />

            <Text style={styles.buttonText}>Average Speed:</Text>
            <TextInput style={styles.input} value={avgSpeed} onChangeText={setAvgSpeed} />

            <View style={styles.button}>
                <Button title="Submit" onPress={handleSubmit} color="transparent" />
            </View>
        </ImageBackground>
    );
};

export default Driving;
