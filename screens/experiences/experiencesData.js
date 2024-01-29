export default {
  townHall: {
    navigator: "TownHallNavigator",
    title: "Town Hall",
    description: "Ut semper orci venenatis dui tempor porttitor. Proin aliquam neque vel efficitur luctus. Vivamus euismod dapibus metus non pretium. Fusce nec iaculis justo, id luctus neque. Proin non risus dignissim, auctor lacus sed, tempor dui. Suspendisse tempus posuere ipsum, in bibendum leo consectetur non. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed eros nibh, volutpat quis tristique ut, cursus ac odio. Aenean egestas sem et enim congue iaculis. Donec mattis, ipsum sed iaculis luctus, augue erat cursus dolor, sed imperdiet nunc odio eget augue. Donec vitae orci tincidunt, efficitur mauris non, ullamcorper nisl. Aenean et ex id augue egestas tempor. Aenean efficitur diam et sem rutrum egestas. Sed ultrices, lectus in fringilla rhoncus, velit augue venenatis tellus, eu posuere erat dui nec justo.",
    duration: "15-20 mins",
    image: require('./townHall/townHall_Hero.png'),
    credits: "Director: Nick Atkins, Composer: Peter Kennard, Designer: Katja Handt, Creative Technologist: Robert Polmear",
    supporters: [
      require('../../assets/images/supporters/cityOfParra.png'),
      require('../../assets/images/supporters/creativeAustralia.png'),
    ],  },
  ghost: {
    navigator: "GhostNavigator",
    title: "Ghost",
    description: "Description for Ghost",
    image: require('../../assets/images/placeholder.png'),
    credits: "Credits for Ghost"
  },
  demo: {
    navigator: "DemoNavigator",
    title: "Demo",
    description: "Description for Demo",
    image: require('../../assets/images/placeholder.png'),
    credits: "Credits for Demo"
  },
};
