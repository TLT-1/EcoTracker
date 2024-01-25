import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, ImageBackground } from 'react-native';
import useResponsiveStyles from '../Styles/TrackStyles';
import Navbar from '../Navbar';
import Footer from '../Footer';
// import Snowfall from 'react-snowfall';
import Fact from '../Fact';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { isToday } from 'date-fns';
import GraphCard from '../GraphCard';

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

            if (storedDate.toString() !== currentDateOnly.toString()) {
                // If the stored date is different from the current date, reset the water intake
                setWaterIntake(0);
            } else {
                const value = await AsyncStorage.getItem('@waterIntake');
                if (value !== null) {
                    setWaterIntake(parseInt(value));
                }
            }
        } catch (e) {
            // loading error
        }
    };

    useEffect(() => {
        loadWaterIntake();
    }, []);


    const graphData = {
        labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],

        datasets: [{
            data: [2, 15, 20, 8, 9, 3,13],
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
                <Image source={require("../../../assets/ecoTreesSnow.png")} style={{ position: 'absolute', bottom: -40, width: '100%', height: 160 }} />
                <Fact isModalVisible={isModalVisible} setModalVisible={setModalVisible} />
            </ImageBackground>
            <GraphCard title="Monthly Carbon Emissions" data={graphData} chartConfig={customChartConfig} />;

            <Footer style={{ height: 18 }} navigation={navigation} />
        </View>
    );
};

export default Water;