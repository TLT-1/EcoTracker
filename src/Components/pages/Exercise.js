import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, ImageBackground } from 'react-native'
import useResponsiveStyles from '../Styles/TrackStyles';
import Navbar from '../Navbar';
import Footer from '../Footer';
import Snowfall from 'react-snowfall';

const Exercise = ({ navigation }) => {
    const [activity, setActivity] = useState('');
    const [freqPerWeek, setFreqPerWeek] = useState('');
    const [durationPerDayMin, setDurationPerDayMin] = useState('');

    const styles = useResponsiveStyles();

    const handleSubmit = () => {
        const data = {
            activity,
            freqPerWeek,
            durationPerDayMin
        };

        fetch('/api/exercise', {
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
        setActivity('');
        setFreqPerWeek('');
        setDurationPerDayMin('');
    };

    return (
        <View style={{ flex: 1 }}>
            <Navbar />
            <ImageBackground source={require("../../../assets/ecoBackgroundChristmas.png")} style={{ ...styles.container, overflow: 'hidden' }}>
                <Image source={require("../../../assets/ecoExercise.png")} style={styles.title} />

                <Text style={styles.buttonText}>Activity:</Text>
                <TextInput style={styles.input} value={activity} onChangeText={setActivity} />

                <Text style={styles.buttonText}>Frequency Per Week:</Text>
                <TextInput style={styles.input} value={freqPerWeek} onChangeText={setFreqPerWeek} />

                <Text style={styles.buttonText}>Duration Per Day (min):</Text>
                <TextInput style={styles.input} value={durationPerDayMin} onChangeText={setDurationPerDayMin} />

                <View style={styles.button}>
                    <Button title="Submit" onPress={handleSubmit} color="transparent" />
                </View>
                <View style={styles.button}>
                    <Button title="Clear" onPress={handleClear} color="transparent" />
                </View>
                <Image source={require("../../../assets/ecoTreesSnow.png")} style={{ position: 'absolute', bottom: -40, width: '100%', height: 160 }} />
            </ImageBackground>
            <Snowfall style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} snowflakeCount={250} />
            <Footer style={{ height: 18 }} navigation={navigation} />
        </View>
    );
};

export default Exercise;