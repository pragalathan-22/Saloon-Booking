import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { db } from '../Firebase/FirebaseConfig'; // Import Firebase Firestore
import { collection, addDoc } from 'firebase/firestore';

export default function SpecialistDetailsScreen({ route }) {
  const { specialist } = route.params;
  const [selectedTab, setSelectedTab] = useState('About');
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);
  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedTime, setSelectedTime] = useState(null);
  const [reviewsList, setReviewsList] = useState([]);

  const toggleServiceSelection = (id) => {
    setSelectedServices((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((serviceId) => serviceId !== id)
        : [...prevSelected, id]
    );
  };

  const bookAppointment = async (specialist, time, services) => {
    try {
      const availableServices = [
        { id: 1, name: 'Hair Styling' },
        { id: 2, name: 'Eyebrow Care' },
        { id: 3, name: 'Hair Cut' },
        { id: 4, name: 'Makeup Skincare' },
        { id: 5, name: 'Shaving' },
      ];

      const selectedServiceNames = services.map(
        (serviceId) =>
          availableServices.find((service) => service.id === serviceId)?.name
      );

      const appointmentData = {
        specialist: specialist.name,
        time,
        services: selectedServiceNames,
        createdAt: new Date(),
      };

      const docRef = await addDoc(collection(db, 'appointments'), appointmentData);
      Alert.alert('Success', 'Your appointment has been booked!');
    } catch (error) {
      Alert.alert('Error', 'Failed to book appointment. Please try again.');
    }
  };

  const handleSendReview = () => {
    if (!review || rating === 0) {
      Alert.alert('Error', 'Please provide a review and a rating.');
      return;
    }

    const newReview = {
      review,
      rating,
      id: Date.now().toString(), // Generate a unique ID
    };

    setReviewsList((prevReviews) => [newReview, ...prevReviews]);
    setReview('');
    setRating(0);
    Alert.alert('Success', 'Review submitted successfully!');
  };

  const renderAboutContent = () => (
    <View style={styles.content}>
      <Text style={styles.sectionTitle}>Available Time</Text>
      <View style={styles.timeSlots}>
        {['10:00 AM', '11:30 AM', '12:00 PM', '01:05 PM', '02:30 PM'].map((time, index) => (
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
      <Text style={styles.sectionTitle}>Information</Text>
      <Text style={styles.contentText}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur euismod, nunc sed fermentum blandit, nisl
        velit ultrices ligula, sit amet consectetur magna purus at risus.
      </Text>
      <Text style={styles.sectionTitle}>Contact</Text>
      <View style={styles.contact}>
        <Text style={styles.contactText}>Phone: +091 7788223736</Text>
        <Text style={styles.contactText}>Email: info@hairstyle.in</Text>
      </View>
    </View>
  );

  const renderServicesContent = () => (
    <FlatList
      data={[
        { id: 1, name: 'Hair Styling', duration: '45 mins', price: '$30', image: require('../assets/stylist9.jpg') },
        { id: 2, name: 'Eyebrow Care', duration: '40 mins', price: '$25', image: require('../assets/stylist9.jpg') },
        { id: 3, name: 'Hair Cut', duration: '45 mins', price: '$30', image: require('../assets/stylist9.jpg') },
        { id: 4, name: 'Makeup Skincare', duration: '60 mins', price: '$50', image: require('../assets/stylist9.jpg') },
        { id: 5, name: 'Shaving', duration: '30 mins', price: '$20', image: require('../assets/stylist9.jpg') },
      ]}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => toggleServiceSelection(item.id)}
          style={[
            styles.serviceItem,
            selectedServices.includes(item.id) && styles.selectedServiceItem,
          ]}
        >
          <Image source={item.image} style={styles.serviceImage} />
          <View style={styles.serviceInfo}>
            <Text style={styles.serviceName}>{item.name}</Text>
            <Text>{item.duration}</Text>
            <Text style={styles.price}>{item.price}</Text>
          </View>
          <TouchableOpacity onPress={() => toggleServiceSelection(item.id)}>
            <FontAwesome
              name={selectedServices.includes(item.id) ? 'minus' : 'plus'}
              size={24}
              color={selectedServices.includes(item.id) ? '#FF5722' : '#C0C0C0'}
            />
          </TouchableOpacity>
        </TouchableOpacity>
      )}
      keyExtractor={(item) => item.id.toString()}
    />
  );

  const renderReviewContent = () => (
    <View style={styles.content}>
      <Text style={styles.contentText}>What do you feel about this stylist?</Text>
      <View style={styles.starRating}>
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity key={star} onPress={() => setRating(star)}>
            <FontAwesome
              name="star"
              size={24}
              color={star <= rating ? '#FFD700' : '#C0C0C0'}
            />
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.reviewInputContainer}>
        <TextInput
          style={styles.reviewInput}
          placeholder="Write your review..."
          value={review}
          onChangeText={setReview}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSendReview}>
          <MaterialIcons name="send" size={24} color="white" />
        </TouchableOpacity>
      </View>
      {reviewsList.length > 0 && (
        <View style={styles.sampleReviews}>
          <Text style={styles.sectionTitle}>Reviews:</Text>
          {reviewsList.map((item) => (
            <View key={item.id} style={styles.reviewItem}>
              <Text style={styles.reviewAuthor}>Rating: {item.rating} stars</Text>
              <Text style={styles.reviewText}>{item.review}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <Image source={specialist.imagelist} style={styles.image} />
      <Text style={styles.name}>{specialist.name}</Text>
      <View style={styles.tabContainer}>
        {['About', 'Services', 'Review'].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, selectedTab === tab && styles.activeTab]}
            onPress={() => setSelectedTab(tab)}
          >
            <Text
              style={[
                styles.tabText,
                selectedTab === tab && styles.activeTabText,
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <ScrollView style={styles.scrollContainer}>
        {selectedTab === 'About' && renderAboutContent()}
        {selectedTab === 'Review' && renderReviewContent()}
        {selectedTab === 'Services' && renderServicesContent()}
      </ScrollView>
      <TouchableOpacity
        style={styles.bookButton}
        onPress={() => {
          if (selectedTime && selectedServices.length > 0) {
            bookAppointment(specialist, selectedTime, selectedServices);
          } else {
            Alert.alert('Error', 'Please select a time and at least one service.');
          }
        }}
      >
        <Text style={styles.bookButtonText}>Book Appointment</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 15,
  },
  image: {
    width: '100%',
    height: 200,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#FF5722',
  },
  tabText: {
    fontSize: 16,
  },
  activeTabText: {
    color: '#FF5722',
    fontWeight: 'bold',
  },
  content: {
    paddingBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  contentText: {
    fontSize: 16,
    marginBottom: 10,
  },
  contact: {
    marginBottom: 15,
  },
  contactText: {
    fontSize: 16,
    color: '#555',
  },
  timeSlots: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  timeSlot: {
    backgroundColor: '#FF5722',
    borderRadius: 15,
    padding: 8,
    margin: 5,
  },
  selectedTimeSlot: {
    backgroundColor: 'black',
  },
  timeSlotText: {
    color: '#fff',
  },
  serviceItem: {
    flexDirection: 'row',
    paddingVertical: 10,
    alignItems: 'center',
    marginBottom: 5,
    padding: 10,
    borderRadius: 5,
  },
  selectedServiceItem: {
    backgroundColor: '#FFEBCC',
  },
  serviceImage: {
    width: 50,
    height: 50,
    marginRight: 10,
    backgroundColor: 'white',
  },
  serviceInfo: {
    flex: 1,
  },
  serviceName: {
    fontWeight: 'bold',
  },
  price: {
    color: '#FF5722',
    fontWeight: 'bold',
  },
  starRating: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  reviewInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  reviewInput: {
    flex: 1,
    borderColor: '#ddd',
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
  sendButton: {
    backgroundColor: '#FF5722',
    padding: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
  sampleReviews: {
    marginTop: 10,
  },
  reviewAuthor: {
    fontWeight: 'bold',
    marginTop: 10,
  },
  reviewText: {
    fontSize: 16,
    color: '#555',
  },
  bookButton: {
    backgroundColor: '#FF5722',
    padding: 15,
    borderRadius: 30,
    margin: 20,
    alignItems: 'center',
  },
  bookButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
