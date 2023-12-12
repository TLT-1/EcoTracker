import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Image, ImageBackground } from 'react-native';
import useResponsiveStyles from '../Styles/TrackStyles';
import Navbar from '../Navbar';
import Footer from '../Footer';
import Snowfall from 'react-snowfall';
import axios from 'axios';
import DropDownPicker from 'react-native-dropdown-picker';

const Test = ({ navigation }) => {
    const [appliance, setAppliance] = useState('');
    const [hoursDay, setHoursDay] = useState('');
    const [energyUsed, setEnergyUsed] = useState(null);
    const [submitRequested, setSubmitRequested] = useState(false);

    const styles = useResponsiveStyles();

    const wattageMapping = {
        oven: 2400,
        stove: 1500,
        microwave: 1200,
        // Add more appliances and their respective wattage here
    };

    const getWattsForAppliance = (applianceKey) => {
        return wattageMapping[applianceKey] || null;
    };

    const calculateEnergy = () => {
        const applianceWatts = getWattsForAppliance(appliance);
        if (hoursDay && !isNaN(hoursDay) && applianceWatts) {
            const calculatedEnergy = parseFloat(applianceWatts) * parseFloat(hoursDay);
            setEnergyUsed(calculatedEnergy);
        } else {
            alert('Please enter valid hours and select an appliance.');
            setEnergyUsed(null);
        }
    };

    useEffect(() => {
        if (submitRequested && energyUsed !== null) {
            handleSubmit();
            setSubmitRequested(false);
        }
    }, [energyUsed, submitRequested]);

    const handleSubmit = async () => {
        if (!appliance) {
            alert('Please select an appliance.');
            return;
        }
        if (energyUsed === null) {
            alert('Please calculate the energy before submitting.');
            return;
        }

        try {
            const response = await axios({
                method: 'POST',
                url: 'http://localhost:5000/energy',
                headers: { 'Content-Type': 'application/json' },
                data: {
                    user_id: '652d78b1a3e79a6fa01d4140',
                    appliance: appliance,
                    watts: energyUsed,
                    hoursDay: hoursDay,
                }
            });
            console.log(response.data);
            handleClear();
        } catch (error) {
            console.error(error);
        }
    };

    const handleClear = () => {
        setAppliance('');
        setHoursDay('');
        setEnergyUsed(null);
    };

    const handleButtonPress = () => {
        setSubmitRequested(true);
        calculateEnergy();
    };

    const [open, setOpen] = useState(false);
    const [items, setItems] = useState([
        { label: 'Oven', value: 'oven' },
        { label: 'Stove', value: 'stove' },
        { label: 'Microwave', value: 'microwave' },
    ]);

    return (
        <View style={{ flex: 1 }}>
            <Navbar />
            <ImageBackground source={require("../../../assets/ecoBackgroundChristmas.png")} style={{ ...styles.container, overflow: 'hidden' }}>
                <Image source={require("../../../assets/ecoEnergy.png")} style={styles.title} />

                <Text style={styles.buttonText}>Appliance:</Text>
                <View style={styles.buttonText}>
                    <DropDownPicker
                        open={open}
                        value={appliance}
                        items={items}
                        setOpen={setOpen}
                        setValue={setAppliance}
                        setItems={setItems}
                        onChangeValue={(value) => setAppliance(value)}
                    />
                </View>

                <Text style={styles.buttonText}>Hours per day:</Text>
                <TextInput
                    style={styles.input}
                    value={hoursDay}
                    onChangeText={text => setHoursDay(text)}
                    keyboardType="numeric"
                />

                <Text style={styles.buttonText}>
                    Energy: {energyUsed !== null ? `${energyUsed} watt-hours` : ''}
                </Text>

                <View style={styles.button}>
                    <Button title="Submit" onPress={handleButtonPress} color="transparent" />
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

export default Test;
