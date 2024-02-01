// GraphCard.js
import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const GraphCard = ({ title, data, chartConfig }) => {
    // Default chartConfig
    const defaultConfig = {
        backgroundColor: '#FFFFFF',
        backgroundGradientFrom: '#FFFFFF',
        backgroundGradientTo: '#FFFFFF',
        decimalPlaces: 2, // specify the number of decimal places you want
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // make sure this is a function
        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        // ...other properties
    };

    // Merge defaultConfig with the custom chartConfig, if provided
    const combinedChartConfig = { ...defaultConfig, ...chartConfig };

    return (
        <View style={styles.graphContainer}>
            <Text style={styles.title}>{title}</Text>
            <LineChart
                data={data}
                width={screenWidth * 0.28}
                height={screenHeight * 0.22}
                chartConfig={combinedChartConfig}
                bezier // This will make the line chart curved
            />
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
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    // ... other styles you may want to add
});

export default GraphCard;
