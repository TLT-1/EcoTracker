import React from 'react';
import { StatusBar, View } from 'react-native';
import TitleScreen from './src/Components/pages/TitleScreen';

const App = () => {
    return (
        <View style={{ flex: 1 }}>
            <TitleScreen />
            <StatusBar style="auto" />
        </View>
    );
}

export default App;