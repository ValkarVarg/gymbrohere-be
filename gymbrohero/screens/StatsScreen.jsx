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
      <Text style={styles.header}>- Check Out Your Stats, Bro! -</Text>
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
    fontSize: 18,
    color: "#69C56D",
    fontFamily: "pixelify-bold",
  },
  header: {
    fontFamily: "pixelify-bold",
    color: "#69C56D",
    textAlign: "center",
    marginBottom: 30,
    fontSize: 28,
  },
  stats: {
    marginBottom: 16,
    borderWidth: 4,
    borderRadius: 4,
    borderColor: "#69C56D",
    padding: 12,
    // padding: 5,
    // borderWidth: 4,
    gap: 20,
  },
  timeText: {
    color: "#69C56D",
  },
});
