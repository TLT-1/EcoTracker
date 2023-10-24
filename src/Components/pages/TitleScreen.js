import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Animated, Easing  } from 'react-native';

export default function App() {
    const [scaleValue] = useState(new Animated.Value(1));

  useEffect(() => {
    const pulseAnimation = Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 1.1,
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
  

  return (
    <View style={styles.container}>
      <View style={styles.titleScreen}>
        <Image
          source={require('../../../assets/ecoTrackTitleScreen.png')}
          style={styles.titleScreenImage}
        />
        <Animated.Image
          source={require('../../../assets/ecoTrackLogosu.png')}
          style={[styles.logo, { transform: [{ scale: scaleValue }] }]}
        />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}
  
const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      backgroundColor: 'transparent',
    },
    titleScreen: {
      position: 'absolute',
      alignItems: 'center',
      justifyContent: 'flex-start',
      width: '100%',
      height: '100%',
    },
    titleScreenImage: {
      flex: 1,
      width: '100%',
      height: '100%',
    },
    logo: {
        position: 'absolute',
        width: 500,
        height: 500,
        resizeMode: 'contain',
    },
  });