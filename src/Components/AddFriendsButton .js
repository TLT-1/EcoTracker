import React, { useState } from 'react';
import { View, Button, Modal, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import InviteButton from "./InviteBotton";

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
            <Button title="Add Friends" onPress={() => setModalVisible(true)} />

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
                                    <Text style={styles.addButton }>{addedFriends.includes(item.id) ? 'Added' : 'Add'}</Text>
                                </TouchableOpacity>
                            )}
                            keyExtractor={(item) => item.id}
                        />
                        <Button title="Close" onPress={() => setModalVisible(!modalVisible)} />
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
        marginTop: 22,
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
        backgroundColor: 'blue', // Set the button background color to blue
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
});

export default AddFriendsButton;
