import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Platform,
  Animated
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';  // Importing Location from expo-location

const stylists = [
  { id: 1, name: 'Stylist 1', image: require('../assets/stylist9.jpg'), category: 'Men\'s Haircut' },
  { id: 2, name: 'Stylist 2', image: require('../assets/stylist9.jpg'), category: 'Women\'s Haircut' },
  { id: 3, name: 'Stylist 3', image: require('../assets/stylist9.jpg'), category: 'Shaving' },
  { id: 4, name: 'Stylist 4', image: require('../assets/stylist9.jpg'), category: 'Hair Coloring' },
  { id: 5, name: 'Stylist 5', image: require('../assets/stylist9.jpg'), category: 'Beard Styling' },
  { id: 6, name: 'Stylist 6', image: require('../assets/stylist9.jpg'), category: 'Haircut & Shaving' },
];

const { width } = Dimensions.get('window');

const HomeScreen = () => {
  const [locationName, setLocationName] = useState('Fetching location...');
  const [rotation, setRotation] = useState(new Map());  // To manage rotation of each card
  const navigation = useNavigation();

  useEffect(() => {
    const requestLocationPermission = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setLocationName('Permission denied');
        return;
      }

      getLocation();
    };

    requestLocationPermission();
  }, []);

  const getLocation = async () => {
    try {
      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      const address = await Location.reverseGeocodeAsync({ latitude, longitude });

      // Extract area or district from the address
      if (address.length > 0) {
        const { district, city, suburb } = address[0]; // Change order of preference
        // Check if district is available first
        if (district) {
          setLocationName(district);
        } else if (suburb) {
          setLocationName(suburb);
        } else if (city) {
          setLocationName(city);
        } else {
          setLocationName('Location not found');
        }
      } else {
        setLocationName('Location not found');
      }
    } catch (error) {
      console.error('Error fetching location:', error);
      setLocationName('Unable to fetch location');
    }
  };

  const rotateCard = (id) => {
    const newRotation = rotation.get(id) === 0 ? 180 : 0;  // Toggle between 0 and 180 degrees

    // Create a new rotation map where we reset all other cards to 0 degrees
    const newRotationMap = new Map(rotation);
    newRotationMap.set(id, newRotation);

    // Set the rotation for other cards to 0 degrees
    rotation.forEach((value, key) => {
      if (key !== id) {
        newRotationMap.set(key, 0);
      }
    });

    setRotation(newRotationMap);  // Update the rotation state
  };

  const renderStylist = ({ item }) => {
    const rotateValue = rotation.get(item.id) || 0;  // Get the current rotation value for the card
    const rotateAnim = new Animated.Value(rotateValue);

    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => rotateCard(item.id)} // Toggle rotation on press
      >
        <Animated.View
          style={[
            styles.cardContent,
            {
              transform: [
                { rotateY: rotateAnim.interpolate({ inputRange: [0, 180], outputRange: ['0deg', '180deg'] }) },
              ],
            },
          ]}
        >
          <View style={styles.imageContainer}>
            <Image source={item.image} style={styles.image} />
          </View>
          <View style={styles.content}>
            <Text style={styles.title}>{item.name}</Text>
            <Text style={styles.description}>Experience: 5 yrs, Rating: 4.8</Text>
          </View>
        </Animated.View>

        {/* Back of the card */}
        <Animated.View
          style={[
            styles.cardContent,
            styles.cardBack,
            {
              transform: [
                { rotateY: rotateAnim.interpolate({ inputRange: [0, 180], outputRange: ['180deg', '0deg'] }) },
              ],
            },
          ]}
        >
          <View style={styles.content}>
            <Text style={styles.categoryText}>{item.category}</Text>
          </View>
        </Animated.View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.location}>{locationName}</Text>
        <TouchableOpacity style={styles.profileIconContainer}>
          <Image
            source={require('../assets/stylist9.jpg')}
            style={styles.profileIcon}
          />
        </TouchableOpacity>
      </View>

      <FlatList
        data={stylists}
        renderItem={renderStylist}
        keyExtractor={(item) => item.id.toString()}
        numColumns={width > 600 ? 3 : 2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.stylistGrid}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={<View style={{ height: 100 }} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    marginTop: 25,
    padding: Platform.OS === 'web' ? 10 : 0,
  },
  header: {
    padding: 20,
    backgroundColor: '#f5f5f5',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 16,
    color: '#333',
  },
  picker: {
    height: 40,
    width: 180,
  },
  profileIconContainer: {
    paddingLeft: 10,
  },
  profileIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  stylistGrid: {
    paddingHorizontal: 10,
  },
  row: {
    justifyContent: 'space-between',
  },
  card: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 10,
    margin: 20,
    marginTop: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  cardContent: {
    flex: 1,
    backfaceVisibility: 'hidden',
    borderRadius: 10,
  },
  cardBack: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
  },
  imageContainer: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  image: {
    width: '100%',
    height: 130,
    marginTop: -50,
    borderRadius: 15,
    objectFit: "contain",
  },
  content: {
    padding: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: '#555',
  },
  categoryText: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
  },
  location: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
});

export default HomeScreen;
