// themes/globalStyles.js

import { StyleSheet } from 'react-native';



export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', // Keeps the boxes centered vertically
    alignItems: 'center', // Center the content horizontally
    padding: 3,
    backgroundColor: 'white',
  },
  input: {
    height: 40,
    marginBottom: 10,
    borderWidth: 1,
    padding: 10,
    backgroundColor: '#c7259c', // Your existing background color
    width: '100%', // Set width to 100% of the parent container
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
    marginBottom: 20,
    marginTop: 150, // Add top margin to lower the welcome text
    textAlign: 'left',
  },
  box: {
    width: '90%', // Adjust width as necessary, 90% makes it a bit wider
    padding: 20,
    marginVertical: 0, // Adds space between boxes
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    alignItems: 'center', // Ensures content in the box is centered
  },
  boxHeader: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  moduleButton: {
    width: 250, // Set a fixed width or use a percentage of the screen width
    height: 150, // Increased the height from 100 to 120
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#15231a', // Example button color
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 2, // Reduced horizontal margin for smaller padding between items
  },

  logoutButton: {
    position: 'absolute',
    top: 50, // Adjust as needed to fit within the screen
    right: 10,
    padding: 10,
    zIndex: 1,
    backgroundColor: '#e63946', // Set a background color for the button
    borderRadius: 5, // Optional: if you want rounded corners
  },
  logoutButtonText: {
    color: '#fff', // Set text color
    fontSize: 14, // Make text smaller
  },
});
