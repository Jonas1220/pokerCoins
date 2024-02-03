import { StatusBar } from 'expo-status-bar';
import React from 'react'
import { useState } from 'react';
import uuid from 'react-native-uuid';
import { Button, Text, TextInput, View } from 'react-native';
import Style from './Style';


export default function PrepareGame({start}) {
    const [totalAmount, setTotalAmount] = useState(100);
    const [players, setPlayers] = useState([{id:uuid.v4(),name:'',amount:0}]);
    // const [gameStart, setGameStart] = useState(false);

    const addPlayer = () => {
        setPlayers([...players,{id:uuid.v4(),name:'',amount:0}])
    }

    const updatePlayers = (newValue,id) => {
        console.log(newValue);
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
    const testFunction = () => {
        console.log(players);
    }
    const startGame = () => {
        const updatedData = players.map(obj => ({
            ...obj,
            amount: totalAmount,
        }));
      
        // Setze den aktualisierten Zustand
        setPlayers(updatedData);
        start(true);
        console.log(updatedData);
    }
    return (
        <View style={Style.container}>
            <TextInput keyboardType="numeric" onChangeText={(e)=>setTotalAmount(e)} defaultValue={'100'} placeholder={'Start Chips'} style={Style.input}/>
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