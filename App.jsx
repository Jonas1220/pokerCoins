import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import Style from './Style';
import PrepareGame from './PrepareGame';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PlayerView from './PlayerView';
import Game from './Game';

export default function App() {
    const [gameStart, setGameStart] = useState(false);
    const [gameData, setGameData] = useState(false);
    // await AsyncStorage.getItem('@data_btn');
    // await AsyncStorage.setItem('@cid_key',cid)
    // await AsyncStorage.removeItem('@cid_logo');
    useEffect(()=>{
        const checkGameData = async () => {
            // console.log('test');
            const check = await AsyncStorage.getItem('@gameData');
            if (!check) { setGameStart(false) }
        }
        checkGameData();
    },[])

    const testFunction = async () => {
        await AsyncStorage.clear();
        setGameStart(false);
    }

    return gameStart ? (
        <View style={Style.container}>
            <Text>Game started</Text>
            <Game />

            <Button title='Reset' onPress={testFunction} />
        </View>
    ) : (
        <PrepareGame start={setGameStart} />
    );
}
