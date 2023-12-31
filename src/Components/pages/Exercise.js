import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, ImageBackground } from 'react-native'
import useResponsiveStyles from '../Styles/TrackStyles';
import Navbar from '../Navbar';
import Footer from '../Footer';
import Snowfall from 'react-snowfall';
import axios from 'axios';


const Exercise = ({ navigation }) => {
    const [activity, setActivity] = useState('');
    const [freqPerWeek, setFreqPerWeek] = useState('');
    const [durationPerDayMin, setDurationPerDayMin] = useState('');

    const styles = useResponsiveStyles();

    const handleSubmit = async () => {
        try {
            // Make POST request using axios with data
            const response = await axios({
                method: 'POST',
                url: 'http://localhost:5000/exercise',
                headers: { 'Content-Type': 'application/json' },
                data: {
                    user_id: '652d78b1a3e79a6fa01d4140',
                    activity: activity,
                    freqPerWeek: freqPerWeek,
                    durationPerDayMin: durationPerDayMin
                }
            });

            //console.log(response.data);  // Print out the response data
            handleClear();
        } catch (error) {
            console.error(error);
        }
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
                <TextInput style={styles.input} value={activity} onChangeText={text => setActivity(text)} />

                <Text style={styles.buttonText}>Frequency Per Week:</Text>
                <TextInput style={styles.input} value={freqPerWeek} onChangeText={text => setFreqPerWeek(text)} />

                <Text style={styles.buttonText}>Duration Per Day (min):</Text>
                <TextInput style={styles.input} value={durationPerDayMin} onChangeText={text => setDurationPerDayMin(text)} />

                <View style={styles.button}>
                    <Button title="Submit" onPress={async () => { handleSubmit() }} color="transparent" />
                </View>
                <View style={styles.button}>
                    <Button title="Clear" onPress={handleClear} color="transparent" />
                </View>
                <Image source={require("../../../assets/ecoTreesSnow.png")} style={{ position: 'absolute', bottom: -40, width: '100%', height: 160 }} />
            </ImageBackground>
            <Snowfall snowflakeCount={250} />
            <Footer style={{ height: 18 }} navigation={navigation} />
        </View>
    );
};

export default Exercise;