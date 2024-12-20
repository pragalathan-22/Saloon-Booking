import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';

export default function AppointmentScreen() {
  const [currentDate, setCurrentDate] = useState(moment());
  const [selectedDate, setSelectedDate] = useState(moment().format('YYYY-MM-DD'));
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedSpecialist, setSelectedSpecialist] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const navigation = useNavigation();

  const specialists = [
    { id: 1, name: 'Julie', imagelist: require('../assets/stylist9.jpg') },
    { id: 2, name: 'Prince', imagelist: require('../assets/stylist9.jpg') },
    { id: 3, name: 'Benton', imagelist: require('../assets/stylist9.jpg') },
  ];

  const services = [
    { id: 1, name: 'Haircut', image: require('../assets/stylist9.jpg') },
    { id: 2, name: 'Shaving', image: require('../assets/stylist9.jpg') },
    { id: 3, name: 'Makeup', image: require('../assets/stylist9.jpg') },
  ];

  // Generate the current and future week's days
  const generateWeek = (date) => {
    const startOfWeek = moment(date).startOf('week');
    return Array.from({ length: 7 }, (_, i) => {
      const day = startOfWeek.clone().add(i, 'days');
      return {
        dayName: day.format('ddd'),
        date: day.format('YYYY-MM-DD'),
        displayDate: day.format('D'),
        isPast: day.isBefore(moment(), 'day'), // Check if the date is in the past
      };
    }).filter(item => !item.isPast); // Filter out past dates
  };

  // Handle previous week navigation, but prevent navigating to past weeks
  const handlePreviousWeek = () => {
    const newDate = moment(currentDate).subtract(1, 'week');
    if (!newDate.isBefore(moment(), 'day')) { // Only allow navigating to the previous week if it's not in the past
      setCurrentDate(newDate);
    }
  };

  // Handle next week navigation, no restrictions needed, it can go to future weeks
  const handleNextWeek = () => {
    setCurrentDate((prevDate) => moment(prevDate).add(1, 'week'));
  };

  const weekDays = generateWeek(currentDate);

  // Generate time slots
  const generateTimeSlots = (startTime, endTime) => {
    const slots = [];
    let current = moment(startTime, 'h:mm A');
    const end = moment(endTime, 'h:mm A');

    while (current <= end) {
      slots.push(current.format('h:mm A'));
      current.add(30, 'minutes');
    }
    return slots;
  };

  const timeSlots = generateTimeSlots('10:00 AM', '2:00 PM');

  const handleSpecialistSelect = (specialist) => {
    setSelectedSpecialist(specialist.id);
    navigation.navigate('SpecialistDetails', { specialist });
  };

  const handleServiceSelect = (id) => {
    setSelectedService(id);
    // Alert.alert('Selected Service', `You selected service ID: ${id}`);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Select your service</Text>
      </View>

      <View style={styles.monthContainer}>
        <TouchableOpacity onPress={handlePreviousWeek} disabled={moment(currentDate).isBefore(moment(), 'day')}>
          <Icon name="chevron-left" size={28} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.monthText}>{currentDate.format('MMMM, YYYY')}</Text>
        <TouchableOpacity onPress={handleNextWeek}>
          <Icon name="chevron-right" size={28} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.calendarContainer}>
        <FlatList
          data={weekDays}
          horizontal
          keyExtractor={(item) => item.date}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.dateContainer,
                item.date === selectedDate && styles.selectedDate,
                item.isPast && { opacity: 0.5 }, // Disable styling for past dates
              ]}
              onPress={() => !item.isPast && setSelectedDate(item.date)} // Disable selection for past dates
              disabled={item.isPast} // Disable touch for past dates
            >
              <Text style={styles.dayName}>{item.dayName}</Text>
              <Text
                style={[
                  styles.dayNumber,
                  item.date === selectedDate && styles.selectedDayText,
                ]}
              >
                {item.displayDate}
              </Text>
            </TouchableOpacity>
          )}
          showsHorizontalScrollIndicator={false}
        />
      </View>

      <Text style={styles.sectionTitle}>Available Time Slots</Text>
      <View style={styles.timeSlots}>
        {timeSlots.map((time, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.timeSlot,
              selectedTime === time && styles.selectedTimeSlot,
            ]}
            onPress={() => setSelectedTime(time)}
          >
            <Text style={styles.timeSlotText}>{time}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Choose Hair Specialist</Text>
      <FlatList
        horizontal
        data={specialists}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.specialistCard,
              selectedSpecialist === item.id && styles.selectedCard,
            ]}
            onPress={() => handleSpecialistSelect(item)}
          >
            <Image source={item.imagelist} style={styles.imagelist} />
            <Text style={styles.name}>{item.name}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
        showsHorizontalScrollIndicator={false}
      />

      <Text style={styles.sectionTitle}>Service</Text>
      <FlatList
        horizontal
        data={services}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.serviceCard}
            onPress={() => handleServiceSelect(item.id)}
          >
            <Image source={item.image} style={styles.image} />
            <Text style={styles.name}>{item.name}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
        showsHorizontalScrollIndicator={false}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  header: {
    backgroundColor: '#182b3c',
    paddingVertical: 20,
    paddingHorizontal: 15,
    flexDirection: 'row',
  },
  headerText: {
    color: '#fff',
    fontSize: 18,
    marginLeft: 100,
    marginTop:20,
    fontWeight: 'bold',
  },
  monthContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#182b3c',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  monthText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  calendarContainer: {
    backgroundColor: '#182b3c',
    paddingVertical: 15,
  },
  dateContainer: {
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginHorizontal: 5,
    borderRadius: 8,
    backgroundColor: '#283848',
  },
  selectedDate: {
    backgroundColor: '#FF5722',
  },
  dayName: {
    color: '#fff',
    fontSize: 14,
  },
  dayNumber: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  selectedDayText: {
    color: '#FFF',
  },
  timeSlots: {
    flexDirection: 'row',
    flexWrap: 'wrap', // Allow wrapping of time slots
    justifyContent: 'space-between', // Ensure even spacing
    marginHorizontal: 15,
    marginVertical: 10,
  },
  timeSlot: {
    backgroundColor: 'white',
    paddingVertical: 10, // Adjust padding to make it more consistent
    paddingHorizontal: 15,
    borderRadius: 15,
    margin: 5,
    alignItems: 'center',
    minWidth: 80, // Ensure each time slot has a minimum width
    maxWidth: '30%', // Prevent it from expanding too much
    justifyContent: 'center', // Center the text inside the slot
  },
  timeSlotText: {
    fontSize: 14,
    fontWeight: '500',
  },
  selectedTimeSlot: {
    backgroundColor: '#FF5722',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 15,
    marginTop: 20,
  },
  specialistCard: {
    alignItems: 'center',
    marginHorizontal: 10,
    marginTop: 20,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  selectedCard: {
    borderWidth: 2,
    borderColor: '#FF5722',
  },
  imagelist: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginBottom: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: '500',
  },
  serviceCard: {
    alignItems: 'center',
    marginHorizontal: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  image:{
    width:90,
    height:80,
    borderRadius:10,
    objectFit:'cover',
  },
});
9