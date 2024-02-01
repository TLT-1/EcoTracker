import React, { useState, useEffect } from "react";
import { StyleSheet, ScrollView, Text, View, Image, ImageBackground, Animated, Easing, Button, TextInput, Alert, Dimensions, TouchableOpacity, Modal } from "react-native";
import styles from "../Styles/UserAccountStyles";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import axios from 'axios';
import Navbar from "../Navbar";
import Footer from "../Footer";
import Snowfall from "react-snowfall";
import Leaderboard from './Leaderboard';
import InviteButton from "../InviteBotton";
import AddFriendsButton from "../AddFriendsButton ";

const UserAccount = () => {
    const [user, setUser] = useState({
        name: 'John Doe', // Hardcoded for demonstration
        email: 'john.doe@example.com',
        birthday: '1/4/01',
    });
    const [data, setData] = useState([]);
    const [data_to, setData_to] = useState([]);
    const [email_data, setEmailData] = useState('');
    const [dob_data, setDobData] = useState('');

    const users = [
        { name: 'Alice', score: 100 },
        { name: 'Bob', score: 90 },
        { name: 'Claire', score: 110 },
        { name: 'Claire', score: 110 },
        // ... more users
    ];



    useEffect(() => {
        fetch('http://localhost:5000/profile')
            .then(res => res.json())
            .then(initialData => {
                setData(initialData);
                // Now fetch the second piece of data using the id from the initial data
                return fetch(`http://localhost:5000/${initialData.id}/info/usersdata`);
            })
            .then(res => res.json())
            .then(secondaryData => {
                setData_to(secondaryData);
                console.log(secondaryData);
                // Fetch the third piece of data using the id from the initial data
                return fetch(`http://localhost:5000/inuseemail`);
            })
            .then(res => res.json())
            .then(thirdData => {
                // Process your thirdData here
                const backend_email = thirdData.emails[0];
                //console.log(thirdData.emails[0])
                setEmailData(backend_email);
                //console.log(email)
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
                alert("Success", response.data.message);
                setUser(prevUser => ({ ...prevUser, email: newEmail }));
                setNewEmail(''); // Clear the input field
            }
        } catch (error) {
            console.error(error);
            alert("Error", "Failed to update email");
        }
    };

    const handleEditEmail = () => {
        setEmailModalVisible(true);
    };

    const isValidEmail = email => {
        // This is a simple regex for basic email validation
        const emailRegex = /\S+@\S+\.\S+/;
        return emailRegex.test(email);
    };

    const handleSaveEmail = () => {
        // Check if the email is not empty and is valid
        if (!newEmail || !isValidEmail(newEmail)) {
            handleCloseEmailModal();
            //this doesnt 
            alert("Validation Error", "Please enter a valid email address");
            return;
        }

        // If the email is valid, proceed with the changeEmail process
        changeEmail();
        setEmailModalVisible(false); // Close the modal
        setNewEmail(''); // Reset the new email state when closing the modal
    };

    const handleCloseEmailModal = () => {
        setEmailModalVisible(false);
        setNewEmail(''); // Reset the new email state when closing the modal
    };

    const [profilePic, setProfilePic] = useState(null);

    const handleFileChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            const reader = new FileReader();

            reader.onload = (e) => {
                setProfilePic(e.target.result);
            };

            reader.readAsDataURL(event.target.files[0]);
        }
    };

    const handleChangePassword = async () => {
        // Implement navigation or modal popup for password change
        try {
            const response = await axios.post('http://localhost:5000/sendPasswordEmail', {
                email: email_data
            }, {
                headers: { 'Content-Type': 'application/json' }
            });

            // Check the server response for success and update state accordingly

        } catch (error) {
            console.error(error);
            alert("Error", "Failed to update email");
        }
        navigation.navigate('PasswordResetTemp')
    };

    const RenderIcon = () => <Text style={styles.icon}>🖉</Text>;

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Navbar />
            <ImageBackground
                source={require("../../../assets/ecoBackground.png")}
                style={styles.background}>
                <Snowfall snowflakeCount={250} />

                <div style={styles.profilePicContainer}>
                    <img style={styles.profilePic} src={profilePic} alt="" />
                    <input style={styles.fileInput} type="file" onChange={handleFileChange} />
                    {!profilePic && <div style={styles.chooseImageText}>Choose Image</div>}
                </div>
                <Text style={styles.title}>User Account</Text>
                <View style={styles.infoContainer}>
                    <Text style={styles.info}>Name: {data_to[0]} {data_to[1]}</Text>
                    <TouchableOpacity onPress={handleEditName}>
                        <RenderIcon />
                    </TouchableOpacity>

                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={handleCloseModal}>
                        <View style={styles.modalContainer}>
                            <View style={styles.modalContent}>
                                <TextInput
                                    placeholder="Enter your new name"
                                    value={newName}
                                    onChangeText={setNewName}
                                    style={styles.input}
                                />
                                <Button title="Save" onPress={handleSaveName} />
                            </View>
                        </View>
                    </Modal>
                </View>

                <View style={styles.infoContainer}>
                    <Text style={styles.info}>Email: {email_data}</Text>
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
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <TextInput
                                placeholder="Enter your new email"
                                value={newEmail}
                                onChangeText={setNewEmail}
                                style={styles.input}
                                keyboardType="email-address"
                            />
                            <Button title="Save" onPress={handleSaveEmail} />
                        </View>
                    </View>
                </Modal>

                <View style={styles.infoContainer}>
                    <Text style={styles.info}>Birthday: {data_to[5]}</Text>
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
                        <Text style={styles.buttonText}>Change Password</Text>
                    </TouchableOpacity>
                </View>
                <AddFriendsButton />
                <Leaderboard users={users} />
            </ImageBackground>
            <Footer style={styles.footer} navigation={navigation} />
        </ScrollView>
    );
};

export default UserAccount;