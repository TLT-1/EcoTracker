import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, ImageBackground, FlatList } from 'react-native'
import useResponsiveStyles from '../Styles/TrackStyles';
import Navbar from '../Navbar';
import Footer from '../Footer';
import Snowfall from 'react-snowfall';
import axios from 'axios';
import DropDownPicker from 'react-native-dropdown-picker';



const Energy = ({ navigation }) => {
    const [appliance, setAppliance] = useState('');
    const [watts, setWatts] = useState('');
    const [hoursDay, setHoursDay] = useState('');

    const styles = useResponsiveStyles();

    const handleSubmit = async () => {
        try {
            // Make POST request using axios with data
            const response = await axios({
                method: 'POST',
                url: 'http://localhost:5000/energy',
                headers: { 'Content-Type': 'application/json' },
                data: {
                    user_id: '652d78b1a3e79a6fa01d4140',
                    appliance: appliance,
                    watts: watts,
                    hoursDay: hoursDay,
                }
            });

            //console.log(response.data);  // Print out the response data
            handleClear();
        } catch (error) {
            console.error(error);
        }
    };

    const handleClear = () => {
        setAppliance('');
        setWatts('');
        setHoursDay('');
    };



    


    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        { label: 'oven', value: 'item1' },
        { label: 'stove', value: 'item2' },
        { label: 'microwave', value: 'item3' },
    ]);







    return (
        <View style={{ flex: 1 }}>
            <Navbar />
            <ImageBackground source={require("../../../assets/ecoBackgroundChristmas.png")} style={{ ...styles.container, overflow: 'hidden' }}>
                <Image source={require("../../../assets/ecoEnergy.png")} style={styles.title} />
                <Text style={styles.buttonText}>Appliance:</Text>
                <TextInput style={styles.input} value={appliance} onChangeText={text => setAppliance(text)} />


                <Text style={styles.buttonText}>Hours per day:</Text>
                <TextInput style={styles.input} value={hoursDay} onChangeText={text => setHoursDay(text)} />

                <Text style={styles.buttonText}>Watts:{watts }</Text>
                
                <View style={styles.button}>
                    <Button title="Submit" onPress={async () => { handleSubmit() }} color="transparent" />
                </View>
                <View style={styles.button}>
                    <Button title="Clear" onPress={handleClear} color="transparent" />
                </View>



                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <DropDownPicker
                        open={open}
                        value={value}
                        items={items}
                        setOpen={setOpen}
                        setValue={setValue}
                        setItems={setItems}
                    />
                </View>



                <Image source={require("../../../assets/ecoTreesSnow.png")} style={{ position: 'absolute', bottom: -40, width: '100%', height: 160 }} />
            </ImageBackground>
            <Snowfall style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} snowflakeCount={250} />
            <Footer style={{ height: 18 }} navigation={navigation} />
        </View>
    );
};

export default Energy;