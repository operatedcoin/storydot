export const devices = [
    {
  name: 'Red',
  rssi: -55,
  title: 'Tissues',
  audioFile: require('../assets/audio/ghost/Tissues.mp3'),
  // description: "",
  //image: require('../assets/images/ocoin.jpeg')
},
  {
    name: 'Blue',
    rssi: -100,
    title: 'Bulletin Board',
    audioFile: require('../assets/audio/ghost/board.mp3'),
    // description: "",
    //image: require('../assets/images/ocoin.jpeg')
  },
  {
    name: 'Green',
    rssi: -100,
    title: 'Bag',
    audioFile: require('../assets/audio/ghost/Bag.mp3'),
    // description: "",
    //image: require('../assets/images/ocoin.jpeg')
  },
  {
    name: 'MsgSix',
    rssi: -100,
    title: 'People',
    audioFile: require('../assets/audio/ghost/People.mp3'),
    // description: "",
   // image: require('../assets/images/ocoin.jpeg')
  },
  {
    name: 'Yellow',
    rssi: -100,
    title: 'Maltesers',
    audioFile: require('../assets/audio/ghost/Maltesers.mp3'),
    subTitle: "I am Ghost #5",
    description: "",
    //image: require('../assets/images/ocoin.jpeg')
  },
  {
    name: 'Purple',
    rssi: -100,
    title: 'Wet Floor Sign',
    audioFile: require('../assets/audio/ghost/WetFloor.mp3'),
    subTitle: "I am Ghost #5",
    // description: "",
  },
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
export { devices as ghostBeaconDevices, processDevices };


