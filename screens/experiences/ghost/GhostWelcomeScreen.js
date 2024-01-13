import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { globalStyles } from '../../../themes/globalStyles'; // Import global styles

const GhostWelcomeScreen = ({ navigation }) => {
  return (
<View style={globalStyles.container}>
         <TouchableOpacity style={globalStyles.moduleButton} onPress={() => navigation.navigate('Begin')}>
          <Text style={globalStyles.buttonText}>Begin</Text>
        </TouchableOpacity>

        <TouchableOpacity style={globalStyles.moduleButton} onPress={() => navigation.navigate('Dashboard')}>
          <Text style={globalStyles.buttonText}>Dashboard</Text>
        </TouchableOpacity>

        {/* Include other navigational elements as needed */}

    </View>
  );
};

export default GhostWelcomeScreen;
