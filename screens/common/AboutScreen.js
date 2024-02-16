import React from 'react';
import { View, Text, StyleSheet, Image, Linking } from 'react-native';

const AboutScreen = () => {
  return (
    <View style={styles.container}>
     <Image source={require('../../assets/images/operatedcoinLogo.png')} tintColor={'white'} resizeMode="contain" style={{width: '100%', height: 'auto', aspectRatio: 3 }}/>
      <Text style={styles.aboutText}>We find new ways to make shared experiences by mixing theatre and tech.</Text>
      <Text style={styles.aboutText}>We are writers, coders, performers, designers, directors and tinkerers working with mixed methods of creation, such as the use of location-based services to augmented reality to new writing and script development. We tease out a tension between the new and the old to create meaningful experiences for audiences and artists alike. We work from Burramattugal Country in Parramatta, Australia.</Text>
      <Text style={styles.aboutText}>If you’d like to have a chat about our work, something you’re dreaming up or if you require tech support connected to one of our experiences, please get in touch on <Text style={styles.aboutLink} onPress={() => Linking.openURL('mailto:hello@operatedcoin.com')}>hello@operatedcoin.com</Text></Text>
    </View>
  );
};

export default AboutScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingBottom: 50,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgb(9 9 11);',
  },
  aboutText: {
    textAlign: 'center',
    color: 'white',
    marginBottom: 10,
    fontSize: 16,
    lineHeight: 24,
  },
  aboutLink: {
    textAlign: 'center',
    color: '#C7019C',
    marginBottom: 10,
    fontSize: 16,
    lineHeight: 24,
  },
});