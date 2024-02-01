import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Clipboard } from 'react-native';

const InviteButton = () => {
    const inviteLink = "http://localhost:19006/Title";

    const copyToClipboard = () => {
        Clipboard.setString(inviteLink);
    };

    return (
        <View style={{}}>
            <TouchableOpacity style={styles.button} onPress={copyToClipboard}>
                <Text style={styles.buttonText}>INVITE FRIENDS</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#062A52',
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 4,
        overflow: 'hidden',
        width: 150,
        borderColor: 'white', // Set the border color to white
        borderWidth: 2,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: '600'
    },
});

export default InviteButton;