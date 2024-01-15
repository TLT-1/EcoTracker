// InfoCard.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const InfoCard = ({ title, value, comparison }) => {
    return (
        <View style={styles.cardContainer}>
            <Text style={styles.cardTitle}>{title}</Text>
            <Text style={styles.cardValue}>{value}</Text>
            <Text style={styles.cardComparison}>{comparison}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        padding: 20,
        margin: 10,
        width: '45%', // Adjust the width as needed
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3,
    },
    cardTitle: {
        fontSize: 16,
        color: '#333',
        marginBottom: 5,
    },
    cardValue: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    cardComparison: {
        fontSize: 14,
        color: '#666',
    },
});

export default InfoCard;