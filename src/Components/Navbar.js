import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import NavbarStyles from './Styles/NavbarStyles';
import Icon from 'react-native-vector-icons/FontAwesome';

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
                    <TouchableOpacity onPress={() => navigation.navigate('UserAccount')}
                        style={{ alignItems: 'center', justifyContent: 'center', paddingLeft: 20, paddingRight: 20 }}>
                        <Icon name="user" size={30} color="#fff" />
                    </TouchableOpacity>
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
                        <Text style={NavbarStyles.menuItem}>Home</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        navigation.navigate('TrackNav');
                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'Track' }],
                        });
                    }} style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={NavbarStyles.menuItem}>Track</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('News')} style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={NavbarStyles.menuItem}>News</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('Challenges')} style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={NavbarStyles.menuItem}>Challenges</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('UserAccount')}
                        style={{ alignItems: 'center', justifyContent: 'center', paddingLeft: 20, paddingRight: 20 }}>
                        <Icon name="user" size={30} color="#fff" />
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
};

export default Navbar;