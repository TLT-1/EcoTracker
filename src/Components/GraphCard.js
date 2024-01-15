// Import the components from the libraries
import React from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const GraphCard = () => {
    const screenWidth = Dimensions.get('window').width;
    const chartConfig = {
        backgroundGradientFrom: "#fff",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#fff",
        backgroundGradientToOpacity: 0.5,
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        useShadowColorFromDataset: false, // optional
        fillShadowGradient: 'grey', // THIS WILL FILL THE AREA UNDER THE LINE
        fillShadowGradientOpacity: 0.5, // OPTIONAL for the gradient
    };

    const data = {
        labels: ["January", "February", "March", "April", "May", "June"],
        datasets: [{
            data: [20, 45, 28, 80, 99, 43],
            color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
            strokeWidth: 2 // optional
        }]
    };

    return (
        <View style={styles.graphContainer}>
            <Text style={styles.title}>Monthly Emission Trends</Text>
            <LineChart
                data={data}
                width={1000}
                height={220}
                chartConfig={chartConfig}
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