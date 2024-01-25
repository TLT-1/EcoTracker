import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, ImageBackground } from 'react-native'
import useResponsiveStyles from '../Styles/TrackStyles';
import Navbar from '../Navbar';
import Footer from '../Footer';
import Fact from '../Fact';
import Snowfall from 'react-snowfall';
import axios from 'axios';
import GraphCard from '../GraphCard';


const Exercise = ({ navigation }) => {
    const [activity, setActivity] = useState('');
    const [freqPerWeek, setFreqPerWeek] = useState('');
    const [durationPerDayMin, setDurationPerDayMin] = useState('');

    const styles = useResponsiveStyles();
    const [isModalVisible, setModalVisible] = useState(true);

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


    const graphData = {
        labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],

        datasets: [{
            data: [0, 45, 128, 300, 39, 43],
            // ... other dataset properties
        }]
    };

    const customChartConfig = {
        // Optional custom chart configuration here
    };

    return (
        <View style={{ flex: 1 }}>
            <Navbar />
            <ImageBackground source={require("../../../assets/ecoBackground.png")} style={{ ...styles.container, overflow: 'hidden' }}>
                <Image source={require("../../../assets/ecoExercise.png")} style={{ ...styles.title, marginTop: -200 }} />

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
                <Fact isModalVisible={isModalVisible} setModalVisible={setModalVisible} />
            </ImageBackground>
            <Snowfall snowflakeCount={250} />
            <GraphCard title="Weekly Exercise Duration" data={graphData} chartConfig={customChartConfig} />;

            <Footer style={{ height: 18 }} navigation={navigation} />
        </View>
    );
};

export default Exercise;