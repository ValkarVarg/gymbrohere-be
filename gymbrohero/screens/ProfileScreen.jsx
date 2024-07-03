import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export const ProfileScreen = () => {
	const testUser = {
		username: 'Chad',
		height: '190cm',
		weight: '100kg',
		age: '40',
		net_worth: '£140 mill',
		goal: 'Get swole for the ladies',
	};

	const [user, setUser] = useState(null);

	useEffect(() => {
		setUser(testUser);
	}, []);

	if (!user) {
		return (
			<View style={styles.container}>
				<Text>Loading...</Text>
			</View>
		);
	}

	return (
		<View style={styles.container}>
			<Image source={require('../images/Bro.png')} style={styles.image} resizeMode="cover" />
			<Text style={styles.text}>Name: {user.username}</Text>
			<Text style={styles.text}>Height: {user.height}</Text>
			<Text style={styles.text}>Weight: {user.weight}</Text>
			<Text style={styles.text}>Age: {user.age}</Text>
			<Text style={styles.text}>Net Worth: {user.net_worth}</Text>
			<Text style={styles.text}>Goal: {user.goal}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		padding: 20,
	},
	image: {
		width: 200,
		height: 200,
	},
	text: {
		marginTop: 20,
		fontSize: 18,
	},
});
