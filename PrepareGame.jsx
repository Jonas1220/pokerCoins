import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react'
import { useState } from 'react';
import uuid from 'react-native-uuid';
import { Button, Text, TextInput, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Style from './Style';


export default function PrepareGame({start}) {
    const [totalAmount, setTotalAmount] = useState(1000);
    const [bigBlind, setBigBlind] = useState(40);
    const [smallBlind, setSmallBlind] = useState(20);
    const [players, setPlayers] = useState([{id:uuid.v4(),name:'',amount:0,playerIn:true,bid:0,checked:false}]);
    // const [gameStart, setGameStart] = useState(false);

    useEffect(()=>{
        const checkIfGameStart = async () => {
            // console.log('test');
            const check = await AsyncStorage.getItem('@gameData');
            // const check = await AsyncStorage.setItem('@gameData','playerData');
            if (check) { start(true) }
        }
        checkIfGameStart();
    },[])

    const addPlayer = () => {
        setPlayers([...players,{id:uuid.v4(),name:'',amount:0,playerIn:true,bid:0,checked:false}])
    }
    const updatePlayers = (newValue,id) => {
        // console.log(newValue);
        const updatedData = [...players];
    
        // Suche das Objekt mit der spezifizierten ID
        const updatedObjectIndex = updatedData.findIndex(obj => obj.id === id);
        
        // Überprüfe, ob das Objekt gefunden wurde
        if (updatedObjectIndex !== -1) {
            // Aktualisiere den Wert des gefundenen Objekts
            updatedData[updatedObjectIndex] = {
                ...updatedData[updatedObjectIndex],
                name: newValue,
            };
        
            // Setze den aktualisierten Zustand
            setPlayers(updatedData);
        }
    }
    const startGame = async () => {
        const updatedData = players.map(obj => ({
            ...obj,
            amount: totalAmount,
        }));
      
        // Setze den aktualisierten Zustand
        setPlayers(updatedData);
        const gameData = {
            big:bigBlind,
            small:smallBlind,
            playerData:updatedData
        }
        await AsyncStorage.setItem('@gameData',JSON.stringify(gameData));
        start(true);
        // console.log(updatedData);
    }



    const testFunction = async () => {
        // const check = await AsyncStorage.setItem('gameData','playerData');
        // try {
        //     // await AsyncStorage.setItem('my-key', 'test');
        //     // await AsyncStorage.clear();
        //     // const check = await AsyncStorage.getItem('my-key');
        //     // console.log(check);
        // } catch (e) {
            //     // saving error
            // }
                console.log(players);
    }
    return (
        <View style={Style.container}>
            <TextInput keyboardType="numeric" onChangeText={(e)=>setTotalAmount(e)} defaultValue={'1000'} placeholder={'Start Chips'} style={Style.input}/>
            <TextInput keyboardType="numeric" onChangeText={(e)=>setSmallBlind(e)} defaultValue={'20'} placeholder={'Small Blind'} style={Style.input}/>
            <TextInput keyboardType="numeric" onChangeText={(e)=>setBigBlind(e)} defaultValue={'40'} placeholder={'Big Blind'} style={Style.input}/>
            <Text>Player</Text>
            {players.map(player => {
                return <TextInput key={player.id} style={Style.input} value={player.name} onChangeText={(e)=>updatePlayers(e,player.id)} placeholder={'Name'} />
            })}
            <Button title='add player' onPress={addPlayer} />
            <Button title='Start' onPress={startGame} />
            <Button title='TEST' onPress={testFunction} />
            <StatusBar style="auto" />
        </View>
    )
}