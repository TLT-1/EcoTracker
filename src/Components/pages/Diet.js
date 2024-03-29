import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, Image, ImageBackground } from 'react-native'
import useResponsiveStyles from '../Styles/TrackStyles';
import Navbar from '../Navbar';
import Footer from '../Footer';
import Fact from '../Fact';
import Snowfall from 'react-snowfall';
import axios from 'axios';
import GraphCard from '../GraphCard';
import ThemeContext from '../ThemeContext';


const Diet = ({ navigation, route }) => {
    const [dietLevel, setDietLevel] = useState('');
    const [food, setFood] = useState('');

    const styles = useResponsiveStyles();
    const [isModalVisible, setModalVisible] = useState(true);



    const handleSubmit = async () => {
        try {
            // Make POST request using axios with data
            const response = await axios({
                method: 'POST',
                url: 'http://localhost:5000/diet',
                headers: { 'Content-Type': 'application/json' },
                data: {
                    user_id: '652d78b1a3e79a6fa01d4140',
                    dietLevel: dietLevel,
                    food: food
                }
            });

            //console.log(response.data);  // Print out the response data
            handleClear();
        } catch (error) {
            console.error(error);
        }
    };

    const handleClear = () => {
        setDietLevel('');
        setFood('');
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

    const { theme } = useContext(ThemeContext);

    return (
        <View style={{ flex: 1 }}>
            <Navbar />
            <ImageBackground source={require("../../../assets/ecoBackground.png")} style={{ ...styles.container, overflow: 'hidden' }}>
                {
                    theme === 'autumn' && <Snowfall snowflakeCount={100} />
                }
                {
                    theme === 'winter' && <Snowfall snowflakeCount={300} />
                }
                <Image source={require("../../../assets/ecoDiet.png")} style={{ ...styles.title, marginTop: -200 }} />

                <Text style={styles.buttonText}>Diet Level:</Text>
                <TextInput style={styles.input} value={dietLevel} onChangeText={text => setDietLevel(text)} />

                <Text style={styles.buttonText}>Food:</Text>
                <TextInput style={styles.input} value={food} onChangeText={text => setFood(text)} />

                <View style={styles.button}>
                    <Button title="Submit" onPress={async () => { handleSubmit() }} color="transparent" />
                </View>
                <View style={styles.button}>
                    <Button title="Clear" onPress={handleClear} color="transparent" />
                </View>
                <Image
                    source={theme === 'spring' ? require("../../../assets/springTree.png") :
                        theme === 'summer' ? require("../../../assets/summerTree.png") :
                            theme === 'autumn' ? require("../../../assets/autumnTree.png") :
                                require("../../../assets/winterTree.png")}
                    style={{ position: 'absolute', bottom: -40, width: '100%', height: 160 }} />
                <Fact isModalVisible={isModalVisible} setModalVisible={setModalVisible} />
            </ImageBackground>
            <View style={{ ...styles.graphCardContainer, position: 'absolute', left: 0, top: '35%', padding: 10, }}>
                <GraphCard
                    title="Monthly Carbon Emissions"
                    data={graphData}
                    chartConfig={customChartConfig}
                />
            </View>
            <Footer style={{ height: 18 }} navigation={navigation} />
        </View>
    );
};

export default Diet;
