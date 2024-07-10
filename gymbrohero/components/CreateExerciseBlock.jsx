import React, { useState } from "react";
import { Button, View, Text, StyleSheet, SafeAreaView } from "react-native";
import { Formik, FieldArray } from "formik";
import { CreateSet } from "./CreateSet";
import { SelectList } from "react-native-dropdown-select-list";

export const CreateExerciseBlock = () => {
  const [newIndividualWorkout, setnewIndividualWorkout] = useState([])
  const [selected, setSelected] = useState('');
  console.log(newIndividualWorkout, 'updated new workout state')

  const exerciseData = [
    { label: 'Squat', value: 'squat' },
    { label: 'Bench', value: 'bench' },
    { label: 'Deadlift', value: 'deadlift' },
  ];

  const initialValues = {
    ExerciseBlock: [
      {
        exerciseId: '',
      },
    ],
  };

  return (
    <SafeAreaView>
      <Formik
        initialValues={initialValues}
        onSubmit={async (values) => {
          await new Promise((r) => setTimeout(r, 500));
          alert(JSON.stringify(values, null, 2));
        }}
      >
        {({ values, handleChange, handleBlur, handleSubmit, setFieldValue }) => (
          <View>
            <FieldArray name="ExerciseBlock">
              {(arrayHelpers) => (
                <View>
                  {values.ExerciseBlock.map((block, index) => (
                    <View key={index} style={styles.exerciseBlock}>
                      <Text>Exercise {index + 1}</Text>
                      <SelectList
                      setSelected={(val) => setSelected(val)}
                        onSelect={() => setFieldValue(`ExerciseBlock[${index}].exerciseId`, selected)}
                        data={exerciseData}
                        save="value"
                        placeholder='select exercise'

                      />
                      <CreateSet exerciseObject={values.ExerciseBlock[index]} newIndividualWorkout={newIndividualWorkout} setnewIndividualWorkout={setnewIndividualWorkout} removeExercise={() => arrayHelpers.remove(index)}/>
                    </View>
                  ))}
                  <Button
                    title="Add Exercise"
                    onPress={() => {
                      arrayHelpers.push({
                        exerciseId: ''
                      });
                    }}
                  />
                </View>
              )}
            </FieldArray>
            <Button onPress={handleSubmit} title="Submit" />
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

export default CreateExerciseBlock;
