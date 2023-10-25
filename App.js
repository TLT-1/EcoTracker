/*import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Animated, Easing  } from 'react-native';
import TitleScreen from './src/Components/pages/TitleScreen';

export default function App() {
       return (
        <TitleScreen />
    );
}
*/



import React from 'react';
import { StatusBar, View } from 'react-native';
import TitleScreen from './src/Components/pages/TitleScreen';

const App = () => {
    return (
        <View style={{ flex: 1 }}>
            <TitleScreen />
            <StatusBar style="auto" />
        </View>
    );
}

export default App;












//     // this code fetches the backend user data and displays it on the front end 
//     const [data, setData] = useState([])
//     useEffect(() => {
//         fetch("http://localhost:5000/usersdata").then(
//             res => res.json()
//         ).then(
//             data => {
//                 setData(data)
//                 console.log(data)
//             }
//         )
//     }, []);

//     return (
//         <View>
//             <TitleScreen />
//             <div>
//                 <h1>Data from MongoDB</h1>
//                 <ul>
//                     {data.map((item, index) => (
//                         <li key={index}>ID: {item._id}</li>
//                     ))}
//                 </ul>
//             </div>    
//             <StatusBar style="auto" />
//         </View>
//     );
// }

 
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