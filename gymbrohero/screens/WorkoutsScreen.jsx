import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";

const testData = [
  {
    workout_id: 1,
    workout1: [
      { exerciseName: "deadlift", sets: "4", reps: "10", weight: "150kg" },
      { exerciseName: "squat", sets: "4", reps: "10", weight: "100kg" },
      { exerciseName: "bench press", sets: "4", reps: "10", weight: "70kg" },
      { exerciseName: "military press", sets: "4", reps: "10", weight: "50kg" },
    ],
  },
];

const WorkoutItem = ({ exerciseName, sets, reps, weight }) => {
  return (
    <View style={styles.item}>
      <Text>Exercise Name: {exerciseName} </Text>
      <Text>Sets: {sets} </Text>
      <Text>Reps: {reps} </Text>
      <Text>Weight: {weight} </Text>
    </View>
  );
};

export const WorkoutsScreen = () => {
  return (
    <View>
      <Text>This is the Workouts Screen</Text>
      {testData.map((workout) => (
        <FlatList
          data={workout.workout1}
          renderItem={({ item }) => (
            <WorkoutItem
              exerciseName={item.exerciseName}
              sets={item.sets}
              reps={item.reps}
              weight={item.weight}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
  },
});
