import { StyleSheet, Dimensions } from "react-native";

const screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-start",
        backgroundColor: "green", // Eventually set this to 'transparent' or your desired color
    },
    scrollViewContent: {
        flexGrow: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: 20, // Space from the top of the ScrollView
    },
    titleScreen: {
        width: "100%",
        height: screenHeight, // Set the height to the screen height
        alignItems: "center",
        justifyContent: "flex-start",
    },
    logo: {
        width: "60%", // Adjusted for a more responsive size, considering the parent's width
        height: screenHeight * 0.3, // Height proportional to the screen height
        resizeMode: "contain",
        marginTop: screenHeight * 0.1, // Push down from the top, proportionally
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'white',
    },
    subtitle: {
        fontSize: 16,
        textAlign: 'center',
        color: 'white',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
    },
    button: {
        backgroundColor: '#4CAF50',
        padding: 10,
        margin: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
    },
    contentContainer: {
        width: '100%',
        alignItems: 'center',
        paddingHorizontal: 20,
        // marginTop removed, control spacing within ScrollView
    },
    treesImage: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: 160,
    },
    line: {
        width: '100%',
        height: 10,
        backgroundColor: 'lightgrey',
        padding: 10,
    },
    titleto: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 32,
        color: 'black',// Space from the preceding element
    },
    productSectionww: {
        width: '100%', // Full width
        padding: 20,
        alignItems: 'center',
        marginBottom: 20, // Space from the bottom of the ScrollView
    },
    productSection: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center', // Center the cards in the row
        alignItems: 'flex-start',  // Allow items to wrap to next line if not enough space
        padding: 50,
    },
});

export default styles;
