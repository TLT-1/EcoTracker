import React from 'react';
import { View, Text, StyleSheet, Image, FlatList } from 'react-native';

const Leaderboard = ({ users }) => {
    // Sort users by score in descending order
    const sortedUsers = users.sort((a, b) => b.score - a.score);

    // Function to return the medal icon based on the rank
    const getMedalIcon = (rank) => {
        switch (rank) {
            case 1: return require('../../../assets/goldmedal.png');
            case 2: return require('../../../assets/silvermedal.png');
            case 3: return require('../../../assets/bronzemedal.png');
            default: return require('../../../assets/user.png');
        }
    };

    // Function to render stars based on the score
    const renderStars = (score) => {
        // Logic to convert score to star rating out of 5
        const starRating = Math.round(score / 1000); // Example conversion logic
        let stars = [];
        for (let i = 0; i < 5; i++) {
            stars.push(
                <Image
                    key={i}
                    source={i < starRating ? require('../../../assets/star.png') : require('../../../assets/emptystar.png')}
                    style={styles.starIcon}
                />
            );
        }
        return stars;
    };

    const renderItem = ({ item, index }) => (
        <View style={styles.userRow}>
            <Text style={styles.rank}>{index + 1}</Text>
            {index < 3 && (
                <Image
                    source={getMedalIcon(index + 1)}
                    style={styles.medalIcon}
                />
            )}
            <Image
                source={require('../../../assets/ecoBackground.png')} // Replace with your user icon path
                style={styles.userIcon}
            />
            <Text style={styles.name}>{item.name}</Text>
            <View style={styles.starsContainer}>
                {renderStars(item.score)}
            </View>
            <Text style={styles.score}>{item.score}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>LEADERBOARD</Text>
            <FlatList
                data={sortedUsers}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        padding: 50,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowRadius: 5,
        shadowOpacity: 0.2,
        elevation: 6,
        margin: 10,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    userRow: {
        backgroundColor: '#ffffff', // A contrasting background color
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 12, // More pronounced rounded corners
        marginVertical: 6,
        marginHorizontal: 12,
        borderWidth: 1, // A subtle border
        borderColor: '#dddddd',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowRadius: 8,
        shadowOpacity: 0.15,
        elevation: 6, // Adjust elevation for Android
        zIndex: 1, // Make sure the shadows are visible on iOS
    },
    rank: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    name: {
        fontSize: 18,
        color: '#333',
        flex: 1, // Take up the remaining space
        paddingHorizontal: 10,
    },
    score: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    medalIcon: {
        width: 30,
        height: 30,
    },
    userIcon: {
        width: 30,
        height: 30,
    },
    starsContainer: {
        flexDirection: 'row',
    },
    starIcon: {
        width: 20,
        height: 20,
    },
});

export default Leaderboard;
