import React, { useState } from 'react';
import { View, Button, Modal, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import InviteButton from "./InviteButton";

const friendsList = [
    { id: '1', name: 'Alice' },
    { id: '2', name: 'Bob' },
    { id: '3', name: 'Dave' },
];

const AddFriendsButton = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [addedFriends, setAddedFriends] = useState([]);

    const handleAddFriend = (friendId) => {
        if (addedFriends.includes(friendId)) {
            setAddedFriends(addedFriends.filter(id => id !== friendId));
        } else {
            setAddedFriends([...addedFriends, friendId]);
        }
    };

    return (
        <View style={{ margin: 10 }}>
            {/* Invite Button */}
            <InviteButton />

            {/* Add Friends Button */}
            <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
                <Text style={styles.buttonText}>ADD FRIENDS</Text>
            </TouchableOpacity>
            {/* Add Friends Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Add Friends</Text>
                        <FlatList
                            data={friendsList}
                            renderItem={({ item }) => (
                                <TouchableOpacity style={styles.friendItem} onPress={() => handleAddFriend(item.id)}>
                                    <Text style={styles.friendName}>{item.name}</Text>
                                    <Text style={styles.addButton}>{addedFriends.includes(item.id) ? 'Added' : 'Add'}</Text>
                                </TouchableOpacity>
                            )}
                            keyExtractor={(item) => item.id}
                        />
                        <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(!modalVisible)}>
                            <Text style={styles.closeButtonText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 20,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    friendItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20, // Add some padding to the sides
    },
    friendName: {
        flex: 1,
        marginRight: 10, // Add space between the name and the button
    },
    addButton: {
        backgroundColor: '#062A52', // Set the button background color to blue
        color: 'white', // Set the text color to white
        paddingHorizontal: 15, // Horizontal padding for the button
        paddingVertical: 8, // Vertical padding for the button
        borderRadius: 4, // Rounded corners for the button
        overflow: 'hidden', // Ensures the borderRadius is respected
    },
    addButtonText: {
        color: 'white', // Set the button text color to white
        textAlign: 'center', // Center the text inside the button
    },
    button: {
        backgroundColor: '#062A52',
        paddingHorizontal: 10,
        paddingVertical: 10,
        marginVertical: 7,
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
    closeButton: {
        backgroundColor: '#062A52',
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 4,
        overflow: 'hidden',
    },
    closeButtonText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: '600'
    },
});

export default AddFriendsButton;
