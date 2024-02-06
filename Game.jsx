import React, { useEffect, useState } from 'react'
import { Button, LogBox, Text, TextInput, View } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Style from './Style';

export default function Game() {
    const [bigBlind, setBigBlind] = useState(0);
    const [smallBlind, setSmallBlind] = useState(0);
    const [players, setPlayers] = useState();
    // const [playersIn, setPlayersIn] = useState();

    // const [startRound, setStartRound] = useState(false);
    const [phase, setPhase] = useState(0);
    const [playersTurn, setPlayersTurn] = useState(0);
    const [currentBid, setCurrentBid] = useState(0);
    const [checkPossible, setCheckPossible] = useState(false);
    

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
    // useEffect(()=>{
    //     if (startRound) setPlayersIn(players?.map((player)=>player.id));
    // },[startRound])

    const handleNextPlayer = async (num) => {
        if (num==players.length-1) { handleNextPlayer(-1) }
        else if (players[num+1]['playerIn']==false) { handleNextPlayer(num+1) }
        else { setPlayersTurn(num+1) }
    }

    const testFunction = async () => {
        console.log(players);
        // NOTE: make the queue, just go through the players
    }

    const bid = () => {
        // currentBid
        const updatedData = [...players];
    
        // Suche das Objekt mit der spezifizierten ID
        const updatedObjectIndex = updatedData.findIndex(obj => obj.id === players[playersTurn]['id']);
        
        // Überprüfe, ob das Objekt gefunden wurde
        if (updatedObjectIndex !== -1) {
            // Aktualisiere den Wert des gefundenen Objekts
            updatedData[updatedObjectIndex] = {
                ...updatedData[updatedObjectIndex],
                amount: players[playersTurn]['amount']-currentBid,
            };
        
            // Setze den aktualisierten Zustand
            setPlayers(updatedData);
        }

    }
    const nextPhase = () => {
        console.log('nextPhase');
    }
    const check = () => {
        const updatedData = [...players];
    
        // Suche das Objekt mit der spezifizierten ID
        const updatedObjectIndex = updatedData.findIndex(obj => obj.id === players[playersTurn]['id']);
        
        // Überprüfe, ob das Objekt gefunden wurde
        if (updatedObjectIndex !== -1) {
            // Aktualisiere den Wert des gefundenen Objekts
            updatedData[updatedObjectIndex] = {
                ...updatedData[updatedObjectIndex],
                checked: true,
            };
            const checkIfAllCheck = updatedData.findIndex(obj => obj.checked === false);
            if (checkIfAllCheck==-1) nextPhase();
            // Setze den aktualisierten Zustand
            setPlayers(updatedData);
            
        }
        handleNextPlayer(playersTurn)
    }
    const raise = () => {console.log('raise');}
    const call = () => {console.log('call');}
    const fold = () => {
        console.log('fold');
        // currentBid
        const updatedData = [...players];
    
        // Suche das Objekt mit der spezifizierten ID
        const updatedObjectIndex = updatedData.findIndex(obj => obj.id === players[playersTurn]['id']);
        
        // Überprüfe, ob das Objekt gefunden wurde
        if (updatedObjectIndex !== -1) {
            // Aktualisiere den Wert des gefundenen Objekts
            updatedData[updatedObjectIndex] = {
                ...updatedData[updatedObjectIndex],
                playerIn: false,
            };
            // NOTE: find the remaining 
            const checkIfAllFold = updatedData.find(obj => obj.playerIn === false); 
            console.log(checkIfAllFold)
            // if (checkIfAllFold==-1) nextPhase();
            // Setze den aktualisierten Zustand
            setPlayers(updatedData);
        }
        // const updatedData = [...playersIn];
        // const updatedObjectIndex = updatedData.filter((obj) => obj !== players[playersTurn]['id'])
        // setPlayersIn(updatedObjectIndex);
        handleNextPlayer(playersTurn)
    }

    return (
        <View>
            <Text>Phase: {phase}</Text>
            {players?.length && <Text>{players[playersTurn]['name']}</Text>}
            {players?.length && <Text>{players[playersTurn]['amount']}</Text>}
            {/* <Text>{playersTurn}</Text> */}

            <TextInput keyboardType="numeric" onChangeText={(e)=>setCurrentBid(e)} placeholder={'Bid'} style={Style.input}/>
            <Button title='BID' onPress={bid} />



            {checkPossible ? <Button title='CHECK' onPress={check} /> : <Button title='FOLD' onPress={fold} />}


            <View style={{borderBottomColor: 'black',borderBottomWidth: 1,}}/>
            <Button title='TEST' onPress={testFunction} />
            <Button title='next' onPress={()=>handleNextPlayer(playersTurn)} />
        </View>
    )
}
