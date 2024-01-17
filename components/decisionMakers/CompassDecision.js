import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import { magnetometer } from 'react-native-sensors';

const CompassDecision = () => {
  const [magnetData, setMagnetData] = useState({ x: 0, y: 0, z: 0 });
  const [heading, setHeading] = useState(0);
  const [decision, setDecision] = useState('Undecided');

  useEffect(() => {
    const subscription = magnetometer.subscribe(({ x, y, z }) => {
      setMagnetData({ x, y, z });
      const newHeading = updateHeading(x, y);
      setHeading(newHeading);
      updateDecision(newHeading);
    });

    return () => subscription.unsubscribe(); // Unsubscribe on unmount
  }, []);

  const updateHeading = (x, y) => {
    let heading = Math.atan2(y, x) * (180 / Math.PI);

    if (heading < 0) {
      heading += 360;
    }

    return heading % 360;
  };

  const updateDecision = (newHeading) => {
    const decision = (newHeading >= 45 && newHeading <= 135) ? 'Yes' : 'No';
    setDecision(decision);
  };

  return (
    <View>
      <Text>Magnetometer (Compass) Data:</Text>
      <Text>X: {magnetData.x.toFixed(2)}</Text>
      <Text>Y: {magnetData.y.toFixed(2)}</Text>
      <Text>Z: {magnetData.z.toFixed(2)}</Text>
      <Text>Heading: {heading.toFixed(2)}°</Text>
      <Text>Decision: {decision}</Text>
    </View>
  );
};

export default CompassDecision;
