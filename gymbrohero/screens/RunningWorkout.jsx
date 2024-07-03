import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Timer from '../components/Timer'

export const RunningWorkout = (testData) => {
const workout = testData
    return (
        <View>
            <Text>{workout}</Text>
          <Timer />
        </View>
      );

}