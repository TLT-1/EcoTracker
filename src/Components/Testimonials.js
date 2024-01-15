
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const testimonials = [
    {
        id: '1',
        name: 'John Doe',
        comment: 'EcoTrack has helped me become more aware of my carbon footprint. The personal tips are great!',
        rating: '★★★★★',
    },
    {
        id: '2',
        name: 'Jane Smith',
        comment: 'It’s great to see my progress and how small changes can make a big difference. I highly recommend it!',
        rating: '★★★★★',
    },
    // ... add more testimonials as needed
];

const TestimonialCard = ({ testimonial }) => {
    return (
        <View style={styles.card}>
            <Text style={styles.cardTitle}>{testimonial.name}</Text>
            <Text style={styles.cardRating}>{testimonial.rating}</Text>
            <Text style={styles.cardComment}>{testimonial.comment}</Text>
        </View>
    );
};

const Testimonials = () => {
    return (
        <View style={styles.container}>
            <View style={styles.textBlock}>
                <Text style={styles.header}>What Our Users Say</Text>
                <Text style={styles.subHeader}>
                    Don’t just take our word for it! See what EcoTrack users {'\n'}have to say about their experience.
                </Text>
            </View>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scrollViewContainer}>
                {testimonials.map(testimonial => (
                    <TestimonialCard key={testimonial.id} testimonial={testimonial} />
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row', // Arrange items in a row
        alignItems: 'flex-start', // Align items to the start of the cross axis
        padding: 20,
        backgroundColor: '#fff',
    },
    textBlock: {
        // Take up only as much space as needed for the text
        marginRight: 20, // Adjust the space between the textBlock and the ScrollView
    },
    header: {
        padding: 20,
        fontSize: 36,
        fontWeight: 'bold',
    },
    subHeader: {
        fontSize: 22,
        color: '#666',
        marginBottom: 20, // Adjust the space between subHeader and the cards
        padding: 5,
    },
    scrollViewContainer: {
        flexDirection: 'row',
    },
    card: {
        backgroundColor: '#e0e0e0',
        borderRadius: 6,
        padding: 20,
        marginRight: 16,
        alignItems: 'flex-start',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowRadius: 6,
        shadowOpacity: 0.1,
        elevation: 2,
        width: 250,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    cardRating: {
        color: '#f5a623',
        marginBottom: 10,
    },
    cardComment: {
        fontSize: 14,
        color: '#333',
    },
});

export default Testimonials;