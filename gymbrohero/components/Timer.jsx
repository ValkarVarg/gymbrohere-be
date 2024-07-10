import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { useExperience } from "./XpContext";

export default function Timer({ navigation }) {
  const [running, setRunning] = useState(false);
  const [time, setTime] = useState(0);
  const intervalRef = useRef(null);
  const { addExperience } = useExperience();

  const toggleTimer = () => {
    if (!running) {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
      setRunning(true);
    } else {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
      setRunning(false);
    }
  };

  const finishTimer = () => {
    const experience = Math.floor(time / 60);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setRunning(false);
    setTime(0);
    addExperience(experience);
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.timerText, styles.greenText, styles.semiboldText]}>
        {formatTime(time)}
      </Text>
      <View style={styles.buttonContainer}>
        <Pressable
          onPress={toggleTimer}
          style={[
            styles.button,
            running ? styles.pauseButton : styles.startButton,
          ]}
        >
          <Text style={[styles.buttonText, styles.semiboldText]}>
            {running ? "Pause" : "Start"}
          </Text>
        </Pressable>
        <Pressable
          onPress={finishTimer}
          style={[styles.button, styles.finishButton]}
        >
          <Text style={[styles.buttonText, styles.semiboldText]}>
            Finish Workout
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginBottom: 20,
  },
  timerText: {
    fontSize: 48,
  },
  startButton: {
    backgroundColor: "dodgerblue",
  },
  pauseButton: {
    backgroundColor: "#69C56D",
  },
  finishButton: {
    backgroundColor: "orangered",
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 25,
    marginTop: 10,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
    borderRadius: 4,
    marginHorizontal: 5,
    width: 110,
    textTransform: "uppercase",
    letterSpacing: 2,
    borderWidth: 4,
    borderColor: "white",
  },
  buttonText: {
    color: "white",
    letterSpacing: 3,
    textTransform: "uppercase",
    textAlign: "center",
  },
  greenText: {
    color: "#69C56D",
  },
  regularText: {
    fontFamily: "pixelify-regular",
  },
  semiboldText: {
    fontFamily: "pixelify-semibold",
  },
  boldText: {
    fontFamily: "pixelify-bold",
  },
});
