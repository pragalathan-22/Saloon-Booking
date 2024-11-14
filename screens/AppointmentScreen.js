// /screens/AppointmentScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function AppointmentScreen() {
  return (
    <View style={styles.container}>
      <Text>This is the Appointment Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default AppointmentScreen;
