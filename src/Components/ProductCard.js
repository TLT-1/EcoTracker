// ProductCard.js
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const ProductCard = ({ productName, productDesc, imageUrl, onLikePress }) => {
    return (
        <View style={styles.cardContainer}>
            <Text style={styles.bestsellerLabel}>Bestseller</Text>
            <Image source={{ uri: imageUrl }} style={styles.productImage} />
            <Text style={styles.productName}>{productName}</Text>
            <Text style={styles.productDesc}>{productDesc}</Text>
            <TouchableOpacity onPress={onLikePress} style={styles.likeButton}>
                <Text>cool</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        padding: 16,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        shadowOpacity: 0.1,
        marginVertical: 10,
        alignSelf: 'center', // Center the card in the parent view
        width: '45%', // Each card takes up roughly half the container width minus some margin
        margin: '2.5%', // Add some margin around each card
    },
    bestsellerLabel: {
        position: 'absolute',
        top: -16, // Move it outside the container
        left: 16,
        backgroundColor: 'yellow',
        padding: 4,
        borderRadius: 4,
        fontSize: 12,
        fontWeight: 'bold',
        zIndex: 1, // Make sure it's above the image
    },
    productImage: {
        width: '90%', // Slightly less than full width to add padding
        height: undefined, // Height will be calculated based on the aspect ratio
        aspectRatio: 1, // Adjust this value based on your image's aspect ratio
        resizeMode: 'contain',
        alignSelf: 'center', // Center the image within the card
    },
    productName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 8, // Add space above the product name
    },
    productDesc: {
        fontSize: 14,
        color: 'grey',
        marginBottom: 8,
    },
    likeButton: {
        // Additional styles if needed
    },
});

export default ProductCard;
