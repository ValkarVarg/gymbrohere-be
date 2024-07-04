import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import Timer from "../components/Timer";

export const RunningWorkout = ({ route }) => {
  const { testData } = route.params;
  const workout = testData[0];
  return (
    <View style={styles.container}>
      <Text style={[styles.header, styles.bold]}>
        {workout.workout_name} in progress!
      </Text>
      <Timer />
      <View style={[styles.container, styles.box]}>
        <Text>{workout.workout_stack[0].exerciseName}</Text>
        <Text>Sets: {workout.workout_stack[0].sets}</Text>
        <Text>Reps: {workout.workout_stack[0].reps}</Text>
        <Text>Weight: {workout.workout_stack[0].weight}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  bold: {
    fontWeight: "bold",
  },
  header: {
    fontSize: 28,
    textAlign: "center",
    marginBottom: 15,
  },
  workoutControls: {
    flexDirection: "row",
    width: 200,
  },
  button: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  startButton: {
    backgroundColor: "green",
  },
  deleteButton: {
    backgroundColor: "red",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  box: {
    borderColor: "grey",
    borderWidth: 3,
    borderRadius: 5,
    padding: 5,
  },
  item: {
    padding: 5,
  },
  itemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: "gray",
  },
  workoutName: {
    textAlign: "center",
    fontSize: 18,
  },
  exerciseName: {
    textTransform: "capitalize",
    fontSize: 16,
    paddingBottom: 5,
  },
  exerciseStats: {
    flexDirection: "row",
    gap: 10,
  },
});
