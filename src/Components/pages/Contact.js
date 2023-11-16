import React from 'react';
import { View, Text, Linking, TouchableOpacity, ImageBackground } from 'react-native';
import Navbar from '../Navbar';
import Footer from '../Footer';

const Contact = () => {
    const handleEmailPress = () => {
        Linking.openURL('mailto:EcoTracker2023@gmail.com');
    };

    return (

        <View style={{ flex: 1 }}>
            <Navbar />
            <ImageBackground
                source={require("../../../assets/ecoBackground.png")}
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 40, fontWeight: 'bold', marginBottom: 10 }}>
                        Contact Us
                    </Text>
                    <Text style={{ marginBottom: 10, fontSize: 24, fontWeight: '700' }}>
                        For any inquiries or feedback, please email us at:
                    </Text>
                    <TouchableOpacity onPress={handleEmailPress}>
                        <Text style={{ color: 'white', fontSize: 20 }}>EcoTracker2023@gmail.com</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
            <Footer navigation={navigation} />
        </View>
    );
};

export default Contact;
