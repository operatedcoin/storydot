import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import firebase from '../../firebaseConfig';
import { globalStyles } from '../../themes/globalStyles';
import { StatusBar } from 'expo-status-bar';

const ios = Platform.OS === 'ios';

const HomeScreen = ({ navigation }) => {
  const handleLogout = () => {
    firebase.auth().signOut()
      .then(() => {
        // Navigate back to Login Screen or handle logout
      })
      .catch(error => console.log(error.message));
  };

  return (
    <View className="flex-1 bg-green-900">
        {/* Movie poster*/}
        <View className="bg-blue-500 h-80">
            <SafeAreaView className="mx-4 flex-col grow">
            
            <View className="bg-purple-500 items-end">
            <TouchableOpacity onPress={handleLogout} >
              <Text style={globalStyles.logoutButtonText}>Logout</Text>
            </TouchableOpacity>
            </View>

            <View className="grow"></View>  

            <View className="bg-red-500 items-center">
            <Text>App Name</Text>
            </View>

            <View className="grow"></View>

            </SafeAreaView>
        </View>

        <ScrollView className="bg-lime-500">
          <View className="mx-4 py-2">  
          <Text className="text-white text-xl font-bold">Experience a show</Text>
          </View>

          <ScrollView 
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{paddingHorizontal: 15}}
          >
          {/* Add your module buttons here */}
          <TouchableOpacity onPress={() => navigation.navigate('TownHallWelcomeScreen')} style={globalStyles.moduleButton}>
          <Text className="text-white font-bold">Parramatta Town Hall</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('GhostWelcomeScreen')} style={globalStyles.moduleButton}>
            <Text className="text-white font-bold">Ghost</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('DemoWelcomeScreen')} style={globalStyles.moduleButton}>
            <Text className="text-white font-bold">Demo</Text>
          </TouchableOpacity>

        </ScrollView>

        </ScrollView>

        </View>
  );
};

export default HomeScreen;
