const DEFAULT_DELAY = 5e3;
const PAUSE_DURATION = 50e3;

const getDuration = (delay, pause, pauseTime, startTime) => {
  const totalPlaytime = delay || DEFAULT_DELAY;

  if (pause) {
    return PAUSE_DURATION;
  }

  if (!pauseTime) {
    return totalPlaytime;
  }

  const lastTime = pauseTime - startTime;

  return totalPlaytime - lastTime;
};

export { getDuration };
