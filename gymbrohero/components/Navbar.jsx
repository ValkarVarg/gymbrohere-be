import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import { Appbar } from "react-native-paper";
import { WorkoutsScreen } from "../screens/WorkoutsScreen";
import { CreateWorkoutScreen } from "../screens/CreateWorkoutScreen";
import { StatsScreen } from "../screens/StatsScreen";
import { SettingsScreen } from "../screens/SettingsScreen";
import XpBar from "./XpBar";
import { View, StyleSheet, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ProfileScreen } from "../screens/ProfileScreen";

const Tab = createBottomTabNavigator();
const screenOptions = { headerShown: false };
const homeIcon = require("../images/girlchadstill.png");
const workoutsIcon = require("../images/workoutsicon.png");
const creatWorkoutIcon = require("../images/createworkouticon.png");
const statsIcon = require("../images/statsicon.png");

export const Navbar = ({ userId }) => {
  const currentExperience = 0;
  const experienceForNextLevel = 0;

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

      <Tab.Navigator
        screenOptions={{
          ...screenOptions,
          tabBarStyle: styles.navBarContainer,
          tabBarActiveTintColor: "#69C56D",
          tabBarInactiveTintColor: "#69C56D",
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: () => (
              <Image
                source={homeIcon}
                style={{ width: 24, height: 24, tintColor: "#69C56D" }}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Workouts"
          component={WorkoutsScreen}
          options={{
            tabBarIcon: () => (
              <Image
                source={workoutsIcon}
                style={{ width: 24, height: 24, tintColor: "#69C56D" }}
              />
            ),
          }}
        />
        <Tab.Screen
          name="CreateWorkout"
          component={CreateWorkoutScreen}
          options={{
            tabBarIcon: () => (
              <Image
                source={creatWorkoutIcon}
                style={{ width: 24, height: 24, tintColor: "#69C56D" }}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Stats"
          component={StatsScreen}
          options={{
            tabBarIcon: () => (
              <Image
                source={statsIcon}
                style={{ width: 24, height: 24, tintColor: "#69C56D" }}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </View>
  );
};

export const Topbar = ({ navigation, title }) => {
  return (
    <Appbar.Header style={styles.topbarStyle}>
      <Appbar.Action
        onPress={() => navigation.navigate("Profile")}
        icon="account"
        color="#69C56D"
      />
      <Appbar.Content title={title} color="#69C56D" />
      <Appbar.Action
        onPress={() => navigation.navigate("Settings")}
        icon="cog"
        color="#69C56D"
      />
    </Appbar.Header>
  );
};

const styles = StyleSheet.create({
  topbarStyle: {
    backgroundColor: "#101D2D",
  },
  xpBarContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 0,
    padding: 10,
    backgroundColor: "#101D2D",
  },
  navBarContainer: {
    backgroundColor: "#101D2D",
  },
});
