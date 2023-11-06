import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import FooterStyles from "./Styles/FooterStyles";

const Footer = ({ style }) => {
    return (
        <View style={{ ...FooterStyles.footer, ...style, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
            <TouchableOpacity style={{ marginLeft: 100 }}>
                <Text style={FooterStyles.footerText}>Privacy Policy</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ marginLeft: 100 }}>
                <Text style={FooterStyles.footerText}>Terms of Service</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ marginLeft: 100, marginRight: 100 }}>
                <Text style={FooterStyles.footerText}>Contact</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Footer;
