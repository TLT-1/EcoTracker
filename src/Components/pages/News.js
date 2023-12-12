import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ImageBackground, TouchableOpacity, Image } from 'react-native';
import axios from 'axios';
import Navbar from '../Navbar';
import Footer from '../Footer';
import Snowfall from 'react-snowfall';
import Modal from 'react-modal';

Modal.setAppElement('#root');

function News() {
    const [news, setNews] = useState([]);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [modalUrl, setModalUrl] = useState('');

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await axios.get('https://newsapi.org/v2/everything', {
                    params: {
                        q: 'climate change, environment',
                        sortBy: 'publishedAt',
                        apiKey: 'bde5b060f669431985e03cadc068dd43'
                    }
                });

                const excludedDomains = ['subscriber.politicopro.com', 'www.vox.com', 'www.sciencedaily.com', 'www.forbes.com', 'www.planetizen.com', 'press.un.org', 'www.rigzone.com', 'www.globenewswire.com', 'www.marketscreener.com'];

                const filteredArticles = response.data.articles.filter(article => {
                    const articleDomain = new URL(article.url).hostname;
                    return !excludedDomains.includes(articleDomain);
                });

                setNews(filteredArticles);
            } catch (error) {
                console.error(error);
            }
        };

        fetchNews();
    }, []);

    const openModal = (url) => {
        setModalUrl(url);
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity style={styles.newsItem} onPress={() => openModal(item.url)}>
                <Image
                    style={styles.image}
                    source={{ uri: item.urlToImage ? item.urlToImage : "https://i.ibb.co/2Y1WkxF/eco-Track-Title-Screen.png" }}
                />
                <Text style={styles.title}>{item.title}</Text>
            </TouchableOpacity>
        );
    };

    return (
        <View style={{ flex: 1, justifyContent: 'space-between' }}>
            <Navbar />
            <ImageBackground source={require("../../../assets/ecoBackgroundChristmas.png")} style={{ flex: 1, ...styles.container, overflow: 'hidden' }}>
                {news.length > 0 ? (
                    <FlatList
                        data={news}
                        renderItem={renderItem}
                        keyExtractor={item => item.url}
                        numColumns={2}
                        contentContainerStyle={styles.listContainer}
                        ListHeaderComponent={
                            <Text style={{ fontSize: 50, fontWeight: 'bold', color: 'white', textAlign: 'center' }}>Current News</Text>
                        }
                    />
                ) : (
                    <View style={styles.placeholderContainer}>
                        <Text style={styles.placeholderText}>No news available</Text>
                    </View>
                )}
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    contentLabel="Article Modal"
                    style={{
                        overlay: {
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: 'rgba(0, 0, 0, 0.8)',
                            backdropFilter: 'blur(5px)'
                        },
                        content: {
                            position: 'relative',
                            width: '48%',
                            height: '75%',
                            overflow: 'hidden',
                            borderColor: "#062a52",
                            marginBottom: 150,
                            borderWidth: 15,
                            borderRadius: 20
                        }
                    }}
                >
                    <div style={{ width: 'calc(100% - 4px)', height: 'calc(100% - 4px)', boxShadow: '0 6px 20px 10px rgba(0, 0, 0, 0.8)', border: '2px solid #000' }}>
                        <iframe src={modalUrl} width="100%" height="100%"></iframe>
                    </div>
                    <button onClick={closeModal} style={{ position: 'absolute', top: 0, right: 0 }}>X</button>
                </Modal>
            </ImageBackground>
            <Snowfall style={{}} snowflakeCount={250} />
            <Footer style={{ height: 18 }} navigation={navigation} />
        </View>
    );
}

const styles = StyleSheet.create({
    listContainer: {
        alignItems: 'center', // Center items horizontally
        paddingLeft: 100,
    },
    newsItem: {
        margin: 10,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        width: '45%', // Adjust the width to fit more items in a row
        alignSelf: 'center',
        borderColor: "#062a52", // Change the border color here
        borderWidth: 2,
        boxShadow: '10px 5px 10px 5px rgba(0.5, 0.5, 0.5, 0.75)',
    },
    image: {
        width: '100%', // Set the width to 100% of the parent container
        height: 200, // Set a specific height
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    source: {
        fontSize: 16,
    },
    url: {
        fontSize: 14,
        color: 'blue',
    },
});

export default News;