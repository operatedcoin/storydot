// useTimer.js
import { useState, useCallback } from 'react';

const useTimer = (initialDuration = 22000) => {
  const [timerId, setTimerId] = useState(null);
  const [remainingTime, setRemainingTime] = useState(initialDuration);

  const startTimer = useCallback((callback) => {
    if (!timerId) {
      const id = setTimeout(() => {
        callback();
        resetTimer();
      }, remainingTime);
      setTimerId(id);
    }
  }, [timerId, remainingTime]);

  const pauseTimer = useCallback(() => {
    if (timerId) {
      clearTimeout(timerId);
      setRemainingTime(remainingTime - (Date.now() - timerId));
      setTimerId(null);
    }
  }, [timerId, remainingTime]);

  const resetTimer = useCallback(() => {
    if (timerId) {
      clearTimeout(timerId);
    }
    setTimerId(null);
    setRemainingTime(initialDuration);
  }, [initialDuration, timerId]);

  return { startTimer, pauseTimer, resetTimer };
};

export default useTimer;
