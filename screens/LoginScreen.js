// /screens/LoginScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'; // Import Firebase Auth functions
import { auth } from '../Firebase/FirebaseConfig'; // Assuming you have firebase.js for firebase initialization

function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (email === '' || password === '') {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password); // Firebase sign-in
      navigation.replace('Main'); // Navigate to Main screen on successful login
    } catch (error) {
      Alert.alert('Login Error', error.message); // Show error message if login fails
    }
  };

  const handleRegister = () => {
    navigation.navigate('Register'); // Navigate to Register screen if the user doesn't have an account
  };

  return (
    <View style={styles.container}>
      {/* Top Section with Icon */}
      <View style={styles.topContainer}>
        <Icon name="scissors" size={60} color="white" />
        <Text style={styles.iconText}>Welcome</Text>
      </View>

      {/* Bottom Section with Login Form */}
      <View style={styles.bottomContainer}>
        <Text style={styles.title}>Login</Text>
        <TextInput
          placeholder="Email"
          placeholderTextColor="#999"
          value={email}
          onChangeText={setEmail}
          style={[styles.input, styles.inputUsername]}
        />
        <TextInput
          placeholder="Password"
          placeholderTextColor="#999"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          style={[styles.input, styles.inputPassword]}
        />

        <TouchableOpacity onPress={handleLogin} style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleRegister} style={styles.registerContainer}>
          <Text style={styles.registerTextWrapper}>
            Don’t have an account? <Text style={styles.registerText}>Register</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  topContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: '#1f1f1f',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    elevation: 10, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
  },
  iconText: {
    fontSize: 18,
    color: 'white',
    marginTop: 10,
  },
  bottomContainer: {
    flex: 2,
    padding: 20,
    marginTop: -20,
    backgroundColor: '#fff',
    borderRadius: 20,
    marginHorizontal: 20,
    elevation: 5, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FF5722',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 15,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  button: {
    width: '100%',
    padding: 15,
    backgroundColor: '#FF5722',
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  registerContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  registerTextWrapper: {
    fontSize: 14,
    color: '#333',
  },
  registerText: {
    color: '#FF5722',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default LoginScreen;
