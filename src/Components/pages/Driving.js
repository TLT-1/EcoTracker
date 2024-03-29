import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, Image, ImageBackground } from 'react-native'
import useResponsiveStyles from '../Styles/TrackStyles';
import Navbar from '../Navbar';
import Footer from '../Footer';
import Fact from '../Fact';
import Snowfall from 'react-snowfall';
import axios from 'axios';
import GraphCard from '../GraphCard';
import ThemeContext from '../ThemeContext';


const Driving = () => {
    const [formData, setFormData] = useState({
        user_id: '652d78b1a3e79a6fa01d4140',
        year: '',
        make: '',
        model: '',
        avg_speed: '',
        miles_driven: ''
    });
    const styles = useResponsiveStyles();
    const [isModalVisible, setModalVisible] = useState(true);

    const [carbonEmissions, setCarbonEmissions] = useState(null);
    const [error, setError] = useState('');

    const handleSubmit = () => {
        fetch('http://localhost:5000/driving', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then(response => response.json())
            .then(data => {
                if (data.message === "driving updated successfully") {
                    setCarbonEmissions(data.carbon_emissions);
                } else {
                    setError(data.message);
                }
            })
            .catch((error) => {
                setError('Network or server error');
            });
    };

    const handleChange = (name, value) => {
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));
    };
    const handleClear = () => {
        setFormData({
            ...formData, // this preserves any other fields in the state that you might add later
            year: '',
            make: '',
            model: '',
            avg_speed: '',
            miles_driven: ''
        });
    };

    const graphData = {
        labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        datasets: [{
            data: [2093, 2152, 4921, 0, 1790, 398, 19282],
            // ... other dataset properties
        }]
    };

    const customChartConfig = {
        // Optional custom chart configuration here
    };
    const onIncrement = (dayIndex) => {
        let newWeeklyData = [...weeklyIntakeData];
        newWeeklyData[dayIndex] += 1; // Increment the value for the day
        setWeeklyIntakeData(newWeeklyData); // Update the state
    };

    // Function to decrement the intake for a specific day
    const onDecrement = (dayIndex) => {
        let newWeeklyData = [...weeklyIntakeData];
        newWeeklyData[dayIndex] = Math.max(0, newWeeklyData[dayIndex] - 1); // Decrement the value for the day, but not below 0
        setWeeklyIntakeData(newWeeklyData); // Update the state
    };
    const [weeklyIntakeData, setWeeklyIntakeData] = useState([2093, 2152, 4921, 0, 1790, 398, 19282]);

    const { theme } = useContext(ThemeContext);

    return (
        <View style={{ flex: 1 }}>
            <Navbar />
            <ImageBackground source={require("../../../assets/ecoBackground.png")} style={{ ...styles.container, overflow: 'hidden' }}>
                {
                    theme === 'autumn' && <Snowfall snowflakeCount={100} />
                }
                {
                    theme === 'winter' && <Snowfall snowflakeCount={300} />
                }
                <Image source={require("../../../assets/ecoVehicle.png")} style={{ ...styles.title, marginTop: -50 }} />

                <View style={{ marginTop: -50, flex: 1, alignItems: 'center' }}>
                    <Text style={styles.buttonText}>Year:</Text>
                    <TextInput style={styles.input} value={formData.year}
                        onChangeText={(text) => handleChange('year', text)} />

                    <Text style={styles.buttonText}>Make:</Text>
                    <TextInput style={styles.input} value={formData.make}
                        onChangeText={(text) => handleChange('make', text)} />

                    <Text style={styles.buttonText}>Model:</Text>
                    <TextInput style={styles.input} value={formData.model}
                        onChangeText={(text) => handleChange('model', text)} />

                    <Text style={styles.buttonText}>Average Speed (mph):</Text>
                    <TextInput style={styles.input} value={formData.avg_speed}
                        onChangeText={(text) => handleChange('avg_speed', text)} />


                    <Text style={styles.buttonText}>Miles driven:</Text>
                    <TextInput style={styles.input} value={formData.miles_driven}
                        onChangeText={(text) => handleChange('miles_driven', text)} />

                    <Text style={styles.buttonText}>Carbon Used: {carbonEmissions} kg CO2</Text>



                    <View style={styles.button}>
                        <Button title="Submit" onPress={handleSubmit} color="transparent" />
                    </View>
                    <View style={styles.button}>
                        <Button title="Clear" onPress={handleClear} color="transparent" />
                    </View>
                </View>
                <Image
                    source={theme === 'spring' ? require("../../../assets/springTree.png") :
                        theme === 'summer' ? require("../../../assets/summerTree.png") :
                            theme === 'autumn' ? require("../../../assets/autumnTree.png") :
                                require("../../../assets/winterTree.png")}
                    style={{ position: 'absolute', bottom: -40, width: '100%', height: 160 }} />
                <Fact isModalVisible={isModalVisible} setModalVisible={setModalVisible} />
            </ImageBackground>
            <View style={{ ...styles.graphCardContainer, position: 'absolute', left: 0, top: '35%', padding: 10, }}>
                <GraphCard
                    title="Weekly Carbon Emissions"
                    data={graphData}
                    chartConfig={customChartConfig}
                    onIncrement={onIncrement}
                    onDecrement={onDecrement}
                />
            </View>
            <Footer style={{ height: 18 }} navigation={navigation} />
        </View>


    );
};



export default Driving;
