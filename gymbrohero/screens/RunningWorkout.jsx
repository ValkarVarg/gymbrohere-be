import React from 'react';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';
import Timer from '../components/Timer';

const ExerciseItem = ({ exercise }) => (
	<View style={styles.exerciseContainer}>
		<Text style={[styles.exerciseName, styles.boldText, styles.greenText]}>{exercise.exerciseName}</Text>
		{exercise.sets.map((set, index) => (
			<View key={index} style={styles.exerciseDetails}>
				<Text style={[styles.greenText, styles.regularText]}>
					<Text style={styles.boldText}>Set: </Text>
					{set.sets}
				</Text>
				<Text style={[styles.greenText, styles.regularText]}>
					<Text style={styles.boldText}>Reps: </Text>
					{set.reps}
				</Text>
				<Text style={[styles.greenText, styles.regularText]}>
					<Text style={styles.boldText}>Weight: </Text>
					{set.weight}kg
				</Text>
			</View>
		))}
	</View>
);

export const RunningWorkout = ({ route }) => {
	const { workout } = route.params;

	if (!workout || !workout.workout_stack || workout.workout_stack.length === 0) {
		return (
			<View style={styles.container}>
				<Text style={[styles.header, styles.boldText, styles.greenText]}>No workout data found!</Text>
				<Image style={styles.smallSad} source={require('../images/sadness.png')} />
			</View>
		);
	}

	const groupedExercises = workout.workout_stack.reduce((acc, curr) => {
		const exerciseName = curr.exerciseName;
		if (!acc[exerciseName]) {
			acc[exerciseName] = [];
		}
		acc[exerciseName].push(curr);
		return acc;
	}, {});

	const formattedExercises = Object.keys(groupedExercises).map((key) => ({
		exerciseName: key,
		sets: groupedExercises[key],
	}));

	return (
		<View style={styles.container}>
			<Text style={[styles.workoutName, styles.header, styles.boldText, styles.greenText]}>- {workout.workout_name} -</Text>
			<Text style={[styles.header, styles.boldText, styles.greenText]}>Workout in progress!</Text>
			<Timer />
			<View style={styles.flatListContainer}>
				<FlatList data={formattedExercises} renderItem={({ item }) => <ExerciseItem exercise={item} />} keyExtractor={(item, index) => index.toString()} />
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 10,
		backgroundColor: '#101D2D',
	},
	header: {
		fontSize: 28,
		textAlign: 'center',
		marginBottom: 15,
	},
	workoutName: {
		textTransform: 'uppercase',
    letterSpacing: 4
	},
	flatListContainer: {
		borderColor: '#69C56D',
		borderWidth: 4,
		borderRadius: 4,
		padding: 12,
	},
	exerciseContainer: {
		borderWidth: 2,
		borderColor: '#69C56D',
		borderStyle: 'dashed',
		borderRadius: 4,
		padding: 12,
		margin: 7,
	},
	exerciseName: {
		fontSize: 18,
		marginBottom: 5,
	},
	exerciseDetails: {
		marginBottom: 5,
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	smallSad: {
		width: 40,
		height: 40,
		alignSelf: 'center',
	},
	greenText: {
		color: '#69C56D',
	},
	regularText: {
		fontFamily: 'pixelify-regular',
	},
	semiboldText: {
		fontFamily: 'pixelify-semibold',
	},
	boldText: {
		fontFamily: 'pixelify-bold',
	},
});

export default RunningWorkout;
