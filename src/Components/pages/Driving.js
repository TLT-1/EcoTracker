import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, ImageBackground } from 'react-native'
import useResponsiveStyles from '../Styles/TrackStyles';
import Navbar from '../Navbar';
import Footer from '../Footer';
import Snowfall from 'react-snowfall';
import axios from 'axios';



const Driving = ({ navigation }) => {
    const [year, setYear] = useState('');
    const [make, setMake] = useState('');
    const [model, setModel] = useState('');
    const [avgSpeed, setAvgSpeed] = useState('');

    const styles = useResponsiveStyles();

    //console.log(year, make, model);
    const handleSubmit = async () => {
        try {
            // Make POST request using axios with data
            const response = await axios({
                method: 'POST',
                url: 'http://localhost:5000/driving',
                headers: { 'Content-Type': 'application/json' },
                data: {
                    user_id: '652d78b1a3e79a6fa01d4140',
                    year: year,
                    make: make,
                    model: model,
                    avg_speed: avgSpeed
                }
            });

            //console.log(response.data);  // Print out the response data
            handleClear();
        } catch (error) {
            console.error(error);
        }
    };

    const handleClear = () => {
        setYear('');
        setMake('');
        setModel('');
        setAvgSpeed('');
    };

    return (
        <View style={{ flex: 1 }}>
            <Navbar />
            <ImageBackground source={require("../../../assets/ecoBackgroundChristmas.png")} style={{ ...styles.container, overflow: 'hidden' }}>
                <Image source={require("../../../assets/ecoVehicle.png")} style={styles.title} />

                <View style={{ marginTop: -50, flex: 1, alignItems: 'center' }}>
                    <Text style={styles.buttonText}>Year:</Text>
                    <TextInput style={styles.input} value={year} onChangeText={text => setYear(text)} />

                    <Text style={styles.buttonText}>Make:</Text>
                    <TextInput style={styles.input} value={make} onChangeText={text => setMake(text)} />

                    <Text style={styles.buttonText}>Model:</Text>
                    <TextInput style={styles.input} value={model} onChangeText={text => setModel(text)} />

                    <Text style={styles.buttonText}>Average Speed (mph):</Text>
                    <TextInput style={styles.input} value={avgSpeed} onChangeText={text => setAvgSpeed(text)} />

                    <View style={styles.button}>
                        <Button title="Submit" onPress={async () => { handleSubmit() }} color="transparent" />
                    </View>
                    <View style={styles.button}>
                        <Button title="Clear" onPress={handleClear} color="transparent" />
                    </View>
                </View>

                <Image source={require("../../../assets/ecoTreesSnow.png")} style={{ position: 'absolute', bottom: -40, width: '100%', height: '17%' }} />
            </ImageBackground>
            <Snowfall style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} snowflakeCount={250} />
            <Footer style={{ height: 18 }} navigation={navigation} />
        </View>
    );
};

export default Driving;
