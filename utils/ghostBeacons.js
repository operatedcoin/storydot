export const devices = [
    {
  name: 'Red',
  rssi: -55,
  title: 'Tissues',
  audioFile: require('../assets/audio/ghost/Tissues.mp3'),
  description: "Blibbering bloopers bumbled through the zibberish zoo, zonking zany zippers with zibber-zabber zest. Flibber-flopping fudgelumps flibbered while flibberjibbing flibberish frogs flapped furiously. Gobbledygook gizmos giggled, gobbling gobbledygibberish gumdrops greedily. Splibber-splabber splish-splashed, spluttering splendiferous splunkers splorked and splackled. Whibber-whobber whoopee cushions whizzed, whirling wildly in whibberjabbity whirlwinds. Zibber-zabber zootopia zigzagged, zipping zany zeppelins zestfully. Rambunctious razzle-dazzle roared, ricocheting rickety raccoons riotously. Higgledy-piggledy haggled with hibberjibber hobgoblins, hilariously hootin' and hollerin'.",
  image: require('../assets/images/ocoin.jpeg')
},
  {
    name: 'Blue',
    rssi: -100,
    title: 'Sheet Music',
    audioFile: require('../assets/audio/ghost/SheetMusic.mp3'),
    description: "Blibbering bloopers bumbled through the zibberish zoo, zonking zany zippers with zibber-zabber zest. Flibber-flopping fudgelumps flibbered while flibberjibbing flibberish frogs flapped furiously. Gobbledygook gizmos giggled, gobbling gobbledygibberish gumdrops greedily. Splibber-splabber splish-splashed, spluttering splendiferous splunkers splorked and splackled. Whibber-whobber whoopee cushions whizzed, whirling wildly in whibberjabbity whirlwinds. Zibber-zabber zootopia zigzagged, zipping zany zeppelins zestfully. Rambunctious razzle-dazzle roared, ricocheting rickety raccoons riotously. Higgledy-piggledy haggled with hibberjibber hobgoblins, hilariously hootin' and hollerin'.",
    image: require('../assets/images/ocoin.jpeg')
  },
  {
    name: 'Green',
    rssi: -100,
    title: 'Bag',
    audioFile: require('../assets/audio/ghost/Bag.mp3'),
    description: "Blibbering bloopers bumbled through the zibberish zoo, zonking zany zippers with zibber-zabber zest. Flibber-flopping fudgelumps flibbered while flibberjibbing flibberish frogs flapped furiously. Gobbledygook gizmos giggled, gobbling gobbledygibberish gumdrops greedily. Splibber-splabber splish-splashed, spluttering splendiferous splunkers splorked and splackled. Whibber-whobber whoopee cushions whizzed, whirling wildly in whibberjabbity whirlwinds. Zibber-zabber zootopia zigzagged, zipping zany zeppelins zestfully. Rambunctious razzle-dazzle roared, ricocheting rickety raccoons riotously. Higgledy-piggledy haggled with hibberjibber hobgoblins, hilariously hootin' and hollerin'.",
    image: require('../assets/images/ocoin.jpeg')
  },
  {
    name: 'MsgSix',
    rssi: -100,
    title: 'People',
    audioFile: require('../assets/audio/ghost/People.mp3'),
    subTitle: "I am Ghost #4",
    description: "Blibbering bloopers bumbled through the zibberish zoo, zonking zany zippers with zibber-zabber zest. Flibber-flopping fudgelumps flibbered while flibberjibbing flibberish frogs flapped furiously. Gobbledygook gizmos giggled, gobbling gobbledygibberish gumdrops greedily. Splibber-splabber splish-splashed, spluttering splendiferous splunkers splorked and splackled. Whibber-whobber whoopee cushions whizzed, whirling wildly in whibberjabbity whirlwinds. Zibber-zabber zootopia zigzagged, zipping zany zeppelins zestfully. Rambunctious razzle-dazzle roared, ricocheting rickety raccoons riotously. Higgledy-piggledy haggled with hibberjibber hobgoblins, hilariously hootin' and hollerin'.",
    image: require('../assets/images/ocoin.jpeg')
  },
  {
    name: 'Yellow',
    rssi: -100,
    title: 'Maltesers',
    audioFile: require('../assets/audio/ghost/Maltesers.mp3'),
    subTitle: "I am Ghost #5",
    description: "Blibbering bloopers bumbled through the zibberish zoo, zonking zany zippers with zibber-zabber zest. Flibber-flopping fudgelumps flibbered while flibberjibbing flibberish frogs flapped furiously. Gobbledygook gizmos giggled, gobbling gobbledygibberish gumdrops greedily. Splibber-splabber splish-splashed, spluttering splendiferous splunkers splorked and splackled. Whibber-whobber whoopee cushions whizzed, whirling wildly in whibberjabbity whirlwinds. Zibber-zabber zootopia zigzagged, zipping zany zeppelins zestfully. Rambunctious razzle-dazzle roared, ricocheting rickety raccoons riotously. Higgledy-piggledy haggled with hibberjibber hobgoblins, hilariously hootin' and hollerin'.",
    image: require('../assets/images/ocoin.jpeg')
  },
  {
    name: 'Orange',
    rssi: -100,
    title: 'Wet Floor Sign',
    audioFile: require('../assets/audio/ghost/WetFloor.mp3'),
    subTitle: "I am Ghost #5",
    description: "Blibbering bloopers bumbled through the zibberish zoo, zonking zany zippers with zibber-zabber zest. Flibber-flopping fudgelumps flibbered while flibberjibbing flibberish frogs flapped furiously. Gobbledygook gizmos giggled, gobbling gobbledygibberish gumdrops greedily. Splibber-splabber splish-splashed, spluttering splendiferous splunkers splorked and splackled. Whibber-whobber whoopee cushions whizzed, whirling wildly in whibberjabbity whirlwinds. Zibber-zabber zootopia zigzagged, zipping zany zeppelins zestfully. Rambunctious razzle-dazzle roared, ricocheting rickety raccoons riotously. Higgledy-piggledy haggled with hibberjibber hobgoblins, hilariously hootin' and hollerin'.",
    image: require('../assets/images/ocoin.jpeg')
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


