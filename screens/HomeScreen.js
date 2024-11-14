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
import * as Location from 'expo-location';

const stylists = [
  { id: 1, name: 'Jord', image: require('../assets/stylist9.jpg'), category: 'Men\'s Haircut', experience: '5 yrs', rating: '4.8' },
  { id: 2, name: 'Prag', image: require('../assets/stylist9.jpg'), category: 'Women\'s Haircut', experience: '4 yrs', rating: '4.7' },
  { id: 3, name: 'Tam', image: require('../assets/stylist9.jpg'), category: 'Shaving', experience: '3 yrs', rating: '4.5' },
  { id: 4, name: 'Guna', image: require('../assets/stylist9.jpg'), category: 'Hair Coloring', experience: '6 yrs', rating: '4.9' },
  { id: 5, name: 'Yuva', image: require('../assets/stylist9.jpg'), category: 'Beard Styling', experience: '2 yrs', rating: '4.3' },
  { id: 6, name: 'Shad', image: require('../assets/stylist9.jpg'), category: 'Haircut & Shaving', experience: '7 yrs', rating: '4.6' },
];

const offers = [
  { id: 1, title: '50% Off Haircuts', image: require('../assets/stylist9.jpg') },
  { id: 2, title: 'Free Shave with Any Haircut', image: require('../assets/stylist9.jpg') },
  { id: 3, title: '20% Off on Color Treatments', image: require('../assets/stylist9.jpg') },
  { id: 4, title: 'Buy 1 Get 1 Free Beard Styling', image: require('../assets/stylist9.jpg') },
];

const { width } = Dimensions.get('window');

const HomeScreen = () => {
  const [locationName, setLocationName] = useState('Fetching location...');
  const [selectedCard, setSelectedCard] = useState(null); // Track selected card
  const [animatedValue] = useState(new Animated.Value(0)); // Animation value for showing new effects
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
      if (address.length > 0) {
        const { district, city, suburb } = address[0];
        setLocationName(district || suburb || city || 'Location not found');
      } else {
        setLocationName('Location not found');
      }
    } catch (error) {
      console.error('Error fetching location:', error);
      setLocationName('Unable to fetch location');
    }
  };

  const toggleCard = (id) => {
    if (selectedCard === id) {
      setSelectedCard(null); // Deselect card if clicked again
      Animated.timing(animatedValue, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      setSelectedCard(id); // Select new card
      Animated.timing(animatedValue, {
        toValue: 1, // Animation for new effect
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };

  const renderStylist = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => toggleCard(item.id)} // Toggle card on press
      >
        <Animated.View
          style={[styles.cardContent, {
            opacity: animatedValue.interpolate({ inputRange: [0, 1], outputRange: [1, 0.7] }), // Example of fade-in effect
          }]}
        >
          <View style={styles.imageContainer}>
            <Image source={item.image} style={styles.image} />
          </View>
          <Text style={styles.categoryText}>{item.category}</Text>
        </Animated.View>

        {/* Show additional information when card is clicked */}
        {selectedCard === item.id && (
          <Animated.View style={[styles.cardBack, {
            opacity: animatedValue.interpolate({ inputRange: [0, 1], outputRange: [0, 1] }), // Fade-in effect for back
          }]}>
            <View style={styles.textOverlay}>
              <Text style={styles.title}>{item.name}</Text>
              <Text style={styles.subtitle}>Category: {item.category}</Text>
              <Text style={styles.subtitle}>Experience: {item.experience}</Text>
              <Text style={styles.subtitle}>Rating: {item.rating}</Text>
            </View>
          </Animated.View>
        )}
      </TouchableOpacity>
    );
  };

  const renderOffer = ({ item }) => (
    <View style={styles.offerCard}>
      <Image source={item.image} style={styles.offerImage} />
      <Text style={styles.offerText}>{item.title}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.location}>{locationName}</Text>
        {/* <TouchableOpacity style={styles.profileIconContainer}>
          <Image source={require('../assets/stylist9.jpg')} style={styles.profileIcon} />
        </TouchableOpacity> */}
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

      <View style={styles.offerSection}>
        <FlatList
          data={offers}
          renderItem={renderOffer}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.offerList}
        />
      </View>
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
  location: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
    overflow: 'hidden',
    height: 190, // Adjust height as necessary
  },
  cardContent: {
    flex: 1,
    backfaceVisibility: 'hidden',
    borderRadius: 10,
    overflow: 'hidden',
    padding: 10,
  },
  cardBack: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: 15,
    borderRadius: 10,
  },
  imageContainer: {
    width: '100%',
    height: 120,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 10,
  },
  textOverlay: {
    justifyContent: 'flex-start',
    alignItems:"center",
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: '#777',
    marginBottom: 5,
  },
  categoryText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 10,
    alignItems:"center",
  },
  offerSection: {
    marginBottom: 50,
    paddingHorizontal: 10,
  },
  offerList: {
    paddingVertical: 10,
  },
  offerCard: {
    width: 200,
    height: 100,
    marginRight: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 3,
  },
  offerImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 8,
  },
  offerText: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    textShadowColor: 'rgba(0,0,0,0.6)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
});

export default HomeScreen;
