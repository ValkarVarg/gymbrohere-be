import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";

const Timer = () => {
  const [running, setRunning] = useState(false);
  const [time, setTime] = useState(0);
  const intervalRef = useRef(null);

  const startTimer = () => {
    if (!running) {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
      setRunning(true);
    }
  };

  const pauseTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setRunning(false);
  };

  const finishTimer = () => {
    // Add end workout behaviour here
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setRunning(false);
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <View>
      <Text>{time}</Text>
      <Pressable onPress={startTimer}>
        <Text>Start</Text>
      </Pressable>
      <Pressable onPress={pauseTimer}>
        <Text>Pause</Text>
      </Pressable>
      <Pressable onPress={finishTimer}>
        <Text>Finish Workout</Text>
      </Pressable>
    </View>
  );
};

export default Timer;
