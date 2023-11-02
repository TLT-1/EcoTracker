import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import NavbarStyles from './Styles/NavbarStyles';

const Navbar = () => {
    const [isMenuOpen, setMenuOpen] = useState(false);
    const navigation = useNavigation();

    const toggleMenu = () => {
        setMenuOpen(!isMenuOpen);
    };

    const navigateToPage = (page) => {
        navigation.navigate(page);
        setMenuOpen(false);
    };

    return (
        <View style={NavbarStyles.navbar}>
            <TouchableOpacity onPress={toggleMenu}>
                <Text style={NavbarStyles.menuIcon}>☰</Text>
            </TouchableOpacity>
            {isMenuOpen && (
                <View style={NavbarStyles.menuContainer}>
                    <TouchableOpacity onPress={() => navigateToPage('Home')}>
                        <Text style={NavbarStyles.menuItem}>Home</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigateToPage('Track')}>
                        <Text style={NavbarStyles.menuItem}>Track</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigateToPage('News')}>
                        <Text style={NavbarStyles.menuItem}>News</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
};

export default Navbar;
