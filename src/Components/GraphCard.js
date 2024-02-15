// GraphCard.js
import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, Platform, TouchableOpacity } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

// html2canvas is only needed for web, so ensure it's imported conditionally
let html2canvas;
if (Platform.OS === 'web') {
    html2canvas = require('html2canvas');
}

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const GraphCard = ({ title, data, chartConfig, onIncrement, onDecrement }) => {
    // Ref for the chart container
    const chartRef = useRef(null);

    // Default chartConfig
    const defaultConfig = {
        backgroundColor: '#FFFFFF',
        backgroundGradientFrom: '#FFFFFF',
        backgroundGradientTo: '#FFFFFF',
        decimalPlaces: 2, // specify the number of decimal places you want
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // make sure this is a function
        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,

    };

    const downloadChart = async () => {
        if (Platform.OS === 'web' && chartRef.current && html2canvas) {
            const canvas = await html2canvas(chartRef.current);
            const dataURL = canvas.toDataURL('image/png');
            const link = document.createElement('a');
            link.download = `${title.replace(/\s+/g, '_')}.png`;
            link.href = dataURL;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };
    const combinedChartConfig = { ...defaultConfig, ...chartConfig };


    const renderControlButtons = () => (
        <View style={styles.controlsRow}>
            {data.labels.map((_, index) => (
                <View key={index} style={styles.controlsColumn}>
                    <TouchableOpacity
                        style={styles.controlButton}
                        onPress={() => onIncrement(index)}
                    >
                        <Text style={styles.controlButtonText}>+</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.controlButton}
                        onPress={() => onDecrement(index)}
                    >
                        <Text style={styles.controlButtonText}>-</Text>
                    </TouchableOpacity>
                </View>
            ))}
        </View>
    );

    return (
        <View style={styles.graphContainer} ref={chartRef}>
            <Text style={styles.title}>{title}</Text>
            <LineChart
                data={data}
                width={screenWidth * 0.28} // Adjusted for demonstration
                height={screenHeight * 0.22} // Adjusted for demonstration
                chartConfig={combinedChartConfig}
                bezier // This will make the line chart curved
            />
            {Platform.OS === 'web' && (
                <TouchableOpacity style={styles.downloadButton} onPress={downloadChart}>
                    <Text style={styles.downloadButtonText}>Download</Text>
                </TouchableOpacity>
            )}



            {renderControlButtons()}
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
        position: 'relative', // For positioning the download button
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    downloadButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: '#062A52',
        padding: 8,
        borderRadius: 5,
    },
    downloadButtonText: {
        color: 'white',
        fontSize: 14,
    },
    intakeButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        position: 'absolute', // Positioning at the bottom of the graph
        bottom: 10,
        width: '100%',
        paddingLeft: 24, // Padding to align with the graph content
        paddingRight: 24,
    },
    intakeButton: {
        padding: 4,
        backgroundColor: 'blue',
        borderRadius: 4,
    },
    intakeButtonText: {
        color: 'white',
        fontSize: 12,
    },
    controlButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        position: 'absolute',
        bottom: 10,
        left: 10,
    },
    controlsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 4,
    },
    controlsColumn: {
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 19,
    },
    controlButton: {
        backgroundColor: '#062A52',
        borderRadius: 30,
        marginVertical: 1,
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    controlButtonText: {
        color: 'white',
        fontSize: 16,
    },
});

export default GraphCard;
