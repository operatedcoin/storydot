export const devices = [
        {
      name: 'Red',
      rssi: -55,
      title: 'Ghost #1',
      audioFile: require('../assets/audio/MysteryTheme.wav'),
      subTitle: "I am Ghost #1",
      description: "This is Ghost #1",
      image: '../../assets/images.coin.jpeg'
    },
      {
        name: 'Blue',
        rssi: -100,
        title: 'Ghost #2',
        audioFile: require('../assets/audio/MysteryTheme.wav'),
        subTitle: "I am Ghost #1",
        description: "This is Ghost #1",
        image: '../../assets/images.coin.jpeg'
      },
      {
        name: 'Green',
        rssi: -100,
        title: 'Ghost #3',
        audioFile: require('../assets/audio/MysteryTheme.wav'),
        subTitle: "I am Ghost #1",
        description: "This is Ghost #1",
        image: '../../assets/images.coin.jpeg'
      },
      {
        name: 'Purple',
        rssi: -100,
        title: 'Ghost #4',
        audioFile: require('../assets/audio/MysteryTheme.wav'),
        subTitle: "I am Ghost #4",
        description: "This is Ghost #4",
        image: '../assets/images.coin.jpeg'
      },
      {
        name: 'Yellow',
        rssi: -100,
        title: 'Ghost #5',
        audioFile: require('../assets/audio/MysteryTheme.wav'),
        subTitle: "I am Ghost #5",
        description: "This is Ghost #5",
        image: '../../assets/images.coin.jpeg'
      },
    // Add more devices here with different titles and audio files
  ];
  
const processDevices = (devices) => {
    return devices.map((device) => {
      const name = device.name;
      const audioFile = device.audioFile;
      const title = device.title;
      const subTitle = device.subTitle;
      const description = device.description;
      const image = device.image;
  
      return {
        name,
        audioFile,
        title,
        subTitle,
        description,
        image,
      };
    });

  };
  export { devices as colorBeaconDevices, processDevices };


  