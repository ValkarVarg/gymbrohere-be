import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Pressable } from 'react-native';
import { fetchWorkouts, fetchIndividualWorkouts, fetchExercises } from '../api';

export const WorkoutsScreen = ({ navigation, userId }) => {
	const [workoutPlan, setWorkoutPlan] = useState([]);
	const [individualWorkout, setIndividualWorkout] = useState([]);
	const [allExercises, setAllExercises] = useState([]);

	useEffect(() => {
		const fetchWorkoutData = async () => {
			try {
				const response = await fetchWorkouts(userId); // change userId to 1 in order to see some workouts - no workouts currently stored on admin
				if (response) {
					setWorkoutPlan(response);
				}
			} catch (error) {
				console.log(error, '<--- Error fetching workouts');
			}
		};
		fetchWorkoutData();
	}, [userId]);

	useEffect(() => {
		const fetchAllIndividualWorkouts = async () => {
			try {
				if (workoutPlan.length > 0) {
					const promises = workoutPlan.map((plan) => fetchIndividualWorkouts(plan.workout_plan_id));
					const workouts = await Promise.all(promises);
					const flatWorkouts = workouts.flat();
					setIndividualWorkout(flatWorkouts);
				}
			} catch (error) {
				console.log(error, '<--- Error fetching individual workouts');
			}
		};
		if (workoutPlan.length > 0) {
			fetchAllIndividualWorkouts();
		}
	}, [workoutPlan]);

	useEffect(() => {
		const fetchAllExercises = async () => {
			try {
				const response = await fetchExercises();
				if (response) {
					const simplifiedExercises = response.map((exercise) => ({
						exercise_id: exercise.exercise_id,
						exercise_name: exercise.exercise_name,
					}));
					setAllExercises(simplifiedExercises);
				}
			} catch (error) {
				console.log(error, '<--- Error fetching exercises');
			}
		};
		fetchAllExercises();
	}, []);

	const WorkoutControls = ({ workout }) => {
		const handleStartWorkout = () => {
			const workoutData = {
				workout_name: workout.workout_plan_name,
				workout_stack: individualWorkout
					.filter((ex) => ex && ex.workout_plan_id === workout.workout_plan_id)
					.map((exercise) => {
						const exerciseDetails = allExercises.find((ex) => ex.exercise_id === exercise.exercise_id);
						return {
							exerciseName: exerciseDetails ? exerciseDetails.exercise_name : 'Unknown Exercise',
							sets: exercise.set_id,
							reps: exercise.reps,
							weight: exercise.weight,
						};
					}),
			};
			navigation.navigate('Run Workout', { workout: workoutData });
		};

		return (
			<View style={styles.workoutControls}>
				<Pressable onPress={handleStartWorkout} style={[styles.button, styles.startButton]}>
					<Text style={[styles.buttonText, styles.semiboldText]}>Start</Text>
				</Pressable>
				<Pressable style={[styles.button, styles.deleteButton]}>
					<Text style={[styles.buttonText, styles.semiboldText]}>Delete</Text>
				</Pressable>
			</View>
		);
	};

	const WorkoutItem = ({ workout }) => {
		const exerciseGroups = {};
		individualWorkout.forEach((w) => {
			if (w && w.workout_plan_id === workout.workout_plan_id) {
				if (!exerciseGroups[w.exercise_id]) {
					exerciseGroups[w.exercise_id] = [];
				}
				exerciseGroups[w.exercise_id].push(w);
			}
		});

		return (
			<View>
				{Object.keys(exerciseGroups).length > 0 ? (
					Object.keys(exerciseGroups).map((exerciseId, index) => {
						const exercises = exerciseGroups[exerciseId];
						const exerciseDetails = allExercises.find((ex) => ex.exercise_id === parseInt(exerciseId));
						return (
							<View key={index} style={styles.exerciseContainer}>
								<Text style={[styles.exerciseName, styles.greenText, styles.boldText]}>{exerciseDetails ? exerciseDetails.exercise_name : 'Unknown Exercise'}</Text>
								{exercises.map((exercise, subIndex) => (
									<View key={subIndex} style={styles.exerciseDetails}>
										<Text style={[styles.greenText, styles.regularText]}>
											<Text style={styles.boldText}>Set: </Text>
											{exercise.set_id}
										</Text>
										<Text style={[styles.greenText, styles.regularText]}>
											<Text style={styles.bold}>Reps: </Text>
											{exercise.reps}
										</Text>
										<Text style={[styles.greenText, styles.regularText]}>
											<Text style={styles.bold}>Weight: </Text>
											{exercise.weight}kg
										</Text>
									</View>
								))}
							</View>
						);
					})
				) : (
					<Text style={[styles.noWorkout, styles.greenText, styles.regularText]}>No exercises found for this workout plan!</Text>
				)}
				<WorkoutControls workout={workout} />
			</View>
		);
	};

	return (
		<View style={[styles.container]}>
			<Text style={[styles.header, styles.boldText, styles.greenText]}>- Your Workouts -</Text>
			<FlatList
				data={workoutPlan}
				keyExtractor={(item) => item.workout_plan_id.toString()}
				renderItem={({ item }) => (
					<View style={styles.workoutItemContainer}>
						<Text style={[styles.workoutName, styles.boldText, styles.greenText]}>Plan: {item.workout_plan_name}</Text>
						<WorkoutItem workout={item} />
					</View>
				)}
			/>
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
	workoutControls: {
		flexDirection: 'row',
		justifyContent: 'center',
		marginTop: 7,
		gap: 25,
	},
	button: {
		alignItems: 'center',
		justifyContent: 'center',
		padding: 5,
		borderRadius: 4,
		marginHorizontal: 5,
		width: 100,
		textTransform: 'uppercase',
		letterSpacing: 2,
		borderWidth: 4,
		borderColor: 'white',
	},
	startButton: {
		backgroundColor: 'dodgerblue',
	},
	deleteButton: {
		backgroundColor: 'orangered',
	},
	buttonText: {
		color: 'white',
		letterSpacing: 3,
		textTransform: 'uppercase',
	},
	workoutItemContainer: {
		marginBottom: 16,
		borderWidth: 4,
		borderRadius: 4,
		borderColor: '#69C56D',
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
	workoutName: {
		textAlign: 'center',
		fontSize: 18,
		textTransform: 'capitalize',
	},
	noWorkout: {
		textAlign: 'center',
		margin: 15,
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

export default WorkoutsScreen;
