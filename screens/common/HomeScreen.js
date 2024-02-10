import React from 'react';
import {
  Animated,
  View,
  Text,
  Image,
  SafeAreaView,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  Dimensions
} from 'react-native';
import ParallaxScrollView from '../../components/visual/ParallaxScrollView';
import firebase from '../../firebaseConfig';
import { globalStyles } from '../../themes/globalStyles';
import { StatusBar } from 'expo-status-bar';
import experiencesData from '../experiences/experiencesData';
import { BlurView } from "@react-native-community/blur";
import { MaterialIcons } from '@expo/vector-icons';

const ios = Platform.OS === 'ios';
const { height } = Dimensions.get('window');

const heroImg = require('../../assets/images/voxstepHero.jpeg');

  const HomeScreen = ({ navigation }) => {

    const handleLogout = () => {
      firebase.auth().signOut()
        .then(() => {
          // Navigate back to Login Screen or handle logout
        })
        .catch(error => console.log(error.message));
    };
    
    const renderParallaxHeader = (value) => {
      return (
        <Image source={heroImg} style={Styles.image} resizeMode="cover" />
      );
    };
    
  
    const renderFixedHeader = (value) => {
      const titleOpacity = value.interpolate({
        inputRange: [0, 270, 300],
        outputRange: [0, 0, 1],
        extrapolate: 'clamp',
      });
    
      return (
        <SafeAreaView style={Styles.safeArea}>
        <StatusBar style="light" />
          {/* Animated BlurView */}
          <Animated.View 
            style={{ 
              position: 'absolute', 
              top: 0, 
              left: 0, 
              right: 0, 
              opacity: titleOpacity 
            }}>
            <BlurView
              style={Styles.headerContainer}
              blurType="dark"
              blurAmount={10}
            >
              <Animated.View
                style={[Styles.titleBackground, { opacity: titleOpacity }]}
              />
            </BlurView>
          </Animated.View>
    
          {/* Always visible elements */}
          <View style={Styles.leftAligned}>
          </View>
          <Animated.View
            style={[Styles.centerAligned, { opacity: titleOpacity }]}
          >
            <Text style={Styles.text}>Home</Text>
          </Animated.View>
          <View style={Styles.rightAligned}>
            {/* <Text style={Styles.text}>Logout</Text> */}
          </View>
        </SafeAreaView>
      );
    };
    
  
    const renderStickyHeader = (value) => {
      return (
        <View style={Styles.stickyHeader}>
          {/* <Text className="font-bold text-4xl text-white">Voxstep</Text> */}
        </View>
      );
    };
  
    const IHeight = 350;
    const HeaderHeight = 350;
  
    return (
      <ParallaxScrollView
        style={{ flex: 1, backgroundColor: 'rgb(23 23 23);' }}
        parallaxHeaderHeight={IHeight}
        stickyHeaderHeight={HeaderHeight}
        stickyHeader={renderStickyHeader}
        parallaxHeader={renderParallaxHeader}
        fixedHeader={renderFixedHeader}>
        <SafeAreaView style={{ flex: 1 }}>
          <View style={Styles.content}>
            <Text style={Styles.sectionTitle}>Experience a show</Text>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{paddingHorizontal: 10}}             
              data={Object.keys(experiencesData)}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => navigation.navigate('Details', { experienceId: item })}
                  style={Styles.cardContainer}
                >
                  <ImageBackground
                    source={experiencesData[item].image}
                    style={Styles.cardBackground}
                  >
                    <View style={Styles.card}>
                      <View style={Styles.centered}>
                        <Text style={Styles.cardTitle}>{experiencesData[item].title}</Text>
                        {experiencesData[item].suburb && (
                          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                            <MaterialIcons name="location-on" size={10} color="rgb(163 163 163);" />
                            <Text style={{ color: 'rgb(163 163 163);', fontSize: 10 }}>
                              {experiencesData[item].suburb}
                            </Text>
                          </View>
                        )}
                      </View>
                    </View>

                  </ImageBackground>
                </TouchableOpacity>
              )}
              keyExtractor={item => item}
            />
          </View>
        </SafeAreaView>
      </ParallaxScrollView>
    );
  };
  
  const Styles = StyleSheet.create({
    cardContainer: {
      margin: 5,
      width: 150, // Adjust the width of your card
      height: 200, // Adjust the height of your card
      borderRadius: 15,
      borderWidth: 1,
      borderColor: 'rgba(255, 255, 255, 0.08)',
      overflow: 'hidden', // Ensure that the View with borderRadius clips the content
    },
    card: {
      position: 'absolute',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      height: '100%',
      width: '100%',
    },
    cardBackground: {
      width: '100%',
      height: '100%',
    },
    centered: {
      flex: 1,
      justifyContent: 'center', // Center vertically
      alignItems: 'center', // Center horizontally
    },
    cardTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: 'white',
      textAlign: 'center'
    },
    headerContainer: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: 70, // Adjust as needed
    },
    safeArea: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: 70,
    },
    leftAligned: {
      flex: 1,
      paddingLeft: 8,
      justifyContent: 'flex-start',
    },
    centerAligned: {
      flex: 2,
      alignItems: 'center',
    },
    rightAligned: {
      flex: 1,
      paddingRight: 8,
      alignItems: 'flex-end',
      justifyContent: 'center',
      },
    fixedPart: {
      // Style for the   part of the header
    },
    animatedPart: {
      // Style for the animated part of the header
    },
    titleBackground: {
      ...StyleSheet.absoluteFillObject,
      height: 70, // Adjust the height to extend beyond the safe area
    },
    text: {
      color: 'white',
      // Additional text styling
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: '600',
      color: 'white',
      paddingLeft: 15,
      paddingTop: 10,
      paddingBottom: 6,
    },
    image: {
      width: '100%',
      height: '100%',
    },
  
    stickyHeader: {
      height: 350,
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    stickyHeaderBackground: {
      ...StyleSheet.absoluteFill,
    },
    content: {
      width: '100%',
      minHeight: height/2,
      backgroundColor: 'rgb(9 9 11);'
    },
  });
  
  export default HomeScreen;