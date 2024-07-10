import React from 'react';
import { Formik, Field, FieldArray } from 'formik';
import {
  View,
  Text,
  Button,
  SafeAreaView,
  TextInput,
  StyleSheet,
} from 'react-native';

export const CreateSet = (props) => {
  const currentExercise = props.exerciseObject.exerciseId;
  const initialValues = {
    sets: [],
  };


  return (
    <SafeAreaView>
      <Formik
        initialValues={initialValues}
        onSubmit={    async (values) => {
            await new Promise((r) => setTimeout(r, 500));
            alert(JSON.stringify(values, null, 2));
              props.setnewIndividualWorkout(otherExercises => {
                return [...otherExercises, ...values.sets]})
          }}
      >
        {({ values, handleChange, handleBlur, handleSubmit }) => (
          <View>
            <FieldArray name="sets">
              {(arrayHelpers) => (
                <View>
                  {values.sets.map((set, index) => (
                    <View key={index} style={styles.row}>
                      <Text>set {index + 1}</Text>
                      <TextInput
                        style={styles.input}
                        onChangeText={handleChange(
                          `sets[${index}].workoutReps`
                        )}
                        onBlur={handleBlur(`sets[${index}].workoutReps`)}
                        value={set.workoutReps}
                        placeholder="reps"
                      />
                      <TextInput
                        style={styles.input}
                        onChangeText={handleChange(
                          `sets[${index}].workoutWeight`
                        )}
                        onBlur={handleBlur(`sets[${index}].workoutWeight`)}
                        value={set.weight}
                        placeholder="workoutWeight"
                      />
                      <Button
                        title="remove set"
                        onPress={() => {
                          arrayHelpers.remove(index);
                        }}
                      />
                    </View>
                  ))}
                  <Button
                    title="Add Set"
                    onPress={() => {
                      arrayHelpers.push({
                        exerciseId: `${currentExercise}`,
                        setId: `${values.sets.length + 1}`,
                        workoutReps: '',
                        workoutWeight: '',
                      });
                    }}
                  />
                </View>
              )}
            </FieldArray>
            <View style={styles.inlineButtons}>
              <Button onPress={handleSubmit} title="Submit Exercise" />
              <Button
                title="Remove Exercise"
                onPress={() => props.removeExercise()}
              />
            </View>
          </View>
        )}
      </Formik>
    </SafeAreaView>
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
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  inlineButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
});
