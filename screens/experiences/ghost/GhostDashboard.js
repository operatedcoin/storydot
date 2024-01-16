import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { globalStyles } from '../../../themes/globalStyles'; // Import global styles

const GhostDashboard = ({ navigation }) => {
  return (
    <ScrollView>
      <View>
        <TouchableOpacity style={globalStyles.moduleButton} onPress={() => navigation.navigate('BeaconTest')}>
          <Text style={globalStyles.buttonText}>Beacon Test</Text>
        </TouchableOpacity>

        {/* Button to navigate to Chapter One */}
        <TouchableOpacity style={globalStyles.moduleButton} onPress={() => navigation.navigate('ChapterOne')}>
          <Text style={globalStyles.buttonText}>Chapter One</Text>
        </TouchableOpacity>

        {/* Button to navigate to Chapter Two */}
        <TouchableOpacity style={globalStyles.moduleButton} onPress={() => navigation.navigate('ChapterTwo')}>
          <Text style={globalStyles.buttonText}>Chapter Two</Text>
        </TouchableOpacity>

        {/* Button to navigate to Chapter Three */}
        <TouchableOpacity style={globalStyles.moduleButton} onPress={() => navigation.navigate('ChapterThree')}>
          <Text style={globalStyles.buttonText}>Chapter Three</Text>
        </TouchableOpacity>

        {/* Button to navigate to Chapter Four */}
        <TouchableOpacity style={globalStyles.moduleButton} onPress={() => navigation.navigate('ChapterFour')}>
          <Text style={globalStyles.buttonText}>Chapter Four</Text>
        </TouchableOpacity>

        {/* Button to navigate to Chapter Five */}
        <TouchableOpacity style={globalStyles.moduleButton} onPress={() => navigation.navigate('ChapterFive')}>
          <Text style={globalStyles.buttonText}>Chapter Five</Text>
        </TouchableOpacity>

        {/* Include other navigational elements as needed */}
        </View>

    </ScrollView>
  );
};

export default GhostDashboard;
