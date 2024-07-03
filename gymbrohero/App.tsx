import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { ProfileScreen } from './screens/ProfileScreen';
import { SettingsScreen } from './screens/SettingsScreen';
import { CreateWorkoutScreen } from './screens/CreateWorkoutScreen';
import { Navbar } from './components/Navbar';
import { Topbar } from './components/Navbar';
import { StatsScreen } from './screens/StatsScreen';

const Stack = createNativeStackNavigator();

export default function App() {
	return (
		<PaperProvider>
			<NavigationContainer>
				<Stack.Navigator>
					<Stack.Screen
						name="Main"
						component={Navbar}
						options={({ navigation }) => ({
							header: () => <Topbar navigation={navigation} title="Gymbro Hero" />,
						})}
					/>
					<Stack.Screen name="Profile" component={ProfileScreen} />
					<Stack.Screen name="Settings" component={SettingsScreen} />
					<Stack.Screen name="CreateWorkout" component={CreateWorkoutScreen} />
					<Stack.Screen name="Stats" component={StatsScreen} />
				</Stack.Navigator>
			</NavigationContainer>
		</PaperProvider>
	);
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//   },
// });
