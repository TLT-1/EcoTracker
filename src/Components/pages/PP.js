import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Footer from '../Footer';
import Navbar from '../Navbar';

function PP({ navigation }) {
    return (
        <View style={styles.container}>
            <View style={styles.navbarContainer}>
                <Navbar />
            </View>
            <View style={styles.scrollViewContainer}>
                <ScrollView style={styles.scrollView}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>
                            {"\nPrivacy Policy"}
                        </Text>
                    </View>
                    <Text style={styles.text}>
                        {`                      
        Updated: 11/07/2023

        **1. Introduction**

        Thank you for using EcoTrack, a mobile application aimed at promoting environmental consciousness. EcoTrack is committed to protecting your privacy and ensuring the security of your personal information. 
        This Privacy Policy explains how we collect, use, and safeguard your data when you use our application. By using EcoTrack, you agree to the terms outlined in this policy.

        **2. Information We Collect**

        2.1. User-Provided Information: To provide you with personalized insights and recommendations for reducing your carbon footprint, EcoTrack may collect the following information:
        - Name
        - Email address
        - User-provided data on your daily activities, such as driving habits, energy consumption, dietary choices, and more.

        2.2. Automatically Collected Information: EcoTrack may also collect the following information automatically:
        - Device information, including the type of mobile device you use, unique device identifiers, and operating system.
        - Usage data, such as the date and time you access the app and your interactions with it.
        - Geolocation data, if you grant permission for the app to access your location information.

        **3. How We Use Your Information*

        EcoTrack uses the collected information to:
        - Calculate your carbon footprint based on your daily activities.
        - Provide personalized insights and recommendations for reducing your carbon footprint.
        - Improve the functionality and performance of the EcoTrack app.
        - Respond to your requests and communicate with you.

        **4. Sharing Your Information**

        We do not share your personal information with third parties, except in the following circumstances:
        - With your explicit consent.
        - When required by law, such as to comply with a subpoena or similar legal process.
        - In connection with a merger, acquisition, or sale of all or a portion of our assets.

        **5. Data Security**

        EcoTrack takes data security seriously and employs appropriate measures to safeguard your information. However, no method of transmission over the internet or electronic storage is entirely secure, and we cannot guarantee absolute security.

        **6. Your Choices**

        You can choose not to provide certain information or revoke your consent to collect specific data, but doing so may limit your access to certain features of the EcoTrack app.

        **7. Updates to this Privacy Policy**

        EcoTrack may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. We encourage you to review this Privacy Policy periodically.

        **8. Contact Us**

        If you have any questions or concerns about this Privacy Policy, please contact us at EcoTracker2023@gmail.com
`}
                    </Text>
                </ScrollView>
            </View>
            <Footer />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollViewContainer: {
        flex: 1,
        paddingTop: 80,
    },
    navbarContainer: {
        position: 'absolute',
        top: 0,
        width: '100%',
        zIndex: 1,
    },
    text: {
        fontSize: 18,
        fontWeight: '600',
        color: 'black',
        paddingBottom: 20,
    },
    titleContainer: {
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        textAlign: 'center',
        fontWeight: 'bold',
    },
});

export default PP;