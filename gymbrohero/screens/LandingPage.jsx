import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Image, TextInput, Alert } from 'react-native';
import axios from 'axios';
import { Audio } from 'expo-av';

export const LandingPage = ({ navigation, handleLogin }) => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [registerUsername, setRegisterUsername] = useState('');
	const [registerEmail, setRegisterEmail] = useState('');
	const [registerPassword, setRegisterPassword] = useState('');
	const [showLoginFields, setShowLoginFields] = useState(true);

  const playSound = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require('../assets/anime-wow.mp3')
    );
    await sound.playAsync();
  };

	const handleToggleForm = () => {
		setShowLoginFields(!showLoginFields);
	};

	const handleLoginPress = () => {
    playSound();
		if (username && password) {
			axios
				.get(`https://gymbrohero.onrender.com/api/userlogin/${username}`)
				.then((response) => {
					const userLogin = response.data.userLogin;
					if (userLogin && userLogin.password === password) {
						handleLogin(userLogin.user_id);
						navigation.navigate('Main');
					} else {
						Alert.alert('Error', 'Invalid username or password.');
					}
				})
				.catch((error) => {
					console.error('Error logging in:', error);
					Alert.alert('Error', 'Failed to login. Please try again later.');
				});
		} else {
			Alert.alert('Error', 'Please enter both username and password.');
		}
	};

	const handleRegister = () => {
		if (registerUsername && registerEmail && registerPassword) {
			const userData = {
				username: registerUsername,
				email: registerEmail,
				password: registerPassword,
			};

			axios
				.post('https://gymbrohero.onrender.com/api/userlogin/', userData)
				.then((response) => {
					handleLogin(response.user_id)
					navigation.navigate('Main');
					navigation.navigate('Profile');
				})
				.catch((error) => {
					console.error('Error registering user:', error);
					Alert.alert('Error', 'Failed to register user. Please try again.');
				});
		} else {
			Alert.alert('Error', 'Please enter username, email, and password.');
		}
	};

	return (
		<View style={styles.container}>
			{/* <Image source={GymBroHeroImage} style={styles.image} /> */}
			<Text style={[styles.greenText, styles.semiboldText, styles.header]}>Gym Bro Hero</Text>
			<Image source={require('../images/ladychad.gif')} style={styles.image} />
			<Text style={[styles.greenText, styles.semiboldText, styles.subHeading]}>It's time to get huge, bro</Text>

			{showLoginFields ? (
				<>
					<TextInput style={[styles.input, styles.regularText]} placeholder="Username" value={username} onChangeText={setUsername} autoCapitalize="none" keyboardType="email-address" />
					<TextInput style={[styles.input, styles.regularText]} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
					<Pressable style={[styles.button]} onPress={handleLoginPress}>
						<Text style={[styles.buttonText, styles.semiboldText]}>Login</Text>
					</Pressable>
				</>
			) : (
				<>
					<TextInput style={[styles.input, styles.regularText]} placeholder="Username" value={registerUsername} onChangeText={setRegisterUsername} autoCapitalize="none" />
					<TextInput style={[styles.input, styles.regularText]} placeholder="Email" value={registerEmail} onChangeText={setRegisterEmail} autoCapitalize="none" keyboardType="email-address" />
					<TextInput style={[styles.input, styles.regularText]} placeholder="Password" value={registerPassword} onChangeText={setRegisterPassword} secureTextEntry />
					<Pressable style={styles.button} onPress={handleRegister}>
						<Text style={[styles.buttonText, styles.semiboldText]}>Register</Text>
					</Pressable>
				</>
			)}
			<Pressable style={styles.toggleButton} onPress={handleToggleForm}>
				<Text style={[styles.toggleButtonText, styles.semiboldText]}>{showLoginFields ? 'Register' : 'Login'}</Text>
			</Pressable>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#101D2D',
	},
	header: {
		fontSize: 42,
		letterSpacing: 3,
		textAlign: 'center',
		marginBottom: 12,
	},
	subHeading: {
		fontSize: 20,
		letterSpacing: 2,
		textAlign: 'center',
		marginTop: 12,
		marginBottom: 24,
	},
	image: {
		width: 100,
		height: 100,
		marginBottom: 12,
	},
	input: {
		width: 200,
		height: 50,
		backgroundColor: '#69C56D',
		borderWidth: 2,
		borderColor: '#69C56D',
		borderStyle: 'dashed',
		borderRadius: 2,
		marginVertical: 10,
		paddingHorizontal: 12,
		color: '#101D2D',
	},
	button: {
		width: 200,
		height: 50,
		backgroundColor: '#8b5e34',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 25,
		marginVertical: 10,
	},
	buttonText: {
		color: 'white',
		letterSpacing: 3,
		textTransform: 'uppercase',
		fontSize: 20,
	},
	button: {
		alignItems: 'center',
		justifyContent: 'center',
		padding: 5,
		borderRadius: 4,
		marginVertical: 12,
		width: 150,
		height: 50,
		textTransform: 'uppercase',
		letterSpacing: 2,
		borderWidth: 4,
		borderColor: 'white',
		backgroundColor: 'dodgerblue',
	},
	toggleButton: {
		marginTop: 10,
	},
	toggleButtonText: {
		color: 'white',
		textDecorationLine: 'underline',
	},
	greenText: {
		color: '#69C56D',
	},
	regularText: {
		fontFamily: 'pixelify-regular',
	},
	semiboldText: {
		fontFamily: 'pixelify-semibold',
	},
	boldText: {
		fontFamily: 'pixelify-bold',
	},
});

export default LandingPage;
