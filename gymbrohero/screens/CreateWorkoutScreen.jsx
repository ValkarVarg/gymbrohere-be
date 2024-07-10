import React, { useState } from 'react';
import { Button, TextInput, View, Text, ScrollView, SafeAreaView, StyleSheet } from 'react-native';
import { Formik, FieldArray } from "formik";
import { SelectList } from "react-native-dropdown-select-list";
import { CreateSet } from '../components/CreateSet';

export const CreateWorkoutScreen = ({userId}) => {
  const [newIndividualWorkout, setnewIndividualWorkout] = useState([]);
  const [selected, setSelected] = useState('');
  // const {userId} = props
  console.log(userId, 'userId in create workout')

  const exerciseData = [
    { label: 'Squat', value: 'squat' },
    { label: 'Bench', value: 'bench' },
    { label: 'Deadlift', value: 'deadlift' },
  ];

  const initialValues = {
    workout_plan_name: '',
    user_id: '', //user state needs to be passed to here,
    ExerciseBlock: [
      {
        exerciseId: '',
      },
    ],
  };

  return (
    <ScrollView>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          console.log(values, 'form submission values');
          alert(JSON.stringify(values, null, 2));
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values, setFieldValue }) => (
          <View style={{ padding: 20 }}>
            <Text>Name Your Workout:</Text>
            <TextInput
              onChangeText={handleChange('workout_plan_name')}
              onBlur={handleBlur('workout_plan_name')}
              value={values.workout_plan_name}
              style={{
                height: 40,
                borderColor: 'gray',
                borderWidth: 1,
                marginBottom: 20,
              }}
            />
            <SafeAreaView>
            <FieldArray name="ExerciseBlock">
                {(arrayHelpers) => (
                  <View>
                    {values.ExerciseBlock.map((block, index) => (
                      <View key={index} style={styles.exerciseBlock}>
                        <Text>Exercise {index + 1}</Text>
                        <SelectList
                          setSelected={(val) => setSelected(val)}
                          onSelect={() =>
                            setFieldValue(
                              `ExerciseBlock[${index}].exerciseId`,
                              selected
                            )
                          }
                          data={exerciseData}
                          save="value"
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
                    <Button
                      title="Add Exercise"
                      onPress={() => {
                        arrayHelpers.push({
                          exerciseId: '',
                        });
                      }}
                    />
                  </View>
                )}
              </FieldArray>
            </SafeAreaView>
            <Button onPress={handleSubmit} title="Create Workout" />
          </View>
        )}
      </Formik>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginVertical: 5,
  },
  exerciseBlock: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  inlineButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
});

export default CreateWorkoutScreen;