import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import { gyroscope } from 'react-native-sensors';

const GyroscopeComponent = () => {
  const [gyroData, setGyroData] = useState({ x: 0, y: 0, z: 0 });

  useEffect(() => {
    const subscription = gyroscope.subscribe(({ x, y, z, timestamp }) =>
      setGyroData({ x, y, z })
    );

    return () => {
      subscription.unsubscribe(); // Don't forget to unsubscribe when the component unmounts
    };
  }, []);


};

export default GyroscopeComponent;
