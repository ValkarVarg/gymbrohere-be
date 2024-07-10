import React, { useState } from "react";
import { Button, TextInput, View, Text, StyleSheet, SafeAreaView } from "react-native";
import { Formik, FieldArray } from "formik";
import { CreateSet } from "./CreateSet";
import { SelectList } from "react-native-dropdown-select-list";

export const CreateExerciseBlock = () => {
  const [newIndividualWorkout, setnewIndividualWorkout] = useState({})

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
                    <View key={index}>
                      <Text>Exercise {index + 1}</Text>
                      <SelectList
                        setSelected={(val) => setFieldValue(`ExerciseBlock[${index}].exerciseId`, val)}
                        data={exerciseData}
                        save="value"
                        placeholder='select exercise'
                        value={values.ExerciseBlock[index].exerciseId}
                      />
                      <CreateSet exerciseObject={values.ExerciseBlock[index]} newIndividualWorkout={newIndividualWorkout} setnewIndividualWorkout={setnewIndividualWorkout}/>
                      <Button
                        title="remove exercise"
                        onPress={() => arrayHelpers.remove(index)}
                      />
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
  friendContainer: {
    marginBottom: 20,
  },
});

export default CreateExerciseBlock;