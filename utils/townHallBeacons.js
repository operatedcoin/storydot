export const devices = [
    {
  name: 'Red',
  rssi: -55,
  title: 'Hat',
  audioFile: require('../assets/audio/townHall/1_flyingPieman.mp3'),
  subTitle: "I am Ghost #1",
  description: "Back in the 1800s, I ventured all the way from London to New South Wales, seeking a bit of adventure in this vast vast land.",
  image: require('../assets/images/ocoin.jpeg')
},
  {
    name: 'Blue',
    rssi: -100,
    title: 'Apron',
    audioFile: require('../assets/audio/townHall/2_baltiaDelicatessen.mp3'),
    subTitle: "I am Ghost #1",
    description: "In the years 1956 to 1961, this quaint establishment became a beacon of cultural exchange and culinary delight in the heart of the Parramatta city.",
    image: require('../assets/images/ocoin.jpeg')
  },
  {
    name: 'Green',
    rssi: -100,
    title: 'Tools',
    audioFile: require('../assets/audio/townHall/3_hartHitchcockAndCo.mp3'),
    subTitle: "I am Ghost #1",
    description: "In the early 20th century, one name echoed through the timber-rich landscape, leaving an indelible mark on the community - Hart, Hitchcock and Co. Timber Merchants 1884 – 1940.",
    image: require('../assets/images/ocoin.jpeg')
  },
  {
    name: 'MsgSix',
    rssi: -100,
    title: 'Flowers',
    audioFile: require('../assets/audio/townHall/4_roslynLydiaMaryBlay.mp3'),
    subTitle: "I am Ghost #4",
    description: "Rosslyn Lydia Mary Blay 1920 – 1997 was not just a florist; she was a living embodiment of passion and creativity.",
    image: require('../assets/images/ocoin.jpeg')
  },
  {
    name: 'Yellow',
    rssi: -100,
    title: 'Coffee',
    audioFile: require('../assets/audio/townHall/5_rosieBintBroheen.mp3'),
    subTitle: "I am Ghost #5",
    description: "Rosie Bint Broheen, embarked on a remarkable journey from Kfarsghab, Lebanon, to Parramatta.",
    image: require('../assets/images/ocoin.jpeg')
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
export { devices as townHallBeaconDevices, processDevices };


