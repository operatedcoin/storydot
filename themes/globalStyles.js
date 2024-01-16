// themes/globalStyles.js

import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';

const screenHeight = Dimensions.get('window').height;



export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 0, // Minimize padding
    paddingHorizontal: 0, // Minimize padding
    backgroundColor: 'white',
    // Consider adding a temporary border to debug
    borderColor: 'red',
    borderWidth: 1,
  },
  input: {
    height: 40,
    marginBottom: 10,
    borderWidth: 1,
    padding: 10,
    backgroundColor: '#c7259c', // Your existing background color
    width: '90%', // Set width to 100% of the parent container
    color: '#fff',
    
  },
  button: {
    backgroundColor: '#15231a', // Example button color
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff', // or any other color
    textAlign: 'center',
    fontWeight: 'bold', // Make text bold
    fontSize: 25, // Increase font size
  },
  errorText: {
    color: '#c7259c',
    marginTop: 10,
    marginBottom: 10,
    textAlign: 'center'
  },
  subLink: {
    marginTop: 15,
    color: '#15231a', // Feel free to change the color
    textAlign: 'center'
  },  
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 0, // Ensure no margin is causing white space
    marginTop: 0,
    textAlign: 'left',
    alignSelf: 'stretch',
    padding: 0,
    borderColor: 'blue',
    borderWidth: 5,
  },
  box: {
    width: '90%', // Adjust width as necessary
    padding: 20,
    marginVertical: 10, // Adjusted space between boxes
    borderWidth: 1,
    borderColor: '#ddd', // Adjust as necessary for your app's theme
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: '#f9f9f9', // Light background for each box
  },
  boxHeader: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  moduleButton: {
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#15231a',
    padding: 10,
    borderRadius: 5,
    marginRight: 8,
    marginBottom: 5, // Added or adjust as needed to control gap below buttons
  },
  logoutButton: {
    position: 'absolute',
    top: 10, // Ensure it doesn't overlap too much
    right: 10,
    padding: 10,
    zIndex: 1,
    backgroundColor: 'gray', // Set a background color for the button
    borderRadius: 10, // Optional: if you want rounded corners
  },
  logoutButtonText: {
    color: '#fff', // Set text color
    fontSize: 14, // Make text smaller
  },
    sectionWrapper: {
    marginBottom: 0, // Adjust this to control the overall gap between sections
  },
  heroTile: {
    backgroundColor: 'black',
    height: screenHeight / 2, // Set height to half of the screen height

    borderRadius: 10,
    padding: 10, // Minimized padding
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
    marginVertical: 0, // Minimize margin
    // Consider adding a temporary border to debug
     borderColor: 'green',
     borderWidth: 5,
  },
  heroText: {
    color: 'white', // Set text color to white
    fontSize: 20, // Adjust font size as needed
    fontWeight: 'bold', // Bold text
    marginVertical: 0,
    // Add any other text styling as needed
  },
  scrollModule: {
    borderColor: 'blue', // Keep the border for debugging
    borderWidth: 1,
    alignSelf: 'stretch',
    alignItems: 'flex-start', // Align items to the start
    marginBottom: 0, // Minimize margin
    padding: 0, // Reset padding
  },
  scrollViewContent: {
    
    alignItems: 'center', // Moves from the children to here
    paddingVertical: 5,
    marginHorizontal: 0,
    width: '100%', // Add some vertical padding
    // Add any other styles that affect the layout of children globally
  },


});
