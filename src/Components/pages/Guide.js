import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, Linking, ImageBackground } from 'react-native';
import Navbar from '../Navbar';
import Footer from '../Footer';

const Guide = () => {
    return (
        <View style={{ flex: 1 }}>
            <Navbar />
            <ImageBackground
                source={require("../../../assets/ecoBackground.png")}
                style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
                resizeMode='cover'>
                <Text style={{
                    color: 'white',
                    fontSize: 30,
                    textAlign: 'center',
                    textShadowColor: 'black',
                    textShadowOffset: { width: 1, height: 1 },
                    textShadowRadius: 1,
                    padding: 20
                }}>Click the IMAGE to Learn the Right Way to Recycle</Text>
                <TouchableOpacity
                    onPress={() => Linking.openURL('https://www.wm.com/us/en/recycle-right/recycling-101')}
                    style={{ width: '25%', height: '25%' }}>  {/* Reduce this percentage to shrink the image */}
                    <Image source={require("../../../assets/Recycle.png")} style={{ width: '100%', height: '100%' }} resizeMode='contain' />
                </TouchableOpacity>
            </ImageBackground>
            <Footer style={{ height: 18 }} navigation={navigation} />
        </View>
    );
};

export default Guide;