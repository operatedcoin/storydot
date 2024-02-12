export const devices = [
    {
  name: 'Red',
  rssi: -55,
  title: 'Tissues',
  audioFile: require('../assets/audio/ghost/beaconTissues.mp3'),
  // description: "",
  //image: require('../assets/images/ocoin.jpeg')
},
  {
    name: 'Blue',
    rssi: -100,
    title: 'Bulletin Board',
    audioFile: require('../assets/audio/ghost/beaconBulletin.mp3'),
    // description: "",
    //image: require('../assets/images/ocoin.jpeg')
  },
  {
    name: 'Green',
    rssi: -100,
    title: 'Bag',
    audioFile: require('../assets/audio/ghost/beaconBag.mp3'),
    // description: "",
    //image: require('../assets/images/ocoin.jpeg')
  },
  {
    name: 'MsgSix',
    rssi: -100,
    title: 'People',
    audioFile: require('../assets/audio/ghost/beaconPeople.mp3'),
    // description: "",
   // image: require('../assets/images/ocoin.jpeg')
  },
  {
    name: 'Yellow',
    rssi: -100,
    title: 'Maltesers',
    audioFile: require('../assets/audio/ghost/beaconMaltesers.mp3'),
    subTitle: "I am Ghost #5",
    description: "",
    //image: require('../assets/images/ocoin.jpeg')
  },
  {
    name: 'Purple',
    rssi: -100,
    title: 'Wet Floor Sign',
    audioFile: require('../assets/audio/ghost/beaconWetFloor.mp3'),
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


