let timerId = null;
let timerDuration = 25000; // Initial duration in milliseconds
let remainingTime = timerDuration; // Time remaining on the timer
let timerCallback = null;
let startTime = null; // To track when the timer was started

const startTimer = (callback) => {
  if (timerId === null) {
    timerCallback = callback;
    startTime = Date.now();
    timerId = setTimeout(() => {
      if (timerCallback) {
        timerCallback();
      }
      resetTimer();
    }, remainingTime);
  }
};

const pauseTimer = () => {
  if (timerId !== null) {
    clearTimeout(timerId);
    timerId = null;
    // Calculate remaining time
    remainingTime -= Date.now() - startTime;
  }
};

const resumeTimer = () => {
  if (timerId === null && remainingTime > 0) {
    startTimer(timerCallback);
  }
};

const resetTimer = () => {
  pauseTimer();
  remainingTime = timerDuration;
  timerCallback = null;
  startTime = null;
};

const isTimerRunning = () => {
  return timerId !== null;
};

const twentyMinutes = { startTimer, pauseTimer, resumeTimer, resetTimer, isTimerRunning };

export default twentyMinutes;
