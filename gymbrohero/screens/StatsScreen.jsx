import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

export const StatsScreen = () => {
  const testStats = {
    workouts_completed: 1,
    total_workout_time: 60,
    average_session: 60,
    items_unlocked: 10,
  };

  const [stats, setStats] = useState(null);

  useEffect(() => {
    setStats(testStats);
  }, []);

  if (!stats) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={[styles.header, styles.bold]}>
        Check Out Your Stats, Bro!
      </Text>
      <View style={styles.stats}>
        <Text>
          <Text style={styles.bold}>Workouts Completed: </Text>
          <Text style={[styles.bold, styles.timeText]}>
            {stats.workouts_completed}
          </Text>
        </Text>
        <Text>
          <Text style={styles.bold}>Total Workout Time: </Text>
          <Text style={[styles.bold, styles.timeText]}>
            {" "}
            {stats.total_workout_time} minutes{" "}
          </Text>
        </Text>
        <Text>
          <Text style={styles.bold}>Average Session Time: </Text>
          <Text style={[styles.bold, styles.timeText]}>
            {stats.average_session} minutes
          </Text>
        </Text>
        <Text>
          <Text style={styles.bold}>Items Unlocked: </Text>
          <Text style={[styles.bold, styles.timeText]}>
            {stats.items_unlocked}
          </Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "#101D2D",
    flex: 1,
    paddingHorizontal: 20,
  },
  bold: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#69C56D",
  },
  header: {
    fontSize: 28,
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 30,
  },
  stats: {
    borderWidth: 4,
    gap: 10,
  },
  timeText: {
    color: "white",
  },
});
