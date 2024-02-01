import React from 'react';
import { View, Button, Alert } from 'react-native';
// Import Clipboard from the respective package
import { Clipboard } from 'react-native';

const InviteButton = () => {
    const inviteLink = "http://localhost:19006/Title";

    const copyToClipboard = () => {
        Clipboard.setString(inviteLink);
    };

    return (
        <View style={{ margin: 10 }}>
            <Button title="Invite Friends" onPress={copyToClipboard} />
        </View>
    );
};

export default InviteButton;
