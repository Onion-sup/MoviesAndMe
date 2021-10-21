import React from 'react';
import { View, ActivityIndicator } from 'react-native'

export function isIDInArray(array, id){
    for(var i=0; i<array.length; i++){
        if (array[i].id === id){
            return true;
        }
    }
    return false;
}

export function displayLoading(style){
    return(
    <View style={style}>
        <ActivityIndicator size="large" color="#B0C4DE"/>
    </View>
    )
}