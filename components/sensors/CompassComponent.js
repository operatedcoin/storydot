import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import { magnetometer } from 'react-native-sensors';

const CompassComponent = () => {
  const [magnetData, setMagnetData] = useState({ x: 0, y: 0, z: 0 });

  useEffect(() => {
    const subscription = magnetometer.subscribe(({ x, y, z, timestamp }) =>
      setMagnetData({ x, y, z })
    );

    return () => {
      subscription.unsubscribe(); // Unsubscribe on unmount
    };
  }, []);

  return (
    <View>
      <Text>Magnetometer (Compass) Data:</Text>
      <Text>X: {magnetData.x.toFixed(2)}</Text>
      <Text>Y: {magnetData.y.toFixed(2)}</Text>
      <Text>Z: {magnetData.z.toFixed(2)}</Text>
    </View>
  );
};

export default CompassComponent;
