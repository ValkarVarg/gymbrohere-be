import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import Timer from "../components/Timer";


const ExerciseItem = ({ exercise, isLast }) => (
  <View style={[styles.item, !isLast && styles.itemBorder]}>
    <Text style={[styles.exerciseName, styles.bold]}>
      {exercise.exerciseName}
    </Text>
    <View style={styles.exerciseStats}>
      <Text>Sets: {exercise.sets}</Text>
      <Text>Reps: {exercise.reps}</Text>
      <Text>Weight: {exercise.weight}</Text>
    </View>
  </View>
);

export const RunningWorkout = ({ route }) => {
  const { workout } = route.params;
  return (
    <View style={styles.container}>
      <Text style={[styles.header, styles.bold]}>
        {workout.workout_name} in progress!
      </Text>
      <Timer />
      <View style={styles.flatListContainer}>
        <FlatList
          data={workout.workout_stack}
          renderItem={({ item, index }) => (
            <ExerciseItem
              exercise={item}
              isLast={index === workout.workout_stack.length - 1}
            />
          )}
          keyExtractor={(item) => item.exerciseName}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  flatListContainer: {
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


