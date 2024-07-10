import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ExperienceProvider } from "./components/XpContext";
import { ProfileScreen } from "./screens/ProfileScreen";
import { SettingsScreen } from "./screens/SettingsScreen";
import { CreateWorkoutScreen } from "./screens/CreateWorkoutScreen";
import { Navbar } from "./components/Navbar";
import { Topbar } from "./components/Navbar";
import { StatsScreen } from "./screens/StatsScreen";
import { RunningWorkout } from "./screens/RunningWorkout";
import { StoreFront } from "./screens/StoreFront";
import { LandingPage } from "./screens/LandingPage";
import { GridScreen } from "./screens/GridScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  const [userId, setUserId] = useState(null);

  const handleLogin = (id) => {
    setUserId(id);
  };

  const RunWorkoutScreen = (props) => {
    const { userId } = props.route.params;
    return <RunningWorkout {...props} userId={userId} />;
  };

  return (
    <ExperienceProvider userId={userId}>
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="LandingPage">
            <Stack.Screen name="LandingPage" options={{ headerShown: false }}>
              {(props) => <LandingPage {...props} handleLogin={handleLogin} />}
            </Stack.Screen>
            <Stack.Screen
              name="Main"
              component={Navbar}
              options={({ navigation }) => ({
                header: () => (
                  <Topbar navigation={navigation} title="Gymbro Hero" />
                ),
              })}
            />
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="Settings">
              {(props) => <SettingsScreen {...props} userId={userId} />}
            </Stack.Screen>
            <Stack.Screen
              name="CreateWorkout"
              component={CreateWorkoutScreen}
            />
            <Stack.Screen name="Stats" component={StatsScreen} />
            <Stack.Screen name="Run Workout">
              {(props) => <RunWorkoutScreen {...props} />}
            </Stack.Screen>
            <Stack.Screen name="StoreFront" component={StoreFront} />
            <Stack.Screen name="GridScreen" component={GridScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </ExperienceProvider>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//   },
// });
