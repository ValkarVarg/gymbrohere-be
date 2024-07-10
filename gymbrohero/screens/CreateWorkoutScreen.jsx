import React, { useState,  useEffect } from 'react';
import {
  Button,
  TextInput,
  View,
  Text,
  ScrollView,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import { Formik, FieldArray } from 'formik';
import { SelectList } from 'react-native-dropdown-select-list';
import { CreateSet } from '../components/CreateSet';
import { postWorkoutId, postWorkoutPlan, fetchExercises } from '../api';

export const CreateWorkoutScreen = ({ userId }) => {
  const [newIndividualWorkout, setnewIndividualWorkout] = useState([]);
  const [selectedKey, setSelectedKey] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const [exerciseData, setExerciseData] = useState([])

//   const exerciseData = [
//     {key: '1', value: 'Mobiles'},
//     {key: '2', value: 'Appliances'},
//     {key: '3', value: 'Cameras'},
//     {key: '4', value: 'Computers'},
//     {key: '5', value: 'Vegetables'},
//     {key: '6', value: 'Diary Products'},
//     {key: '7', value: 'Drinks'},
// ];

useEffect(() => {
  fetchExercises().then((exercises) => {
    const formattedExercises = exercises.map(exercise => ({
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
    <ScrollView>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, {resetForm}) => {
          postWorkoutId(values.workout).then((data) => {
        return [newIndividualWorkout.map((obj, index) => ({
          exercise_id: obj.exerciseId,
          set_id: obj.setId,
          reps: obj.workoutReps,
          weight: obj.workoutWeight,
          order_id: index,
        })), data.workout.workout_plan_id]
          })
          .then(([IndividualWorkout, planId]) => {
            postWorkoutPlan(planId, IndividualWorkout)
          })
          .then(() => {
            resetForm()
            alert(JSON.stringify('your workout has been added', null, 2));
          })
          
        }}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          setFieldValue,
        }) => (
          <View style={{ padding: 20 }}>
            <Text>Name Your Workout:</Text>
            <TextInput
              onChangeText={handleChange('workout.workout_plan_name')}
              onBlur={handleBlur('workout.workout_plan_name')}
              value={values.workout.workout_plan_name}
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
