import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useExperience } from './XpContext';

const XpBar = ({ barWidth = 300, barHeight = 20 }) => {
  const { currentExperience, experienceForNextLevel} = useExperience();
  const fillPercentage = (currentExperience / experienceForNextLevel) * 100;

  return (
    <View>
      <View style={[styles.barContainer, { width: barWidth, height: barHeight }]}>
        <View style={[styles.filledBar, { width: `${fillPercentage}%`, height: barHeight }]} />
        <View style={styles.textContainer}>
          <Text style={styles.experienceText}>{`${currentExperience} / ${experienceForNextLevel}`}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  barContainer: {
    backgroundColor: '#e0e0e0', 
    borderRadius: 10,
    overflow: 'hidden',
    position: 'relative',
  },
  filledBar: {
    backgroundColor: '#76c7c0', 
    borderRadius: 10,
  },
  textContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  experienceText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default XpBar;