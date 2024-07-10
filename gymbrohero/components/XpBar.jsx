import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useExperience } from "./XpContext";

const XpBar = ({ barWidth = 300, barHeight = 20 }) => {
  const { currentExperience, experienceForNextLevel } = useExperience();
  const fillPercentage = (currentExperience / experienceForNextLevel) * 100;

  return (
    <View>
      <View
        style={[styles.barContainer, { width: barWidth, height: barHeight }]}
      >
        <View
          style={[
            styles.filledBar,
            { width: `${fillPercentage}%`, height: barHeight },
          ]}
        />
        <View style={styles.textContainer}>
          <Text
            style={styles.experienceText}
          >{`${currentExperience} / ${experienceForNextLevel} exp`}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  barContainer: {
    backgroundColor: "#e0e0e0",
    overflow: "hidden",
    position: "relative",
  },
  filledBar: {
    backgroundColor: "#69C56D",
    borderRadius: 10,
  },
  textContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
  experienceText: {
    color: "#101D2D",
    fontWeight: "bold",
  },
});

export default XpBar;
