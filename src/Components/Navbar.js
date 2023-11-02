import React, { useState, useEffect } from 'react'; // Don't forget to import useEffect
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
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
            {windowWidth >= 1000 && (
                <View style={{ flexDirection: 'row' }}>
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
            {isMenuOpen && (
                <View
                    style={[
                        NavbarStyles.menuContainer,
                        { left: 0, right: 'auto', flexDirection: 'column' },
                    ]}
                >
                    <TouchableOpacity onPress={() => navigateToPage('Home')} style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={NavbarStyles.menuItem}>Home</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigateToPage('Track')} style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={NavbarStyles.menuItem}>Track</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigateToPage('News')} style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={NavbarStyles.menuItem}>News</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
};

export default Navbar;