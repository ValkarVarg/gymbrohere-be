import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ExperienceProvider } from './components/XpContext';
import { ProfileScreen } from './screens/ProfileScreen';
import { SettingsScreen } from './screens/SettingsScreen';
import { CreateWorkoutScreen } from './screens/CreateWorkoutScreen';
import { Navbar } from './components/Navbar';
import { Topbar } from './components/Navbar';
import { StatsScreen } from './screens/StatsScreen';
import { RunningWorkout } from './screens/RunningWorkout';
import { StoreFront } from './screens/StoreFront';
import { LandingPage } from './screens/LandingPage';
import { GridScreen } from './screens/GridScreen';
import { WorkoutsScreen } from './screens/WorkoutsScreen';

import * as Font from 'expo-font';

const Stack = createNativeStackNavigator();

export default function App() {
	const [userId, setUserId] = useState(null);
	const [fontsLoaded, setFontsLoaded] = useState(false);

	useEffect(() => {
		async function loadFonts() {
			await Font.loadAsync({
				'pixelify-bold': require('./assets/fonts/PixelifySans-Bold.ttf'),
				'pixelify-regular': require('./assets/fonts/PixelifySans-Regular.ttf'),
				'pixelify-medium': require('./assets/fonts/PixelifySans-Medium.ttf'),
				'pixelify-semibold': require('./assets/fonts/PixelifySans-SemiBold.ttf'),
			});
			setFontsLoaded(true);
		}
		loadFonts();
	}, []);

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
							options={({ navigation }) => ({
								header: () => <Topbar navigation={navigation} title="Gymbro Hero" />,
							})}
						>
							{(props) => <Navbar {...props} userId={userId} />}
						</Stack.Screen>
						<Stack.Screen name="Profile" component={ProfileScreen} />
						<Stack.Screen name="Settings">{(props) => <SettingsScreen {...props} userId={userId} />}</Stack.Screen>
						<Stack.Screen name="CreateWorkout" component={CreateWorkoutScreen} />
						<Stack.Screen name="Stats" component={StatsScreen} />
						<Stack.Screen name="Run Workout">{(props) => <RunWorkoutScreen {...props} />}</Stack.Screen>
						<Stack.Screen name="StoreFront">{(props) => <StoreFront {...props} userId={userId} />}</Stack.Screen>
						<Stack.Screen name="GridScreen">{(props) => <GridScreen {...props} userId={userId} />}</Stack.Screen>
						<Stack.Screen name="HomeScreen">{(props) => <HomeScreen {...props} userId={userId} />}</Stack.Screen>
						<Stack.Screen name="WorkoutsScreen">{(props) => <WorkoutsScreen {...props} userId={userId} />}</Stack.Screen>
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
