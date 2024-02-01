import React, { createContext, useState, useEffect } from 'react';

export const TimerContext = createContext();

export const TimerProvider = ({ children }) => {
  const [timer, setTimer] = useState(20 * 60); // 20 minutes

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prevTimer => prevTimer > 0 ? prevTimer - 1 : 0);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <TimerContext.Provider value={{ timer, setTimer }}>
      {children}
    </TimerContext.Provider>
  );
};