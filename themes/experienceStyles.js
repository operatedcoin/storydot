// experiencesStyles.js

import { StyleSheet, Dimensions } from 'react-native';

const screenHeight = Dimensions.get('window').height;

export const experienceStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  heroTile: {
    height: screenHeight / 1.5, // half the screen height
    width: '100%', // full width
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#123456', // example color
  },
  heroText: {
    fontSize: 24,
    color: 'white',
  },
  scrollView: {
    width: '100%', // full width
  },
  moduleButton: {
    width: 250, // example width
    height: 150, // example height
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#789ABC', // example color
    margin: 2, // example margin
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
  },
  topBlock: {
    height: screenHeight / 4, // each block takes a quarter of the height
    width: '100%',
    backgroundColor: '#FFCCCC', // slightly different color for each
    justifyContent: 'center',
    alignItems: 'center',
  },
  topBlockHalf: {
    flex: 1, // make it take half of the top block space
    flexDirection: 'row', // align children in a row
    justifyContent: 'space-around', // evenly distribute children
    alignItems: 'center', // center children vertically
    width: '100%',
    backgroundColor: '#FFCCCC', // or any color you wish for the block
  },
  icon: {
    width: 50, // example size, adjust as needed
    height: 50, // example size, adjust as needed
    borderRadius: 25, // half of width/height to make it a circle
    backgroundColor: '#666', // example color, adjust as needed
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: {
    color: 'white', // adjust as needed
  },
  iconImage: {
    width: '100%', // fills the icon view
    height: '100%', // fills the icon view
    resizeMode: 'cover', // cover the entire area of the view
  },

});
