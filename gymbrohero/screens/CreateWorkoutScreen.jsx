import React, { useState } from "react";
import { Button, TextInput, View, Text, ScrollView } from "react-native";
import { SelectList } from 'react-native-dropdown-select-list'
import { Formik } from "formik";
import { CreateExerciseBlock } from "../components/CreateExerciseBlock";

export const CreateWorkoutScreen = (props) => {
    const [exerciseSelected, setExerciseSelected] = useState('')

    const exerciseData = [
      {key:1 ,value: 'squat'},
      {key:1 ,value: 'bench'},
      {key:1 ,value: 'deadlift'},
    ]


  return (
    <ScrollView>
    <Formik
      initialValues={{
        workoutName: "",
      }}
      onSubmit={(values) => console.log(values)}
    >
      {({ handleChange, handleBlur, handleSubmit, values }) => (
        <View style={{ padding: 20 }}>
          <Text>Name Your Workout:</Text>
          <TextInput
            onChangeText={handleChange("workoutName")}
            onBlur={handleBlur("workoutName")}
            value={values.workoutName}
            style={{
              height: 40,
              borderColor: "gray",
              borderWidth: 1,
              marginBottom: 20,
            }}
          />
             <CreateExerciseBlock></CreateExerciseBlock>
          <Button onPress={handleSubmit} title="Create Workout" />
        </View>
      )}
    </Formik>
    </ScrollView>
  );
};
