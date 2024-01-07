// circleDashboardStyles.js

import { StyleSheet, Dimensions } from 'react-native';

// Calculate circle positions for the smaller circle
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const centerX = windowWidth / 2;
const centerY = windowHeight / 2;
const smallerCircleRadius = 40; // Smaller circle radius
const biggerCircleRadius = smallerCircleRadius * 3; // Bigger circle radius

export const circleDashboardStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  circle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  deviceText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  rssiText: {
    fontSize: 14,
    color: 'white',
  },
  // New styles related to positioning circles
  bigCircle: {
    backgroundColor: 'gray',
    position: 'absolute',
    left: centerX - biggerCircleRadius,
    top: centerY - biggerCircleRadius,
    width: biggerCircleRadius * 2,
    height: biggerCircleRadius * 2,
    borderRadius: biggerCircleRadius,
  },
  smallCircle: (deviceName, x, y) => ({
    backgroundColor: deviceName || 'gray', // Fallback to gray if color is not found
    position: 'absolute',
    left: x - smallerCircleRadius,
    top: y - smallerCircleRadius,
    width: smallerCircleRadius * 2,
    height: smallerCircleRadius * 2,
    borderRadius: smallerCircleRadius,
    justifyContent: 'center', // Center children vertically
    alignItems: 'center', // Center children horizontally
  }),
});

