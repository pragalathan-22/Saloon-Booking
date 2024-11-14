// /screens/RegisterScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../Firebase/FirebaseConfig';

function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = () => {
    if (password === confirmPassword) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Registration successful
          const user = userCredential.user;
          Alert.alert("Success", "Account created successfully!");
          navigation.navigate('Login'); // Navigate to login screen
        })
        .catch((error) => {
          const errorMessage = error.message;
          Alert.alert("Error", errorMessage);
        });
    } else {
      Alert.alert("Error", "Passwords do not match!");
    }
  };

  return (
    <View style={styles.container}>
      {/* Top Section with Icon */}
      <View style={styles.topContainer}>
        <Icon name="user-plus" size={60} color="#e67e22" />
        <Text style={styles.iconText}>Create Your Account</Text>
      </View>

      {/* Bottom Section with Registration Form */}
      <View style={styles.bottomContainer}>
        <Text style={styles.title}>Register</Text>
        <TextInput
          placeholder="Email"
          placeholderTextColor="#999"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          placeholderTextColor="#999"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          style={styles.input}
        />
        <TextInput
          placeholder="Confirm Password"
          placeholderTextColor="#999"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          style={styles.input}
        />
        
        <TouchableOpacity onPress={handleRegister} style={styles.button}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.loginContainer}>
          <Text style={styles.loginTextWrapper}>
            Already have an account? <Text style={styles.loginText}>Login</Text>
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
    backgroundColor: '#fff',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    elevation: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
  },
  iconText: {
    fontSize: 18,
    color: '#555',
    marginTop: 10,
  },
  bottomContainer: {
    flex: 2,
    padding: 20,
    marginTop: -20,
    backgroundColor: '#fff',
    borderRadius: 20,
    marginHorizontal: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
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
  loginContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  loginTextWrapper: {
    fontSize: 14,
    color: '#333',
  },
  loginText: {
    color: '#FF5722',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default RegisterScreen;
