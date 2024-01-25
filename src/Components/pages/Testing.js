import React, { useState, useEffect } from "react";
import { StyleSheet, ScrollView, Text, View, Image, ImageBackground, Animated, Easing, Touchable, Button, TextInput, Alert, Dimensions, TouchableOpacity, Modal } from "react-native";


import styles from "../Styles/TitleScreenStyles";
import ProductCard from '../ProductCard';
import InfoCard from '../InfoCard';
import GraphCard from '../GraphCard';
import Footer from '../Footer';
import Navbar from '../Navbar';
import Snowfall from 'react-snowfall';
import CarbonFootprintInfo from '../CarbonFootprintInfo';
import Testimonials from '../Testimonials';
import CommunitySignUp from '../CommunitySignUp';

const Test = ({ navigation }) => { // Make sure to receive the navigation prop if it's being used
    const [scaleValue] = useState(new Animated.Value(1));

    useEffect(() => {
        const pulseAnimation = Animated.sequence([
            Animated.timing(scaleValue, {
                toValue: 1.07,
                duration: 1500,
                easing: Easing.ease,
                useNativeDriver: true,
            }),
            Animated.timing(scaleValue, {
                toValue: 1,
                duration: 1500,
                easing: Easing.ease,
                useNativeDriver: true,
            }),
        ]);

        Animated.loop(pulseAnimation).start();
    }, [scaleValue]);

    const screenHeight = Dimensions.get('window').height;

    const handleLikePress = () => {
        // Handle the like button press
    };

    return (
        <>
            <Navbar />
            <ScrollView contentContainerStyle={styles.container}>
                <ImageBackground
                    source={require("../../../assets/ecoTrackTitleScreenChristmas.png")}
                    style={styles.titleScreen}>

                    <Animated.Image
                        source={require("../../../assets/ecoTrackLogosu.png")}
                        style={[styles.logo, { transform: [{ scale: scaleValue }] }]}
                    />

                    <View style={styles.contentContainer}>
                        <Text style={styles.title}>
                            Track and Reduce Your{'\n'}Carbon Footprint
                        </Text>
                        <Text style={styles.subtitle}>
                            Monitor your daily activities and get personalized insights and{'\n'}recommended to lower your impact.
                        </Text>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.button} onPress={() => { }}>
                                <Text style={styles.buttonText}>Learn more</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button} onPress={() => { }}>
                                <Text style={styles.buttonText}>Start tracking</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ImageBackground>

                <View style={styles.line } />

                <Text style={styles.titleto}>
                    Popular Eco-Friendly{'\n'}Products
                </Text>
                <View style={styles.productSection}>
                    <ProductCard
                        bestsellerLabel="Best Seller"
                        productName="Reusable Water Bottle"
                        productDesc="1,000 plastic bottles avoided"
                        imageSrc={require('../../../assets/reusablewaterbottle.png')}
                        onLikePress={handleLikePress}
                    />
                    <ProductCard
                        bestsellerLabel="New"
                        productName="Compostable Food Containers"
                        productDesc="50 pounds of waste diverted"
                        imageSrc={require('../../../assets/CompostableFoodContainers.png')}
                        onLikePress={handleLikePress}
                    />
                    <ProductCard
                        bestsellerLabel="Old"
                        productName="Solar Power Bank"
                        productDesc="2,000mAh of clean energy"
                        imageSrc={require('../../../assets/SolarPowerBank.png')}
                        onLikePress={handleLikePress}
                    />
                </View>

                
                <View style={styles.line} />

                <Text style={styles.titleto}>
                    Your Carbon Footprint
                </Text>
                <View style={styles.infoCardContainer}>
                    <InfoCard
                        title="Today's Emissions"
                        value="14.5kg CO2e"
                        comparison="+2% compared to yesterday"
                    />
                    <InfoCard
                        title="Total Savings"
                        value="150kg CO2e"
                        comparison="-10% compared to last month"
                    />
                </View>
                <GraphCard />
                <View style={styles.line} />

                <CarbonFootprintInfo  />
                <View style={styles.line} />

                <Testimonials />
                <View style={styles.line} />

                <CommunitySignUp />

                <Snowfall snowflakeCount={250} />
                <View style={{ height: 500, backgroundColor: 'green' }} /> {/* This is your spacer View */}
            </ScrollView>
            <Footer navigation={navigation} />
        </>
    );
};

export default Test;

