import React, { useState } from "react";
import { Button, TextInput, View, Text, ScrollView } from "react-native";
import { SelectList } from 'react-native-dropdown-select-list'
import { Formik } from "formik";
import { CreateExerciseBlock } from "../components/CreateExerciseBlock";
import { CreateSet } from "../components/CreateSet";

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
        workout_plan_name: "",
        user_id: '' //user state needs to be passed to here. 
      }}
      onSubmit={(values) => console.log(values)}
    >
      {({ handleChange, handleBlur, handleSubmit, values }) => (
        <View style={{ padding: 20 }}>
          <Text>Name Your Workout:</Text>
          <TextInput
            onChangeText={handleChange("workout_plan_name")}
            onBlur={handleBlur("workout_plan_name")}
            value={values.workout_plan_name}
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
