import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import NavbarStyles from './Styles/NavbarStyles';
import Icon from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-modal';

const Navbar = () => {
    const [isMenuOpen, setMenuOpen] = useState(false);
    const navigation = useNavigation();

    const toggleMenu = () => {
        setMenuOpen(!isMenuOpen);
    };

    const navigateToPage = (page) => {
        navigation.navigate(page);
    };

    const [windowWidth, setWindowWidth] = useState(Dimensions.get('window').width);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(Dimensions.get('window').width);
        };

        Dimensions.addEventListener('change', handleResize);

        return () => {
            Dimensions.removeEventListener('change', handleResize);
        };
    }, []);

    const [guideModalIsOpen, setGuideModalIsOpen] = useState(false);

    const openGuideModal = () => {
        setGuideModalIsOpen(true);
    };

    const closeGuideModal = () => {
        setGuideModalIsOpen(false);
    };

    return (
        <View style={NavbarStyles.navbar}>
            <TouchableOpacity onPress={toggleMenu}>
                <Text style={NavbarStyles.menuIcon}>☰</Text>
            </TouchableOpacity>
            {windowWidth >= 800 && (
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity onPress={() => navigation.navigate('Title')}>
                        <Text style={NavbarStyles.menuItem}>Home</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        navigation.navigate('TrackNav');
                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'Track' }],
                        });
                    }}>
                        <Text style={NavbarStyles.menuItem}>Track</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('News')}>
                        <Text style={NavbarStyles.menuItem}>News</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('Challenges')}>
                        <Text style={NavbarStyles.menuItem}>Challenges</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={openGuideModal}>
                        <Text style={NavbarStyles.menuItem}>Guide</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('UserAccount')}
                        style={{ alignItems: 'center', justifyContent: 'center', paddingLeft: 20, paddingRight: 20 }}>
                        <Icon name="user" size={30} color="#fff" />
                    </TouchableOpacity>
                    <Modal
                        isOpen={guideModalIsOpen}
                        onRequestClose={closeGuideModal}
                        contentLabel="Guide Modal"
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
                                width: '85%',
                                height: '85%',
                                overflow: 'hidden',
                                borderColor: "#062a52",
                                marginBottom: 100,
                                marginRight: 75,
                                borderWidth: 15,
                                borderRadius: 20
                            }
                        }}
                    >
                        <iframe src="https://greenlivingtoolkit.org/waste-reduction/recycle-right/" style={{ width: '100%', height: '100%' }} title="Guide"></iframe>
                        <button onClick={closeGuideModal} style={{ position: 'absolute', top: 0, right: 0 }}>X</button>
                    </Modal>
                </View>
            )}
            {isMenuOpen && (
                <View
                    style={[
                        NavbarStyles.menuContainer,
                        { left: 0, right: 'auto', flexDirection: 'column' },
                    ]}
                >
                    <TouchableOpacity onPress={() => navigation.navigate('Title')} style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={NavbarStyles.menuItemDrop}>Home</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        navigation.navigate('TrackNav');
                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'Track' }],
                        });
                    }} style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={NavbarStyles.menuItemDrop}>Track</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('News')} style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={NavbarStyles.menuItemDrop}>News</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('Challenges')} style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={NavbarStyles.menuItemDrop}>Challenges</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={openGuideModal} style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={NavbarStyles.menuItemDrop}>Guide</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('UserAccount')}
                        style={{ alignItems: 'center', justifyContent: 'center', paddingLeft: 20, paddingRight: 20 }}>
                        <Icon name="user" size={30} color="#fff" />
                    </TouchableOpacity>
                    <Modal
                        isOpen={guideModalIsOpen}
                        onRequestClose={closeGuideModal}
                        contentLabel="Guide Modal"
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
                                width: '85%',
                                height: '85%',
                                overflow: 'hidden',
                                borderColor: "#062a52",
                                marginBottom: 100,
                                marginRight: 75,
                                borderWidth: 15,
                                borderRadius: 20
                            }
                        }}
                    >
                        <iframe src="https://greenlivingtoolkit.org/waste-reduction/recycle-right/" style={{ width: '100%', height: '100%' }} title="Guide"></iframe>
                        <button onClick={closeGuideModal} style={{ position: 'absolute', top: 0, right: 0 }}>X</button>
                    </Modal>
                </View>
            )}
        </View>
    );
};

export default Navbar;