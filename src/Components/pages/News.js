import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, StyleSheet, ImageBackground } from 'react-native';
import Navbar from '../Navbar';
import Footer from '../Footer';
import Snowfall from 'react-snowfall';
import useResponsiveStyles from '../Styles/TrackStyles';

function News() {
    const [news, setNews] = useState([]);

    useEffect(() => {
        fetch('API_URL') // replace 'API_URL' with the URL of the API we are choosing
            .then(response => response.json())
            .then(data => setNews(data.articles)); // adjust this line based on the structure of the API response
    }, []);

    const renderItem = ({ item }) => (
        <View style={styles.newsItem}>
            <Text style={styles.title}>{item.title}</Text>
            {item.urlToImage && <Image style={styles.image} source={{ uri: item.urlToImage }} />}
            <Text style={styles.description}>{item.description}</Text>
        </View>
    );

    return (
        <View style={{ flex: 1, justifyContent: 'space-between' }}>
            <Navbar />
            <ImageBackground source={require("../../../assets/ecoBackgroundChristmas.png")} style={{ flex: 1, ...styles.container, overflow: 'hidden' }}>
                {news.length > 0 ? (
                    <FlatList
                        data={news}
                        renderItem={renderItem}
                        keyExtractor={item => item.url}
                    />
                ) : (
                    <View style={styles.placeholderContainer}>
                        <Text style={styles.placeholderText}>No news available</Text>
                    </View>
                )}
            </ImageBackground>
            <Snowfall style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} snowflakeCount={250} />
            <Footer style={{ height: 18 }} navigation={navigation} />
        </View>
    );
}

const styles = StyleSheet.create({
    newsItem: {
        margin: 10,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    image: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
        marginVertical: 10,
    },
    description: {
        fontSize: 16,
    },
});
export default News;