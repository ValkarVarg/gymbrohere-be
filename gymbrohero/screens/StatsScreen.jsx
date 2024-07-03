import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const StatsScreen = () => {
	const testStats = {
		workouts_completed: 1,
		total_workout_time: 60,
		average_session: 60,
		items_unlocked: 10,
	};

	const [stats, setStats] = useState(null);

	useEffect(() => {
		setStats(testStats);
	}, []);

	if (!stats) {
		return (
			<View style={styles.container}>
				<Text>Loading...</Text>
			</View>
		);
	}

	return (
		<View style={styles.container}>
			<Text style={[styles.header, styles.bold]}>Stats</Text>
			<View style={styles.stats}>
				<Text>
					<Text style={styles.bold}>Workouts Completed: </Text>
					{stats.workouts_completed}
				</Text>
				<Text>
					<Text style={styles.bold}>Total Workout Time: </Text>
					{stats.total_workout_time} minutes
				</Text>
				<Text>
					<Text style={styles.bold}>Average Session Time: </Text>
					{stats.average_session} minutes
				</Text>
				<Text>
					<Text style={styles.bold}>Items Unlocked: </Text>
					{stats.items_unlocked}
				</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		padding: 10,
	},
	bold: {
		fontWeight: 'bold',
	},
	header: {
		fontSize: 28,
		textAlign: 'center',
		marginBottom: 15,
	},
	stats: {
		gap: 10,
	},
});
