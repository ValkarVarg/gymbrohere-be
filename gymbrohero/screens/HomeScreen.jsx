import React, { useState } from 'react';
import { View, Text } from "react-native"
import { LevelUp } from "../components/LevelUp"


export default function HomeScreen() {
    const [closedLevelUp, setClosedLevelUp] = useState(false) //will need to set this state based on xp bar - requires get request 

    return (
        <View>
            {closedLevelUp ? <Text>This is the Home Screen</Text> : <LevelUp closedLevelUp={closedLevelUp} setClosedLevelUp={setClosedLevelUp}/>} 
        </View>
    )
}