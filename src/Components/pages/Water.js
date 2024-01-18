import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, ImageBackground } from 'react-native';
import useResponsiveStyles from '../Styles/TrackStyles';
import Navbar from '../Navbar';
import Footer from '../Footer';
import Snowfall from 'react-snowfall';
import Fact from '../Fact';

const Water = ({ navigation }) => {
    const [waterIntake, setWaterIntake] = useState(0);
    const recommendedIntake = "10 - 15";
    const styles = useResponsiveStyles();
    const [isModalVisible, setModalVisible] = useState(true);

    return (
        <View style={{ flex: 1 }}>
            <Navbar />
            <ImageBackground source={require("../../../assets/ecoBackground.png")} style={{ ...styles.container, overflow: 'hidden' }}>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontSize: 26, color: "white" }}>Recommended Water Intake: {recommendedIntake} Cups Per Day</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
                        <TouchableOpacity onPress={() => setWaterIntake(Math.max(0, waterIntake - 1))}>
                            <Text style={{ fontSize: 160, color: "white" }}>-</Text>
                        </TouchableOpacity>
                        <Image
                            source={require("../../../assets/waterBottle.png")}
                            style={{ flex: 1, width: 400, height: 400 }}
                            resizeMode="contain"
                        />                        <TouchableOpacity onPress={() => setWaterIntake(waterIntake + 1)}>
                            <Text style={{ fontSize: 120, color: "white" }}>+</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={{ fontSize: 32, marginTop: 20, color: "white" }}>Your Water Intake: {waterIntake} Cups</Text>
                </View>
                <Image source={require("../../../assets/ecoTreesSnow.png")} style={{ position: 'absolute', bottom: -40, width: '100%', height: 160 }} />
                <Fact isModalVisible={isModalVisible} setModalVisible={setModalVisible} />
            </ImageBackground>
            <Footer style={{ height: 18 }} navigation={navigation} />
        </View>
    );
};

export default Water;