import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import AppointmentScreen from './screens/AppointmentScreen';
import ProfileScreen from './screens/ProfileScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen'
import SpecialistDetailsScreen from './screens/SpecialistDetailsScreen';
// Icon imports
import FontAwesome from '@expo/vector-icons/FontAwesome';
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

// Bottom tab and stack navigators
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: 'white',
          position: 'absolute',
          shadowColor: '#000',
          shadowOpacity: 0.3,
          shadowRadius: 10,
          elevation: 4,
          shadowOffset: { width: 0, height: -3 },
          borderTopWidth: 0,
          borderRadius: 15,
        },
        tabBarLabelStyle: { color: 'white' },
        tabBarActiveTintColor: '#334155',
        tabBarInactiveTintColor: '#95a5a6',
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <FontAwesome name="home" size={24} color="#FF5722" />
            ) : (
              <AntDesign name="home" size={24} color="black" />
            ),
        }}
      />
      <Tab.Screen
        name="Appointment"
        component={AppointmentScreen}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <MaterialIcons name="calendar-today" size={24} color="#FF5722" />
            ) : (
              <MaterialIcons name="calendar-today" size={24} color="black" />
            ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Ionicons name="person" size={24} color="#FF5722" />
            ) : (
              <Ionicons name="person-outline" size={24} color="black" />
            ),
        }}
      />
    </Tab.Navigator>
  );
}

function Navigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Main" component={BottomTabs} options={{ headerShown: false }} />
      <Stack.Screen name='Register' component={RegisterScreen} options={{headerShown:false}}/>
      <Stack.Screen name='SpecialistDetails' component={SpecialistDetailsScreen} options={{headerShown:false}}/>
    </Stack.Navigator>
  );
}

export default Navigation;
