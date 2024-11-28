import React from 'react';
import { View, Text, StyleSheet, Linking, TouchableOpacity } from 'react-native';
import { WebView } from 'react-native-webview';
import Icon from 'react-native-vector-icons/FontAwesome';

const AboutScreen = () => {
  return (
    <View style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <Text style={styles.title}>About FoodDeck-Pro</Text>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.aboutText}>
          FoodDeck-Pro is a modern grocery online marketplace committed to delivering high-quality food products at affordable prices. Our platform offers a seamless shopping experience, combining convenience and cost-effectiveness. With perfect logistics systems in place, we ensure that your groceries are delivered fresh and on time right to your doorstep.
        </Text>

        {/* Google Map */}
        <Text style={styles.sectionTitle}>Find Us Here</Text>
        <View style={styles.mapContainer}>
          <WebView
            source={{
              uri: `https://www.google.com/maps/embed/v1/place?key=YOUR_GOOGLE_MAPS_API_KEY&q=${encodeURIComponent(
                'The City Mall, Onikan, Lagos, Nigeria'
              )}`,
            }}
            style={styles.map}
          />
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerTitle}>Contact Us</Text>
        <Text style={styles.footerText}>Address: The City Mall, Onikan, Lagos, Nigeria</Text>
        <Text style={styles.footerText}>Phone: +234 912 390 7060</Text>
        <TouchableOpacity onPress={() => Linking.openURL('mailto:info@fooddeckpro.com.ng')}>
          <Text style={[styles.footerText, styles.email]}>info@fooddeckpro.com.ng</Text>
        </TouchableOpacity>

        {/* Social Media Links */}
        <View style={styles.socialLinks}>
          <TouchableOpacity onPress={() => Linking.openURL('https://facebook.com/fooddeckpro')}>
            <Icon name="facebook" size={24} color="#FFF" style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Linking.openURL('https://twitter.com/fooddeckpro')}>
            <Icon name="twitter" size={24} color="#FFF" style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Linking.openURL('https://instagram.com/fooddeckpro')}>
            <Icon name="instagram" size={24} color="#FFF" style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Linking.openURL('https://linkedin.com/company/fooddeckpro')}>
            <Icon name="linkedin" size={24} color="#FFF" style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default AboutScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  topBar: {
    backgroundColor: '#2D7B30',
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
  },
  content: {
    padding: 16,
  },
  aboutText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FE9801',
    marginBottom: 10,
  },
  mapContainer: {
    height: 200,
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 20,
  },
  map: {
    flex: 1,
  },
  footer: {
    backgroundColor: '#2D7B30',
    padding: 16,
  },
  footerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 8,
  },
  footerText: {
    fontSize: 14,
    color: '#FFF',
    marginBottom: 4,
  },
  email: {
    textDecorationLine: 'underline',
  },
  socialLinks: {
    flexDirection: 'row',
    marginTop: 16,
  },
  icon: {
    marginHorizontal: 10,
  },
});
