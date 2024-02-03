import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import Style from './Style';
import PrepareGame from './PrepareGame';

export default function App() {
    const [gameStart, setGameStart] = useState(false);

    return gameStart ? (
        <View style={Style.container}>
            <Text>Game started</Text>
        </View>
    ) : (
        <PrepareGame start={setGameStart} />
    );
}
