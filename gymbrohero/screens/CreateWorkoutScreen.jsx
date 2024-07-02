import React from "react";
import { Button, TextInput, View, Text } from "react-native";
import { Formik } from "formik";

export const CreateWorkoutScreen = (props) => {
  return (
    <Formik
      initialValues={{
        workoutName: "",
        workoutSets: "",
        workoutReps: "",
        workoutWeight: "",
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
          <Text>Sets:</Text>
          <TextInput
            onChangeText={handleChange("workoutSets")}
            onBlur={handleBlur("workoutSets")}
            value={values.workoutSets}
            style={{
              height: 40,
              borderColor: "gray",
              borderWidth: 1,
              marginBottom: 20,
            }}
          />
          <Text>Reps:</Text>
          <TextInput
            onChangeText={handleChange("workoutReps")}
            onBlur={handleBlur("workoutReps")}
            value={values.workoutReps}
            style={{
              height: 40,
              borderColor: "gray",
              borderWidth: 1,
              marginBottom: 20,
            }}
          />
          <Text>Weight:</Text>
          <TextInput
            onChangeText={handleChange("workoutWeight")}
            onBlur={handleBlur("workoutWeight")}
            value={values.workoutWeight}
            style={{
              height: 40,
              borderColor: "gray",
              borderWidth: 1,
              marginBottom: 20,
            }}
          />
          <Button onPress={handleSubmit} title="Create Workout" />
        </View>
      )}
    </Formik>
  );
};
