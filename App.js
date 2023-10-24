import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Animated, Easing  } from 'react-native';

export default function App() {
    const [scaleValue] = useState(new Animated.Value(1));



    // this code fetches the backend user data and displays it on the front end 
    const [data, setData] = useState([{}])
    useEffect(() => {
        fetch("http://localhost:5000/profile").then(
            res => res.json()
        ).then(
            data => {
                setData(data)
                console.log(data)
            }
        )


    }, []);







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
          source={require('./assets/ecoTrackTitleScreen.png')}
          style={styles.titleScreenImage}
                />

                
                <div>
                    {(typeof data.members === 'undefined') ? (
                        <p>Loading....</p>
                    ) : (
                            data.members.map((member, i) => (
                                <p key={i}>{member}</p>
                        ))
                    )}
                

                </div>
                


        <Animated.Image
          source={require('./assets/ecoTrackLogosu.png')}
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

/*
import { useState } from 'react'
import axios from "axios";
import logo from './logo.svg';
import './src/App.css';

function App() {

    // new line start
    const [profileData, setProfileData] = useState(null)

    function getData() {
        axios({
            method: "GET",
            url: "/profile",
        })
            .then((response) => {
                const res = response.data
                setProfileData(({
                    profile_name: res.name,
                    about_me: res.about
                }))
            }).catch((error) => {
                if (error.response) {
                    console.log(error.response)
                    console.log(error.response.status)
                    console.log(error.response.headers)
                }
            })
    }
    //end of new line 

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    Edit <code>src/App.js</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>

                {/* new line start*/
                /*
                <p>To get your profile details: </p><button onClick={getData}>Click me</button>
                {profileData && <div>
                    <p>Profile name: {profileData.profile_name}</p>
                    <p>About me: {profileData.about_me}</p>
                </div>
                }
                {/* end of new line */
                /*
            </header>
        </div>
    );
}

export default App;
*/