import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, TextInput, Keyboard } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

const Test = ({ title }) => {
    const [data, setData] = useState({
        labels: Array.from({ length: 30 }, (_, i) => (i + 1).toString()), // Labels for each day of the month
        datasets: [{
            data: Array.from({ length: 30 }, () => Math.random() * 100), // Initial random data
        }],
    });
    const [inputValue, setInputValue] = useState('');
    const [selectedDay, setSelectedDay] = useState(null);

    // Generate a random number based on user input
    const generateRandomData = (userInput) => {
        const maxChange = 5;
        const randomChange = Math.floor(Math.random() * (maxChange * 2 + 1)) - maxChange;
        return Math.max(0, userInput + randomChange);
    };

    // Update the data for a specific day with the user's input
    const handleSubmit = () => {
        const userValue = Number(inputValue);
        if (!isNaN(userValue) && selectedDay !== null) {
            const newData = [...data.datasets[0].data];
            newData[selectedDay] = generateRandomData(userValue);
            setData({
                ...data,
                datasets: [{ ...data.datasets[0], data: newData }],
            });
            setSelectedDay(null);
            setInputValue('');
            Keyboard.dismiss();
        }
    };

    // Chart configuration
    const chartConfig = {
        backgroundColor: '#FFFFFF',
        backgroundGradientFrom: '#FFFFFF',
        backgroundGradientTo: '#FFFFFF',
        decimalPlaces: 2,
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        // ...other properties
    };

    return (
        <View style={styles.graphContainer}>
            <Text style={styles.title}>{title}</Text>
            <LineChart
                data={data}
                width={screenWidth}
                height={220}
                chartConfig={chartConfig}
                bezier
            />

            {/* Input field for user interaction */}
            {selectedDay !== null && (
                <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>Enter your miles drove for day {selectedDay + 1}:</Text>
                    <TextInput
                        style={styles.input}
                        value={inputValue}
                        onChangeText={setInputValue}
                        keyboardType='numeric'
                        onSubmitEditing={handleSubmit}
                        returnKeyType='done'
                        placeholder="Input value"
                    />
                </View>
            )}

            {/* Day labels */}
            <View style={styles.labelsContainer}>
                {data.labels.map((label, index) => (
                    <TouchableOpacity
                        key={label}
                        style={styles.label}
                        onPress={() => setSelectedDay(index)}
                    >
                        <Text style={styles.labelText}>{label}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    graphContainer: {
        alignItems: 'center',
        backgroundColor: '#FFF',
        padding: 16,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowRadius: 5,
        shadowOpacity: 0.2,
        elevation: 6,
        margin: 10,
        position: 'relative',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    inputContainer: {
        alignItems: 'center',
        marginTop: 12,
    },
    inputLabel: {
        fontSize: 16,
        color: '#333',
        marginBottom: 4,
    },
    input: {
        borderWidth: 1,
        borderColor: '#CCCCCC',
        borderRadius: 5,
        padding: 8,
        width: '80%',
        fontSize: 16,
        color: '#333',
        textAlign: 'center',
        backgroundColor: '#F7F7F7',
    },
    labelsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginTop: 8,
    },
    label: {
        padding: 4,
        backgroundColor: '#EFEFEF',
        borderRadius: 5,
    },
    labelText: {
        color: 'black',
        fontSize: 12,
    },
    // ... other styles you may want to add
});

export default Test;
