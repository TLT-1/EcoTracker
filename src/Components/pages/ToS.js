import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Footer from '../Footer';
import Navbar from '../Navbar';

function ToS({ navigation }) {
    return (
        <View style={styles.container}>
            <View style={styles.navbarContainer}>
                <Navbar />
            </View>
            <View style={styles.scrollViewContainer}>
                <ScrollView style={styles.scrollView}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>
                            {"\nTerms of Service"}
                        </Text>
                    </View>
                    <Text style={styles.text}>
                        {`
        Updated: 11/07/2023

        By accessing or using the EcoTrack mobile application, you agree to be bound by these Terms of Service. If you do not agree with these terms, please do not use the app.

        **1. Acceptance of Terms**

        1.1. Effective Date: These Terms of Service are effective as of the date of your first use of the EcoTrack app.
        1.2. Updates: EcoTrack may update these Terms of Service from time to time. Your continued use of the app after any changes indicate your acceptance of the updated terms. It is your responsibility to review these terms regularly.

        **2. Use of EcoTrack**

        2.1. Eligibility: You must be at least 18 years old to use EcoTrack. If you are under 18, you may use the app with the consent and supervision of a parent or legal guardian.
        2.2. User Account: To use certain features of EcoTrack, you may be required to create an account. You are responsible for maintaining the confidentiality of your account credentials and ensuring their accuracy.

        **3. Privacy**

        Your use of EcoTrack is also governed by our Privacy Policy, which can be found at: '`}

                        <Text style={{ color: 'blue' }} onPress={() => navigation.navigate('PP')}>
                            Privacy Policy
                        </Text>
                        {`' Please review this policy to understand how we collect, use, and protect your data.

        **4. User-Generated Content**

        4.1. Ownership: Any content you submit to EcoTrack, including user-provided data on daily activities, remains your property.
        4.2. License: By submitting content, you grant EcoTrack a non-exclusive, worldwide, royalty-free, and transferable license to use, display, reproduce, and distribute the content in connection with the app's services.

        **5. Prohibited Conduct**

        When using EcoTrack, you agree not to:

        5.1. Violate any applicable laws, regulations, or these Terms of Service.
        5.2. Use the app for any unlawful or unauthorized purpose.
        5.3. Interfere with the proper functioning of the app, including introducing viruses or other malicious code.
        5.4. Harass, abuse, or harm other users of the app.
        5.5. Attempt to gain unauthorized access to the app or its systems.

        **6. Termination**

        EcoTrack reserves the right to terminate your access to the app, with or without cause, at any time.

        **7. Disclaimer of Warranties**

        EcoTrack is provided "as is" without warranties of any kind, either express or implied, including, but not limited to, the implied warranties of merchantability and fitness for a particular purpose.

        **8. Limitation of Liability**

        To the fullest extent allowed by applicable law, EcoTrack and its affiliates shall not be liable for any indirect, incidental, special, consequential, or punitive damages or for any loss of profits or revenues.

        **9. Governing Law**

        These Terms of Service are governed by and construed in accordance with the laws of United States. Any legal action arising out of these terms shall be brought exclusively in the courts located within United States.

        **10. Contact Information**

        If you have any questions or concerns about these Terms of Service, please contact us at EcoTracker2023@gmail.com
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

export default ToS;