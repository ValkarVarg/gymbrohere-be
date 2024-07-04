import React from 'react';
import { View, Text, Image, StyleSheet, Button, Pressable } from 'react-native';

export const LevelUp = () => {


    return (<View style={styles.container}>
        <View style={styles.box}>
        <Image source={require('../images/Bro.png')} style={styles.image} resizeMode="cover"></Image>
        <Text style={styles.text}>You Levelled up bro!</Text>
        <Text style={styles.text}>New Items unlocked in store</Text>
        <View style= {styles.button}>
        <Pressable >
        <Text >x</Text>
        </Pressable>
        </View>
        </View>
    </View>)
}

const styles = StyleSheet.create({
	container: {
		// flex: 1,
        alignItems: 'center',
	},
    box: {
        borderRadius: 20,
		alignItems: 'center',
		padding: 20,
        backgroundColor: 'grey',
        margin: 30,
        marginTop: 100
	},
	image: {
		width: 200,
		height: 200
	},
	text: {
		marginTop: 20,
		fontSize: 18
	},
    button: {
        position: 'absolute', 
        padding: 10,
        top: 0,
        right: 0,
        width: 30,
        height: 10,
	}
});