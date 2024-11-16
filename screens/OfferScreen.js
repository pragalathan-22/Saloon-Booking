import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

// Assuming you have the images in the 'assets' folder
const offers = [
  {
    id: 1,
    title: '50% Off on Electronics',
    description: 'Get 50% off on all electronic items. Limited time offer!',
    image: require('../assets/stylist9.jpg'), // Replace with actual path to the image
  },
  {
    id: 2,
    title: 'Buy 1 Get 1 Free',
    description: 'Buy one item and get another absolutely free!',
    image: require('../assets/stylist9.jpg'), // Replace with actual path to the image
  },
  {
    id: 3,
    title: 'Free Shipping',
    description: 'Enjoy free shipping on orders above $50!',
    image: require('../assets/stylist9.jpg'), // Replace with actual path to the image
  },
];

const OfferScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {offers.map((offer) => (
        <TouchableOpacity key={offer.id} style={styles.offerCard} onPress={() => alert(`Offer: ${offer.title}`)}>
          <View style={styles.imageContainer}>
            <Image source={offer.image} style={styles.offerImage} />
            <View style={styles.overlay}>
              <Text style={styles.offerTitle}>{offer.title}</Text>
              <Text style={styles.offerDescription}>{offer.description}</Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#f5f5f5',
    marginTop:50,
  },
  offerCard: {
    marginBottom: 15,
    borderRadius: 15,
    overflow: 'hidden',
    width: '100%',
    maxWidth: 320,
    alignSelf: 'center',
  },
  imageContainer: {
    position: 'relative', // For overlaying text on the image
    borderRadius: 15,
    overflow: 'hidden',
  },
  offerImage: {
    width: '100%',
    height: 170, // Adjusted height for the image
    resizeMode: 'cover',
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)', // Semi-transparent overlay
    padding: 15,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  offerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  offerDescription: {
    fontSize: 14,
    color: '#fff',
  },
});

export default OfferScreen;
