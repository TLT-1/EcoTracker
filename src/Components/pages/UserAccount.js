import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, ImageBackground, Animated, Easing, Button, TextInput, Alert, Dimensions, TouchableOpacity, Modal } from "react-native";
import styles from "../Styles/UserAccountStyles";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import axios from 'axios';
import Footer from "../Footer";

const UserAccount = () => {
    const [user, setUser] = useState({
        name: 'John Doe', // Hardcoded for demonstration
        email: 'john.doe@example.com',
        birthday: '1/4/04',
    });
    const [data, setData] = useState([]);
    const [data_to, setData_to] = useState([]);


    useEffect(() => {
        fetch('http://localhost:5000/profile')
            .then(res => res.json())
            .then(initialData => {
                setData(initialData);

                // Now fetch the second piece of data using the id from the initial data
                return fetch('http://localhost:5000/' + initialData.id + '/info/usersdata');
            })
            .then(res => res.json())
            .then(secondaryData => {
                setData_to(secondaryData);
            })
            .catch(error => {
                console.error("There was an error fetching the data:", error);
            });
    }, []);


    const changeName = async () => {
        try {
            const response = await axios.post('http://localhost:5000/changename', {
                old_first: data_to[0],
                old_last: data_to[1],
                new_first: newNameFirst,
                new_last: newNameLast,
            }, {
                headers: { 'Content-Type': 'application/json' }
            });

            // Assuming the server response contains the updated name
            if (response.data && response.data.success) {
                setData_to([response.data.first_name, response.data.last_name]);
            }
            setData_to([newNameFirst, newNameLast]);
        } catch (error) {
            console.error(error);
        }
    };

    //console.log(data_to);
    const [modalVisible, setModalVisible] = useState(false);
    const [newName, setNewName] = useState('');
    const [newNameFirst, setNewNameFirst] = useState('');
    const [newNameLast, setNewNameLast] = useState('');

    const handleEditName = () => {
        setModalVisible(true);
    };

    const handleSaveName = () => {
        const nameParts = newName.trim().split(' ');

        // Check if both first and last name are present
        if (nameParts.length < 2) {
            alert("Please enter both first and last name");
            return;
        }

        const firstName = nameParts[0];
        const lastName = nameParts.slice(1).join(' '); // In case there's a middle name

        // Update state
        setNewNameFirst(firstName);
        setNewNameLast(lastName);

        setModalVisible(false);
        setNewName('');
    };
    const handleCloseModal = () => {
        setModalVisible(false);
        setNewName(''); // Reset the newName state when closing the modal
    };
    // useEffect will run when newNameFirst and newNameLast change
    useEffect(() => {
        // Ensure that both newNameFirst and newNameLast are not empty
        if (newNameFirst && newNameLast) {
            changeName();
        }
    }, [newNameFirst, newNameLast]); // Dependencies array





    const [newEmail, setNewEmail] = useState('');
    const [emailModalVisible, setEmailModalVisible] = useState(false);


    const changeEmail = async () => {
        try {
            const response = await axios.post('http://localhost:5000/changeemail', {
                old_first: data_to[0], 
                old_last: data_to[1],  
                new_email: newEmail,
            }, {
                headers: { 'Content-Type': 'application/json' }
            });

            // Check the server response for success and update state accordingly
            if (response.data && response.data.message) {
                Alert.alert("Success", response.data.message);
                setUser(prevUser => ({ ...prevUser, email: newEmail }));
                setNewEmail(''); // Clear the input field
            }
        } catch (error) {
            console.error(error);
            Alert.alert("Error", "Failed to update email");
        }
    };

    const handleEditEmail = () => {
        setEmailModalVisible(true);
    };

    const handleSaveEmail = () => {
        if (!newEmail) {
            Alert.alert("Validation", "Please enter a valid email address");
            return;
        }
        changeEmail();
        setEmailModalVisible(false);
    };

    const handleCloseEmailModal = () => {
        setEmailModalVisible(false);
        setNewEmail(''); // Reset the new email state when closing the modal
    };





    const handleChangePassword = () => {
        // Implement navigation or modal popup for password change
        navigation.navigate('Details')
    };

    const RenderIcon = () => <Text style={styles.icon}>🖉</Text>;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>User Account</Text>
            <View style={styles.infoContainer}>
                <Text style={styles.info}>Name: {data_to[0]} { data_to[1]}</Text>
                <TouchableOpacity onPress={handleEditName}>
                    <RenderIcon />
                </TouchableOpacity>

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={handleCloseModal}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ margin: 20, backgroundColor: 'white', borderRadius: 20, padding: 35, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5 }}>
                            <TextInput
                                placeholder="Enter your new name"
                                value={newName}
                                onChangeText={setNewName}
                                style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 20, width: '100%' }}
                            />
                            <Button title="Save" onPress={handleSaveName} />
                        </View>
                    </View>
                </Modal>


            </View>




            <View style={styles.infoContainer}>
                <Text style={styles.info}>Email: {user.email}</Text>
                <TouchableOpacity onPress={handleEditEmail}>
                    <RenderIcon />
                </TouchableOpacity>
            </View>

            {/* Email Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={emailModalVisible}
                onRequestClose={handleCloseEmailModal}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={modalStyle}>
                        <TextInput
                            placeholder="Enter your new email"
                            value={newEmail}
                            onChangeText={setNewEmail}
                            style={textInputStyle}
                            keyboardType="email-address"
                        />
                        <Button title="Save" onPress={handleSaveEmail} />
                    </View>
                </View>
            </Modal>



            <View style={styles.infoContainer}>
                <Text style={styles.info}>Birthday: {user.birthday}</Text>
                
            </View>
            <Button
                title="Change Password"
                onPress={handleChangePassword}
                style={styles.button}
            />
        </View>
    );
};

const modalStyle = {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
};

const textInputStyle = {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    width: '100%'
};

export default UserAccount;