import React from 'react';
import { Formik, FieldArray } from 'formik';
import { View, Text, Pressable, SafeAreaView, TextInput, StyleSheet } from 'react-native';
import { CurrentRenderContext } from '@react-navigation/native';

export const CreateSet = (props) => {
	const currentExercise = props.exerciseObject.exerciseId;
	const initialValues = {
		sets: [],
	};

	return (
		<SafeAreaView>
			<Formik
				initialValues={initialValues}
				onSubmit={async (values) => {
					await new Promise((r) => setTimeout(r, 500));
					alert(JSON.stringify(values, null, 2));
					props.setnewIndividualWorkout((otherExercises) => {
						return [...otherExercises, ...values.sets];
					});
				}}
			>
				{({ values, handleChange, handleBlur, handleSubmit }) => (
					<View>
						<FieldArray name="sets">
							{(arrayHelpers) => (
								<View>
									{values.sets.map((set, index) => (
										<View key={index} style={styles.setRow}>
											<Text style={[styles.setText, styles.greenText, styles.boldText]}>Set #{index + 1}</Text>
											<TextInput
												style={styles.textInput}
												onChangeText={handleChange(`sets[${index}].workoutReps`)}
												onBlur={handleBlur(`sets[${index}].workoutReps`)}
												value={set.workoutReps}
												placeholder="reps"
											/>
											<TextInput
												style={styles.textInput}
												onChangeText={handleChange(`sets[${index}].workoutWeight`)}
												onBlur={handleBlur(`sets[${index}].workoutWeight`)}
												value={set.weight}
												placeholder="weight"
											/>
											<Pressable
												style={[styles.button, styles.removeSet]}
												onPress={() => {
													arrayHelpers.remove(index);
												}}
											>
												<Text style={[styles.buttonText, styles.semiboldText, styles.smallButtonText]}>Remove Set</Text>
											</Pressable>
										</View>
									))}
									<Pressable
										style={[styles.button, styles.addSet]}
										onPress={() => {
											arrayHelpers.push({
												exerciseId: `${currentExercise}`,
												setId: `${values.sets.length + 1}`,
												workoutReps: '',
												workoutWeight: '',
											});
										}}
									>
										<Text style={[styles.buttonText, styles.semiboldText]}>Add Set</Text>
									</Pressable>
								</View>
							)}
						</FieldArray>

						<View style={styles.buttonContainer}>
							<Pressable style={[styles.button, styles.submitExercises]} onPress={handleSubmit}>
								<Text style={[styles.buttonText, styles.semiboldText]}>Submit Exercise</Text>
							</Pressable>
							<Pressable style={[styles.button, styles.removeExercises]} onPress={() => props.removeExercise()}>
								<Text style={[styles.buttonText, styles.semiboldText]}>Remove Exercise</Text>
							</Pressable>
						</View>
					</View>
				)}
			</Formik>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	setRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginVertical: 5,
	},
	setText: {
		flex: 1,
		textAlign: 'center',
	},
	textInput: {
		borderWidth: 2,
		borderColor: '#69C56D',
		borderStyle: 'dashed',
		borderRadius: 4,
		height: 40,
		marginVertical: 5,
		backgroundColor: '#69C56D',
		color: '#101D2D',
		fontFamily: 'pixelify-regular',
		paddingLeft: 8,
		letterSpacing: 1.5,
		flex: 2,
		marginHorizontal: 5,
	},
	buttonContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginVertical: 5,
	},
	button: {
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 4,
		marginHorizontal: 5,
		textTransform: 'uppercase',
		letterSpacing: 2,
		borderWidth: 4,
		borderColor: 'white',
	},
	buttonText: {
		color: 'white',
		letterSpacing: 1.5,
		textTransform: 'uppercase',
		textAlign: 'center',
	},
	smallButtonText: {
		fontSize: 12,
	},
	addSet: {
		height: 45,
		width: 200,
		backgroundColor: '#69C56D',
		alignSelf: 'center',
		marginVertical: 10,
	},
	removeSet: {
		backgroundColor: 'orangered',
		width: 90,
		height: 40,
	},
	submitExercises: {
		backgroundColor: 'dodgerblue',
		alignSelf: 'center',
		width: 125,
		height: 50,
	},
	removeExercises: {
		backgroundColor: 'orangered',
		alignSelf: 'center',
		width: 125,
		height: 50,
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
