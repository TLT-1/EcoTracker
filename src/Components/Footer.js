import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import FooterStyles from "./Styles/FooterStyles";

const Footer = ({ style, navigation }) => {
    return (
        <View style={{ ...FooterStyles.footer, ...style, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
            <TouchableOpacity onPress={() => navigation.navigate('PP')} style={{ marginLeft: 100 }}>
                <Text style={FooterStyles.footerText}>Privacy Policy</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('ToS')} style={{ marginLeft: 100 }}>
                <Text style={FooterStyles.footerText}>Terms of Service</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Contact')} style={{ marginLeft: 100, marginRight: 50 }}>
                <Text style={FooterStyles.footerText}>Contact</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Footer;
