import React from "react";
import { View, Text } from "react-native";
import FooterStyles from "./Styles/FooterStyles";

const Footer = () => {
    return (
        <View style={FooterStyles.footer}>
            <Text style={FooterStyles.footerText}>Privacy Policy</Text>
            <Text style={FooterStyles.footerText}>Terms of Service</Text>
            <Text style={FooterStyles.footerText}>Contact</Text>
        </View>
    );
};

export default Footer;
