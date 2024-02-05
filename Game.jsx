import React, { useEffect, useState } from 'react'
import { Button, Text, View } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Game() {
    const [bigBlind, setBigBlind] = useState(0);
    const [smallBlind, setSmallBlind] = useState(0);
    const [players, setPlayers] = useState();
    const [phase, setPhase] = useState(0);

    useEffect(()=>{
        const checkGameData = async () => {
            const gameDataStr = await AsyncStorage.getItem('@gameData');
            if (gameDataStr) { 
                const gameData = JSON.parse(gameDataStr);
                setBigBlind(gameData.big);
                setSmallBlind(gameData.small);
                setPlayers(gameData.playerData);
            }
        }
        checkGameData();
    },[])

    const testFunction = async () => {
        console.log(players.length);
        // NOTE: make the queue, just go through the players
    }

    const bid = () => {}
    const check = () => {}
    const raise = () => {}
    const call = () => {}
    const fold = () => {}

    return (
        <View>
            {/* <Text>{bigBlind}</Text> */}
            {/* <Text>{smallBlind}</Text> */}
            <Button title='TEST' onPress={testFunction} />
        </View>
    )
}
