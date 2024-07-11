import React, { useState, useEffect } from 'react';
import { Pressable, TextInput, View, Text, ScrollView, StyleSheet } from 'react-native';
import { Formik, FieldArray } from 'formik';
import { SelectList } from 'react-native-dropdown-select-list';
import { CreateSet } from '../components/CreateSet';
import { postWorkoutId, postWorkoutPlan, fetchExercises } from '../api';
import { SafeAreaView } from 'react-native-safe-area-context';

export const CreateWorkoutScreen = ({ userId }) => {
	const [newIndividualWorkout, setnewIndividualWorkout] = useState([]);
	const [selectedKey, setSelectedKey] = useState('');
	const [selectedValue, setSelectedValue] = useState('');
	const [exerciseData, setExerciseData] = useState([]);

	useEffect(() => {
		fetchExercises().then((exercises) => {
			const formattedExercises = exercises.map((exercise) => ({
				key: exercise.exercise_id,
				value: exercise.exercise_name,
			}));
			setExerciseData(formattedExercises);
		});
	}, []);

	const initialValues = {
		workout: {
			workout_plan_name: '',
			user_id: userId,
		},
		ExerciseBlock: [
			{
				exerciseId: '',
			},
		],
	};

	const handleSelect = (key) => {
		setSelectedKey(key);
		const selectedItem = exerciseData.find(item => item.key === key);
		setSelectedValue(selectedItem ? selectedItem.value : "");
	  };

	return (
		<ScrollView style={styles.container}>
			<Formik
				initialValues={initialValues}
				onSubmit={(values, { resetForm }) => {
					postWorkoutId(values.workout)
						.then((data) => {
							return [
								newIndividualWorkout.map((obj, index) => ({
									exercise_id: Number(obj.exerciseId),
									set_id: Number(obj.setId),
									reps: Number(obj.workoutReps),
									weight: Number(obj.workoutWeight),
									order_id: index + 1 
								})),
								data.workout.workout_plan_id
							];
						})
						.then(([IndividualWorkout, planId]) => {
							postWorkoutPlan(planId, IndividualWorkout);
						})
						.then((output) => {
							resetForm();
							setnewIndividualWorkout([])
							alert(JSON.stringify('your workout has been added', null, 2));
						});
				}}
			>
				{({ handleChange, handleBlur, handleSubmit, values, setFieldValue }) => (
					<View>
						<Text style={[styles.boldText, styles.greenText, styles.headingText]}>Name Your Workout:</Text>
						<TextInput onChangeText={handleChange('workout.workout_plan_name')} onBlur={handleBlur('workout.workout_plan_name')} value={values.workout.workout_plan_name} style={styles.textInput} />
						<SafeAreaView>
							<FieldArray name="ExerciseBlock">
								{(arrayHelpers) => (
									<View>
										{values.ExerciseBlock.map((block, index) => (
											<View key={index} style={styles.exerciseBlock}>
												<Text style={[styles.boldText, styles.greenText, styles.headingText]}>Exercise {index + 1}</Text>
												<SelectList
													boxStyles={styles.dropdownBox}
													dropdownStyles={styles.dropdownContainer}
													fontFamily={'pixelify-regular'}
													onSelect={() =>
														setFieldValue(
														  `ExerciseBlock[${index}].exerciseId`,
														  selectedKey
														)
													  }
													  setSelected={(key) => handleSelect(key)} 
													data={exerciseData}
													save="key"
													placeholder="select exercise"
												/>
												<CreateSet
													exerciseObject={values.ExerciseBlock[index]}
													newIndividualWorkout={newIndividualWorkout}
													setnewIndividualWorkout={setnewIndividualWorkout}
													removeExercise={() => arrayHelpers.remove(index)}
												/>
											</View>
										))}

										<Pressable
											style={[styles.button, styles.addExercise]}
											onPress={() => {
												arrayHelpers.push({
													exerciseId: '',
												});
											}}
										>
											<Text style={[styles.buttonText, styles.semiboldText]}>Add Exercise</Text>
										</Pressable>
									</View>
								)}
							</FieldArray>
						</SafeAreaView>
						<Pressable style={[styles.button, styles.createWorkout]} onPress={handleSubmit}>
							<Text style={[styles.buttonText, styles.semiboldText]}>Create Workout</Text>
						</Pressable>
					</View>
				)}
			</Formik>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 10,
		backgroundColor: '#101D2D',
	},
	textInput: {
		borderWidth: 2,
		borderColor: '#69C56D',
		borderStyle: 'dashed',
		borderRadius: 4,
		height: 40,
		marginTop: 4,
		color: '#101D2D',
		backgroundColor: '#69C56D',
		fontFamily: 'pixelify-regular',
		paddingLeft: 12,
		letterSpacing: 1.5,
	},
	exerciseBlock: {
		marginBottom: 16,
		borderWidth: 4,
		borderRadius: 4,
		borderColor: '#69C56D',
		padding: 12,
		gap: 12,
	},
	dropdownBox: {
		borderWidth: 2,
		borderColor: '#69C56D',
		borderStyle: 'dashed',
		borderRadius: 4,
		backgroundColor: '#69C56D',
	},
	dropdownInput: {
		fontFamily: 'pixelify-regular',
		color: '#101D2D',
	},
	dropdownContainer: {
		borderWidth: 2,
		borderColor: '#69C56D',
		borderStyle: 'dashed',
		borderRadius: 4,
		backgroundColor: '#69C56D',
		marginTop: -4,
	},
	dropdownItem: {
		fontFamily: 'pixelify-regular',
		color: '#101D2D',
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
	buttonText: {
		color: 'white',
		letterSpacing: 3,
		textTransform: 'uppercase',
	},
	addExercise: {
		width: 200,
		height: 40,
		backgroundColor: '#69C56D',
		alignSelf: 'center',
	},
	createWorkout: {
		width: 200,
		height: 40,
		marginVertical: 16,
		backgroundColor: 'dodgerblue',
		alignSelf: 'center',
	},
	headingText: {
		fontSize: 18,
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

export default CreateWorkoutScreen;
