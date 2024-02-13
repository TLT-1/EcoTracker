import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, Image, ImageBackground } from 'react-native';
import useResponsiveStyles from '../Styles/TrackStyles';
import Navbar from '../Navbar';
import Footer from '../Footer';
// import Snowfall from 'react-snowfall';
import Fact from '../Fact';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GraphCard from '../GraphCard';
import ThemeContext from '../ThemeContext';

const Water = ({ navigation }) => {
    const [waterIntake, setWaterIntake] = useState(0);
    const recommendedIntake = "15";
    const styles = useResponsiveStyles();
    const [isModalVisible, setModalVisible] = useState(true);

    const setWaterIntakeWithStorage = async (value) => {
        try {
            await AsyncStorage.setItem('@waterIntake', value.toString());
            const today = new Date();
            const dateOnly = new Date(today.getFullYear(), today.getMonth(), today.getDate()).toString();
            await AsyncStorage.setItem('@date', dateOnly);
            setWaterIntake(value);
        } catch (e) {
            // saving error
        }
    };

    const loadWaterIntake = async () => {
        try {
            const storedDate = new Date(await AsyncStorage.getItem('@date'));
            const today = new Date();
            const currentDateOnly = new Date(today.getFullYear(), today.getMonth(), today.getDate());

            if (storedDate.getFullYear() !== currentDateOnly.getFullYear() ||
                storedDate.getMonth() !== currentDateOnly.getMonth() ||
                storedDate.getDate() !== currentDateOnly.getDate()) {
                // If the stored date is different from the current date, reset the water intake
                setWaterIntake(0);
            }
        } catch (e) {
            // handle error
        }
    };

    useEffect(() => {
        loadWaterIntake();
    }, []);



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
    const [weeklyIntakeData, setWeeklyIntakeData] = useState([2, 15, 20, 8, 9, 3, 13]);

    // Function to update a specific day's intake
    const updateDailyIntake = (dayIndex) => {
        const updatedIntakeData = [...weeklyIntakeData]; // assuming this is your state array for the graph
        updatedIntakeData[dayIndex] = updatedIntakeData[dayIndex] + 1; // Increment the value
        setWeeklyIntakeData(updatedIntakeData); // Update the state
    };
    const onUpdateDailyIntake = (dayIndex) => {
        // Assuming you have a state named weeklyIntakeData to track this
        let newWeeklyData = [...weeklyIntakeData];
        newWeeklyData[dayIndex] += 1; // Increment the intake
        setWeeklyIntakeData(newWeeklyData); // Update the state
    };


    const graphData = {
        labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],

        datasets: [{
            data: weeklyIntakeData
            // ... other dataset properties
        }]
    };

    const customChartConfig = {
        // Optional custom chart configuration here
    };

    const { theme } = useContext(ThemeContext);

    return (
        <View style={{ flex: 1 }}>
            <Navbar />
            <ImageBackground source={require("../../../assets/ecoBackground.png")} style={{ ...styles.container, overflow: 'hidden' }}>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: -100 }}>
                    <Text style={{ fontSize: 26, color: "white" }}>Recommended Water Intake: {recommendedIntake} Cups Per Day (~1 Gallon)</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
                        <TouchableOpacity onPress={() => setWaterIntakeWithStorage(Math.max(0, waterIntake - 1))}>
                            <Text style={{ fontSize: 160, color: "white" }}>-</Text>
                        </TouchableOpacity>
                        <Image
                            source={
                                waterIntake >= 15 ? require("../../../assets/waterBottleEmpty.png") :
                                    waterIntake >= 12 ? require("../../../assets/waterBottle3.png") :
                                        waterIntake >= 8 ? require("../../../assets/waterBottle2.png") :
                                            waterIntake >= 4 ? require("../../../assets/waterBottle1.png") :
                                                require("../../../assets/waterBottleFull.png")
                            }
                            style={{ flex: 1, width: 400, height: 400 }}
                            resizeMode="contain"
                        />
                        <TouchableOpacity onPress={() => setWaterIntakeWithStorage(waterIntake + 1)}>
                            <Text style={{ fontSize: 120, color: "white" }}>+</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={{ fontSize: 32, marginTop: 20, color: "white" }}>Your Water Intake: {waterIntake} Cups</Text>
                </View>
                <Image
                    source={theme === 'spring' ? require("../../../assets/springTree.png") :
                        theme === 'summer' ? require("../../../assets/summerTree.png") :
                            theme === 'autumn' ? require("../../../assets/autumnTree.png") :
                                require("../../../assets/winterTree.png")}
                    style={{ position: 'absolute', bottom: -40, width: '100%', height: 160 }} />
                <Fact isModalVisible={isModalVisible} setModalVisible={setModalVisible} />



                <View style={{ ...styles.graphCardContainer, position: 'absolute', left: 0, top: '35%', padding: 10, }}>
                    <GraphCard
                        title="Weekly Water Consumption"
                        data={graphData}
                        chartConfig={customChartConfig}
                        onIncrement={onIncrement}
                        onDecrement={onDecrement}
                    />
                </View>
            </ImageBackground>
            <Footer style={{ height: 18 }} navigation={navigation} />
        </View>
    );
};

export default Water;