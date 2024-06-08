// CarbonFootprintInfo.js
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const CarbonFootprintInfo = () => {
    return (
        <View style={styles.container}>
            <Image source={require('../../assets/reduceCarbonfootprint.png')} style={styles.image} />
            
            <View style={styles.textContainer}>
                <Text style={styles.header}>Why Reduce Your Carbon Footprint?</Text>
                <Text style={styles.description}>
                    By lowering your emissions, you can contribute to slowing down climate
                    change and protecting the environment.
                </Text>
                <View style={styles.card}>
                    <Text style={styles.cardHeader}>Health Benefits</Text>
                    <Text style={styles.cardContent}>
                        Improved air quality. Reducing carbon footprints means reducing air
                        pollution, leading to healthier communities and improved respiratory
                        health for everyone.
                    </Text>
                    <Text style={styles.cardFooter}>Dr. Emma Green</Text>
                </View>
                <View style={styles.card}>
                    <Text style={styles.cardHeader}>Sustainable Lifestyle</Text>
                    <Text style={styles.cardContent}>
                        Embracing a sustainable lifestyle boosts your self-sufficiency and
                        resilience while reducing reliance on finite resources.
                    </Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 50,
        padding: 50,
        backgroundColor: '#fff',
    },
    image: {
        width: '50%', // Adjust the width as necessary
        height: '100%', // Adjust the height as necessary
        resizeMode: 'contain',
    },
    textContainer: {
        width: '50%', // Adjust the width as necessary
        paddingHorizontal: 20,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
        marginBottom: 20,
    },
    card: {
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 20,
        marginBottom: 20,
    },

    cardHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    cardContent: {
        fontSize: 14,
        marginBottom: 10,
    },
    cardFooter: {
        fontSize: 12,
        color: '#aaa',
        textAlign: 'right',
    },
});

export default CarbonFootprintInfo;
