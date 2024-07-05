import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Image, TextInput, Alert } from 'react-native';
import GymBroHeroImage from '../images/GYMBROHERO.webp';
import axios from 'axios';

export const LandingPage = ({ navigation, handleLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [registerUsername, setRegisterUsername] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [showLoginFields, setShowLoginFields] = useState(true);

  const handleToggleForm = () => {
    setShowLoginFields(!showLoginFields); 
  };

  const handleLoginPress = () => {
    if (username && password) {
      axios.get(`https://gymbrohero.onrender.com/api/userlogin/${username}`)
        .then(response => {
          const userLogin = response.data.userLogin;
          if (userLogin && userLogin.password === password) {
            handleLogin(userLogin.user_id); 
            navigation.navigate('Main');
          } else {
            Alert.alert('Error', 'Invalid username or password.');
          }
        })
        .catch(error => {
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

      axios.post('https://gymbrohero.onrender.com/api/userlogin/', userData)
        .then(response => {
          navigation.navigate('Main');
        })
        .catch(error => {
          console.error('Error registering user:', error);
          Alert.alert('Error', 'Failed to register user. Please try again.');
        });
    } else {
      Alert.alert('Error', 'Please enter username, email, and password.');
    }
  };

  return (
    <View style={styles.container}>
      <Image source={GymBroHeroImage} style={styles.image} />
      {showLoginFields ? (
        <>
          <TextInput
            style={styles.input}
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
            keyboardType="email-address"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <Pressable style={styles.button} onPress={handleLoginPress}>
            <Text style={styles.buttonText}>Login</Text>
          </Pressable>
        </>
      ) : (
        <>
          <TextInput
            style={styles.input}
            placeholder="Username"
            value={registerUsername}
            onChangeText={setRegisterUsername}
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={registerEmail}
            onChangeText={setRegisterEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={registerPassword}
            onChangeText={setRegisterPassword}
            secureTextEntry
          />
          <Pressable style={styles.button} onPress={handleRegister}>
            <Text style={styles.buttonText}>Register</Text>
          </Pressable>
        </>
      )}
      <Pressable style={styles.toggleButton} onPress={handleToggleForm}>
        <Text style={styles.toggleButtonText}>
          {showLoginFields ? 'Register' : 'Login'}
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#c9b192',
    },
    image: {
      width: 300,
      height: 300,
      marginBottom: 20,
    },
    input: {
      width: 200,
      height: 50,
      backgroundColor: '#f0e7d8', 
      borderRadius: 25,
      marginVertical: 10,
      paddingHorizontal: 10,
      color: '#333',
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
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold',
    },
    toggleButton: {
      marginTop: 10,
    },
    toggleButtonText: {
      color: 'blue',
      textDecorationLine: 'underline',
    },
  });
  

export default LandingPage;
