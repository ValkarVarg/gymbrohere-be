import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import { Appbar } from "react-native-paper";
import { WorkoutsScreen } from "../screens/WorkoutsScreen";
import { CreateWorkoutScreen } from "../screens/CreateWorkoutScreen";
import { StatsScreen } from "../screens/StatsScreen";
import XpBar from "./XpBar";
import { View, StyleSheet } from 'react-native';

const Tab = createBottomTabNavigator();
const screenOptions = { headerShown: false };

export const Navbar = () => {
  const currentExperience = 0
  const experienceForNextLevel = 0

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.xpBarContainer}>
        <XpBar 
          currentExperience={currentExperience}
          experienceForNextLevel={experienceForNextLevel}
          barWidth={300}
          barHeight={20}
        />
      </View>
      <Tab.Navigator screenOptions={screenOptions}>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Workouts" component={WorkoutsScreen} />
        <Tab.Screen name="CreateWorkout" component={CreateWorkoutScreen} />
        <Tab.Screen name="Stats" component={StatsScreen} />
      </Tab.Navigator>
    </View>
  );
};

export const Topbar = ({ navigation, title }) => {
  return (
    <Appbar.Header>
      <Appbar.Action
        onPress={() => navigation.navigate("Profile")}
        icon="account"
      />
      <Appbar.Content title={title} />
      <Appbar.Action
        onPress={() => navigation.navigate("Settings")}
        icon="cog"
      />
    </Appbar.Header>
  );
};

const styles = StyleSheet.create({
  xpBarContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f0f0f0', 
  },
});
