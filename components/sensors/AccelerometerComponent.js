import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import { accelerometer } from 'react-native-sensors';

const AccelerometerComponent = () => {
  const [accelData, setAccelData] = useState({ x: 0, y: 0, z: 0 });

  useEffect(() => {
    const subscription = accelerometer.subscribe(({ x, y, z, timestamp }) =>
      setAccelData({ x, y, z })
    );

    return () => {
      subscription.unsubscribe(); // Unsubscribe on unmount
    };
  }, []);

  return (
    <View>
      <Text>Accelerometer Data:</Text>
      <Text>X: {accelData.x.toFixed(2)}</Text>
      <Text>Y: {accelData.y.toFixed(2)}</Text>
      <Text>Z: {accelData.z.toFixed(2)}</Text>
    </View>
  );
};

export default AccelerometerComponent;
