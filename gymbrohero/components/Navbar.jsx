import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import { ProfileScreen } from "../screens/ProfileScreen";
import { Appbar } from "react-native-paper";
import { SettingsScreen } from "../screens/SettingsScreen";
import { WorkoutsScreen } from "../screens/WorkoutsScreen";
import { CreateWorkoutScreen } from "../screens/CreateWorkoutScreen";

const Tab = createBottomTabNavigator();
const screenOptions = { headerShown: false };

export const Navbar = () => {
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Workouts" component={WorkoutsScreen} />
      <Tab.Screen name="CreateWorkout" component={CreateWorkoutScreen} />
    </Tab.Navigator>
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
