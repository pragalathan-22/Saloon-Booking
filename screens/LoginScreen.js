// /screens/LoginScreen.js
import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

function LoginScreen({ navigation }) {
  const handleLogin = () => {
    navigation.replace('Main');
  };

  const handleRegister = () => {
    navigation.navigate('Register');
  };

  return (
    <View style={styles.container}>
      {/* Top Section with Icon */}
      <View style={styles.topContainer}>
        <Icon name="scissors" size={60} color="black" />
        <Text style={styles.iconText}>Welcome Back</Text>
      </View>

      {/* Bottom Section with Login Form */}
      <View style={styles.bottomContainer}>
        <Text style={styles.title}>Login</Text>
        <TextInput
          placeholder="Username"
          placeholderTextColor="#999"
          style={[styles.input, styles.inputUsername]}
        />
        <TextInput
          placeholder="Password"
          placeholderTextColor="#999"
          secureTextEntry
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
    backgroundColor: '#fff',
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
    elevation: 5, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#e67e22',
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
    backgroundColor: '#e67e22',
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
    color: '#e67e22',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default LoginScreen;
