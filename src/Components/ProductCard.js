// ProductCard.js
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const cardMargin = 20; // Adjust the margin as needed
const cardWidth = (windowWidth / 3) - (cardMargin * 2); // Three cards per row with margins


const ProductCard = ({ bestsellerLabel, productName, productDesc, imageSrc, onLikePress }) => {
    return (
        <View style={styles.cardContainer}>
            <Text style={styles.bestsellerLabel}>{bestsellerLabel}</Text>
            <Image source={imageSrc} style={styles.productImage} />
            <Text style={styles.productName}>{productName}</Text>
            <Text style={styles.productDesc}>{productDesc}</Text>
            <TouchableOpacity onPress={onLikePress} style={styles.likeButton}>
                <Text>👍</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        padding: 16, // Adjust padding if necessary to reduce size
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        shadowOpacity: 0.1,
        flex: 1,
        flexBasis: '30%',
        flexGrow: 0,
        flexShrink: 1,
        margin: 10,
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
        width: '100%', // Slightly less than full width to add padding
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
