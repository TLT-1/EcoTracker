
/* this code will first go to the users profile on the back end and grab the id number, that will then be used for 
the "initialData.id" so that it can grab all the other data with the right extention, to change data just change ie dietarychoice to driving for the driving data */
/*
const [data, setData] = useState([]);
const [data_to, setData_to] = useState([]);

useEffect(() => {
    fetch('http://localhost:5000/profile')
        .then(res => res.json())
        .then(initialData => {
            setData(initialData);

            // Now fetch the second piece of data using the id from the initial data
            return fetch('http://localhost:5000/' + initialData.id + '/info/dietarychoice');
        })
        .then(res => res.json())
        .then(secondaryData => {
            setData_to(secondaryData);
        })
        .catch(error => {
            console.error("There was an error fetching the data:", error);
        });
}, []);
*/



/* below in the "html(ish)" you will see a calling to data.id and data_to, currently with how its set up
it will show the users id for the first one and for data_to it will show whatever is on the backend for the
extention that you have provided. Now most of it is in a list so to extract each element you can just 
index data_to ie data_to[0] and this might output 2007 if you are pulling from the driving extention */







import React, { useState, useEffect, useContext } from "react";
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
import ThemeContext from '../ThemeContext';

const TitleScreen = ({ navigation }) => { // Make sure to receive the navigation prop if it's being used
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



    const graphData = {
        labels: ["January", "February", "March", "April", "May", "June"],
        datasets: [{
            data: [20, 45, 28, 80, 99, 43],
            // ... other dataset properties
        }]
    };

    const customChartConfig = {
        // Optional custom chart configuration here
    };

    const { theme, setTheme } = useContext(ThemeContext);

    return (
        <>
            <Navbar />
            <ImageBackground source={require("../../../assets/ecoBackground.png")}>
                {
                    theme === 'autumn' && <Snowfall snowflakeCount={200} />
                }
                {
                    theme === 'winter' && <Snowfall snowflakeCount={1000} />
                }
                <ScrollView contentContainerStyle={styles.container}>
                    <ImageBackground
                        source={theme === 'spring' ? require("../../../assets/spring.png") :
                            theme === 'summer' ? require("../../../assets/summer.png") :
                                theme === 'autumn' ? require("../../../assets/autumn.png") :
                                    require("../../../assets/winter.png")}
                        style={{ ...styles.titleScreen, marginTop: -60 }}>
                        <View style={styles.themeButtonsContainer}>
                            <TouchableOpacity style={styles.themeButton} onPress={() => setTheme('spring')}>
                                <Text style={styles.buttonText}>Spring</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.themeButton} onPress={() => setTheme('summer')}>
                                <Text style={styles.buttonText}>Summer</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.themeButton} onPress={() => setTheme('autumn')}>
                                <Text style={styles.buttonText}>Autumn</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.themeButton} onPress={() => setTheme('winter')}>
                                <Text style={styles.buttonText}>Winter</Text>
                            </TouchableOpacity>
                        </View>
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
                            url="https://www.amazon.com/BJPKPK-Stainless-Insulated-Bottles-Goldenrod/dp/B08GG5TZXG/ref=sr_1_7?keywords=reusable+water+bottle&sr=8-7"
                        />
                        <ProductCard
                            bestsellerLabel="New"
                            productName="Compostable Food Containers"
                            productDesc="50 pounds of waste diverted"
                            imageSrc={require('../../../assets/CompostableFoodContainers.png')}
                            onLikePress={handleLikePress}
                            url="https://www.amazon.com/HOMETALL-Containers-Leakproof-Meal-Prep-Dishwasher/dp/B0BNQ1WDBZ/ref=sr_1_16?keywords=tupperware&sr=8-16"

                        />
                        <ProductCard
                            bestsellerLabel="Old"
                            productName="Solar Power Bank"
                            productDesc="2,000mAh of clean energy"
                            imageSrc={require('../../../assets/SolarPowerBank.png')}
                            onLikePress={handleLikePress}
                            url="https://www.amazon.com/Feeke-Solar-Charger-Power-Bank-Built-Flashlight-Electronic/dp/B0C4JSYZJN/ref=sr_1_2_sspa?keywords=solar+power+bank&sr=8-2-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&psc=1"

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
                    <GraphCard title="Monthly Carbon Emissions" data={graphData} chartConfig={customChartConfig} />
                    <View style={styles.line} />

                    <CarbonFootprintInfo />
                    <View style={styles.line} />

                    <Testimonials />
                    <View style={styles.line} />

                    <CommunitySignUp />

                    <View style={{ height: 50 }} /> {/* This is your spacer View */}
                </ScrollView>
            </ImageBackground>
            <Footer navigation={navigation} />
        </>

    );
};

export default TitleScreen;