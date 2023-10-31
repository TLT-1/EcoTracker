import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import FooterStyles from "./Styles/FooterStyles";

const Footer = () => {
    return (
        <View style={FooterStyles.footer}>
            <TouchableOpacity>
                <Text style={FooterStyles.footerText}>Privacy Policy</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Text style={FooterStyles.footerText}>Terms of Service</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Text style={FooterStyles.footerText}>Contact</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Footer;
