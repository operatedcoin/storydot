export const devices = [
    {
  name: 'Red',
  rssi: -55,
  title: 'Flying Pieman',
  audioFile: require('../assets/audio/townHall/1_flyingPieman.mp3'),
  subTitle: "I am Ghost #1",
  description: "Blibbering bloopers bumbled through the zibberish zoo, zonking zany zippers with zibber-zabber zest. Flibber-flopping fudgelumps flibbered while flibberjibbing flibberish frogs flapped furiously. Gobbledygook gizmos giggled, gobbling gobbledygibberish gumdrops greedily. Splibber-splabber splish-splashed, spluttering splendiferous splunkers splorked and splackled. Whibber-whobber whoopee cushions whizzed, whirling wildly in whibberjabbity whirlwinds. Zibber-zabber zootopia zigzagged, zipping zany zeppelins zestfully. Rambunctious razzle-dazzle roared, ricocheting rickety raccoons riotously. Higgledy-piggledy haggled with hibberjibber hobgoblins, hilariously hootin' and hollerin'.",
  image: require('../assets/images/ocoin.jpeg')
},
  {
    name: 'Blue',
    rssi: -100,
    title: 'Baltia Delicatessen',
    audioFile: require('../assets/audio/townHall/2_baltiaDelicatessen.mp3'),
    subTitle: "I am Ghost #1",
    description: "Blibbering bloopers bumbled through the zibberish zoo, zonking zany zippers with zibber-zabber zest. Flibber-flopping fudgelumps flibbered while flibberjibbing flibberish frogs flapped furiously. Gobbledygook gizmos giggled, gobbling gobbledygibberish gumdrops greedily. Splibber-splabber splish-splashed, spluttering splendiferous splunkers splorked and splackled. Whibber-whobber whoopee cushions whizzed, whirling wildly in whibberjabbity whirlwinds. Zibber-zabber zootopia zigzagged, zipping zany zeppelins zestfully. Rambunctious razzle-dazzle roared, ricocheting rickety raccoons riotously. Higgledy-piggledy haggled with hibberjibber hobgoblins, hilariously hootin' and hollerin'.",
    image: require('../assets/images/ocoin.jpeg')
  },
  {
    name: 'Green',
    rssi: -100,
    title: 'Hart Hitchcock & Co',
    audioFile: require('../assets/audio/townHall/3_hartHitchcockAndCo.mp3'),
    subTitle: "I am Ghost #1",
    description: "Blibbering bloopers bumbled through the zibberish zoo, zonking zany zippers with zibber-zabber zest. Flibber-flopping fudgelumps flibbered while flibberjibbing flibberish frogs flapped furiously. Gobbledygook gizmos giggled, gobbling gobbledygibberish gumdrops greedily. Splibber-splabber splish-splashed, spluttering splendiferous splunkers splorked and splackled. Whibber-whobber whoopee cushions whizzed, whirling wildly in whibberjabbity whirlwinds. Zibber-zabber zootopia zigzagged, zipping zany zeppelins zestfully. Rambunctious razzle-dazzle roared, ricocheting rickety raccoons riotously. Higgledy-piggledy haggled with hibberjibber hobgoblins, hilariously hootin' and hollerin'.",
    image: require('../assets/images/ocoin.jpeg')
  },
  {
    name: 'MsgSix',
    rssi: -100,
    title: 'Rosslyn Blay',
    audioFile: require('../assets/audio/townHall/4_roslynLydiaMaryBlay.mp3'),
    subTitle: "I am Ghost #4",
    description: "Blibbering bloopers bumbled through the zibberish zoo, zonking zany zippers with zibber-zabber zest. Flibber-flopping fudgelumps flibbered while flibberjibbing flibberish frogs flapped furiously. Gobbledygook gizmos giggled, gobbling gobbledygibberish gumdrops greedily. Splibber-splabber splish-splashed, spluttering splendiferous splunkers splorked and splackled. Whibber-whobber whoopee cushions whizzed, whirling wildly in whibberjabbity whirlwinds. Zibber-zabber zootopia zigzagged, zipping zany zeppelins zestfully. Rambunctious razzle-dazzle roared, ricocheting rickety raccoons riotously. Higgledy-piggledy haggled with hibberjibber hobgoblins, hilariously hootin' and hollerin'.",
    image: require('../assets/images/ocoin.jpeg')
  },
  {
    name: 'Yellow',
    rssi: -100,
    title: 'Rosie Bint Broheen',
    audioFile: require('../assets/audio/townHall/5_rosieBintBroheen.mp3'),
    subTitle: "I am Ghost #5",
    description: "Blibbering bloopers bumbled through the zibberish zoo, zonking zany zippers with zibber-zabber zest. Flibber-flopping fudgelumps flibbered while flibberjibbing flibberish frogs flapped furiously. Gobbledygook gizmos giggled, gobbling gobbledygibberish gumdrops greedily. Splibber-splabber splish-splashed, spluttering splendiferous splunkers splorked and splackled. Whibber-whobber whoopee cushions whizzed, whirling wildly in whibberjabbity whirlwinds. Zibber-zabber zootopia zigzagged, zipping zany zeppelins zestfully. Rambunctious razzle-dazzle roared, ricocheting rickety raccoons riotously. Higgledy-piggledy haggled with hibberjibber hobgoblins, hilariously hootin' and hollerin'.",
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


