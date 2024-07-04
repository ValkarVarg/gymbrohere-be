import React from 'react';
import { View, Text, FlatList, StyleSheet, Pressable } from 'react-native';

const testData = [
	{
		workout_id: 1,
		workout_name: 'My Bitchin Workout',
		workout_stack: [
			{ exerciseName: 'deadlift', sets: '4', reps: '10', weight: '150kg' },
			{ exerciseName: 'squat', sets: '4', reps: '10', weight: '100kg' },
			{ exerciseName: 'bench press', sets: '4', reps: '10', weight: '70kg' },
			{ exerciseName: 'military press', sets: '4', reps: '10', weight: '50kg' },
		],
	},
];

const WorkoutItem = ({ workoutName, exerciseName, sets, reps, weight, isLast }) => {
	return (
		<View>
			<Text>{workoutName}</Text>
			<View style={[styles.item, !isLast && styles.itemBorder]}>
				<Text style={[styles.exerciseName, styles.bold]}>{exerciseName} </Text>
				<View style={styles.exerciseStats}>
					<Text>
						<Text style={styles.bold}>Sets:</Text> {sets}{' '}
					</Text>
					<Text>
						<Text style={styles.bold}>Reps:</Text> {reps}{' '}
					</Text>
					<Text>
						<Text style={styles.bold}>Weight:</Text> {weight}{' '}
					</Text>
				</View>
			</View>
		</View>
	);
};

export const WorkoutsScreen = ({navigation}) => {
	return (
		<View style={styles.container}>
			<Text style={[styles.header, styles.bold]}>Workouts</Text>
			{testData.map((workout) => (
				<View style={styles.flatList}>
					<Text style={[styles.workoutName, styles.bold]}>{workout.workout_name}</Text>

					<FlatList
						data={workout.workout_stack}
						renderItem={({ item, index }) => (
							<WorkoutItem exerciseName={item.exerciseName} sets={item.sets} reps={item.reps} weight={item.weight} isLast={index === workout.workout_stack.length - 1} />
						)}
						keyExtractor={(item) => item.exerciseName}
					/>
					<View style={styles.workoutControls}>
						<Pressable onPress = {() => navigation.navigate('Run Workout', {testData})} style={[styles.button, styles.startButton]}>
							<Text style={styles.buttonText}>Run Workout</Text>
						</Pressable>
						<Pressable style={[styles.button, styles.deleteButton]}>
							<Text style={styles.buttonText}>X</Text>
						</Pressable>
					</View>
				</View>
			))}
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
	workoutControls: {
		flexDirection: 'row',
		width: 200,
	},
	button: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		padding: 10,
		borderRadius: 5,
		marginHorizontal: 5,
	},
	startButton: {
		backgroundColor: 'green',
	},
	deleteButton: {
		backgroundColor: 'red',
	},
	buttonText: {
		color: 'white',
		fontWeight: 'bold',
	},
	flatList: {
		borderColor: 'grey',
		borderWidth: 3,
		borderRadius: 5,
		padding: 5,
	},
	item: {
		padding: 5,
	},
	itemBorder: {
		borderBottomWidth: 1,
		borderBottomColor: 'gray',
	},
	workoutName: {
		textAlign: 'center',
		fontSize: 18,
	},
	exerciseName: {
		textTransform: 'capitalize',
		fontSize: 16,
		paddingBottom: 5,
	},
	exerciseStats: {
		flexDirection: 'row',
		gap: 10,
	},
});
