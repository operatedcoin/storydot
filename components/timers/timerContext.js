// TimerContext.js
import React, { createContext, useState, useCallback } from 'react';

export const TimerContext = createContext();

export const TimerProvider = ({ children }) => {
  const [timer, setTimer] = useState(null);
  const [remainingTime, setRemainingTime] = useState(22000); // Example: 22 seconds

  const startTimer = useCallback((callback) => {
    setTimer(setTimeout(() => {
      callback();
      stopTimer();
    }, remainingTime));
  }, [remainingTime]);

  const stopTimer = useCallback(() => {
    if (timer) {
      clearTimeout(timer);
      setTimer(null);
    }
  }, [timer]);

  return (
    <TimerContext.Provider value={{ startTimer, stopTimer }}>
      {children}
    </TimerContext.Provider>
  );
};
