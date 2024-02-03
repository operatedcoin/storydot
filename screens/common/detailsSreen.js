import React from 'react';
import { Animated, View, Text, Alert, Image, SafeAreaView, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import ParallaxScrollView from '../../components/visual/ParallaxScrollView';
import experiencesData from '../experiences/experiencesData';
import { globalStyles } from '../../themes/globalStyles';
import { BlurView } from "@react-native-community/blur";
import LinearGradient from 'react-native-linear-gradient';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';

const ios = Platform.OS === 'ios';

const { height } = Dimensions.get('window');

  // Function to parse the credits string
  const parseCredits = (credits) => {
    return credits.split(',').map(pair => pair.trim().split(':').map(item => item.trim()));
  };

  // Custom component for individual credit
  const CreditItem = ({ role, name }) => (
    <View style={Styles.creditItem}>
      <Text style={Styles.creditRole}>{role}:</Text>
      <Text style={Styles.creditName}>{name}</Text>
    </View>
  );

const DetailsScreen = ({ route, navigation }) => {
  const { experienceId } = route.params;
  const experience = experiencesData[experienceId];
  const creditsArray = parseCredits(experience.credits);
  const hasSupporters = experience.supporters && experience.supporters.length > 0;


  const navigateToExperience = () => {
    // Navigate to the specific navigator
    navigation.navigate(experience.navigator, { screen: 'Begin' });
  };

  const renderParallaxHeader = (value) => {
    return <View><Image source={experience.image} style={Styles.image} resizeMode="cover" /></View>
  };

  const renderFixedHeader = (value) => {
    const titleOpacity = value.interpolate({
      inputRange: [0, 270, 300],
      outputRange: [0, 0, 1],
      extrapolate: 'clamp',
    });
  
    return (
      <SafeAreaView style={Styles.safeArea}>
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
          <TouchableOpacity onPress={() => navigation.goBack()}>
          <BlurView
              style={{
                position: 'absolute', // To ensure BlurView doesn't affect layout
                borderRadius: 15,     // Match this to the icon's size and border radius
                width: 30,            // Adjust width and height to match the icon size
                height: 30,
                overlayColor: "white",
                opacity: 5,
              }}
              blurType="light"
              blurAmount={20}
            />
            <Ionicons name="chevron-back" size={26} color="white" />
          </TouchableOpacity>
        </View>
        <Animated.View style={[Styles.centerAligned, { opacity: titleOpacity }]}>
          <Text style={Styles.text}>{experience.title}</Text>
        </Animated.View>
        <View style={Styles.rightAligned}>
          {/* <Text style={Styles.text}>Logout</Text> */}
        </View>
      </SafeAreaView>
    );
  };
  

  const renderStickyHeader = (value) => {
    return (
      <View style={[Styles.stickyHeader, {zIndex: 100}]}>
        <Text className="font-bold text-4xl text-white text-center">{experience.title}</Text>
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
          <LinearGradient
            colors={[ 'transparent', 'rgb(9 9 11);']} // Adjust colors as needed
            style={{ position: 'absolute', left: 0, right: 0, top: 0, height: 350}} // Adjust the height and position as needed
          ></LinearGradient>
        <SafeAreaView style={{ flex: 1 }}>
          <View style={Styles.content}>

          <View style={{alignItems: 'center'}}>
          {experience.suburb && (
          <View style={{ flexDirection: 'row' }}>
              <>
                <MaterialIcons name="location-on" size={13} color="rgb(113 113 122)" />
                <Text style={{ fontSize: 12, color: 'rgb(113 113 122)' }}>
                  {experience.address}, {experience.suburb}
                </Text>
              </>
          </View>
          )
          }
            {experience.duration && (
              <View>
                <Text style={{ fontSize: 12, color: 'rgb(113 113 122)', marginBottom: 10 }}>
                  {experience.duration}
                </Text>
              </View>
            )}
            </View>

            <TouchableOpacity
  style={[globalStyles.button, { marginTop: 10, marginBottom: 20, width: '70%' }]}
  onPress={() => {
    Alert.alert(
      'Before we begin...',
      'This is a location-based experience.  We recommend you begin only when you have arrived at the location listed on this page.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Continue',
          onPress: navigateToExperience,
        },
      ],
      { cancelable: true }
    );
  }}
>
  <Text style={globalStyles.buttonText}>Begin</Text>
</TouchableOpacity>
      <Text style={Styles.descriptionText}>{experience.description}</Text>
      <View style={{borderBottomColor: 'rgba(255, 255, 255, 0.1)', borderBottomWidth: 1, marginVertical: 10,}}/>
      <Text style={Styles.sectionHeader}>Creative team</Text>
      <View style={Styles.creditsContainer}>
        {creditsArray.map(([role, name], index) => (
          <CreditItem key={index} role={role} name={name} />
        ))}
      </View>
      
      {
        hasSupporters && (
          <View>
            <View style={{ borderBottomColor: 'rgba(255, 255, 255, 0.1)', borderBottomWidth: 1, marginVertical: 10 }} />
            <Text style={Styles.sectionHeader}>Supported by</Text>
            <View style={Styles.supportersContainer}>
              {experience.supporters.map((supporter, index) => (
                <Image
                  key={index}
                  source={supporter}
                  style={Styles.supporterImage}
                />
              ))}
            </View>
          </View>
        )
      }


    </View>
    </SafeAreaView>
      </ParallaxScrollView>
  );
};

const Styles = StyleSheet.create({
  supportersContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  supporterImage: {
    width: 100,
    height: 40,
    resizeMode: 'contain',
    marginRight: 10,
    tintColor: 'white',
  },
  creditItem: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 5,
  },
  creditRole: {
    color: 'rgb(113 113 122)',
    fontSize: 12,
    marginRight: 5,
  },
  creditName: {
    color: 'white',
    fontSize: 12,
    },
  centered: {
    flex: 1,
    justifyContent: 'center', // Center vertically
    alignItems: 'center', // Center horizontally
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white'
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
  sectionHeader: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 20,
  },
  descriptionText: {
    color: 'white',
    fontSize: 16,
    lineHeight: 22,
  },
  image: {
    width: '100%',
    height: '100%',
  },

  stickyHeader: {
    height: 350,
    width: '100%',
    justifyContent: 'flex-end',
    paddingBottom: 10,
    alignItems: 'center',
  },
  stickyHeaderBackground: {
    ...StyleSheet.absoluteFill,
  },
  content: {
    width: '100%',
    paddingLeft: 20,
    paddingRight: 20,
    minHeight: height/2,
    backgroundColor: 'rgb(9 9 11);',

  },
});

export default DetailsScreen;
