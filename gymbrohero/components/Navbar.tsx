import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { Header } from 'react-native/Libraries/NewAppScreen';

const Tab = createBottomTabNavigator();
const screenOptions = { headerShown: false };

export default function Navbar() {
	return (
		<NavigationContainer>
			<Tab.Navigator screenOptions={screenOptions}>
				<Tab.Screen name="Home" component={HomeScreen} />
				<Tab.Screen name="Profile" component={ProfileScreen} />
			</Tab.Navigator>
		</NavigationContainer>
	);
}
