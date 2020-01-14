const SWIPE_DIRECTION = {
  down: {
    start: { x: 50, y: 15 },
    end: { x: 50, y: 85 }
  },
  left: {
    start: { x: 95, y: 50 },
    end: { x: 5, y: 50 }
  },
  right: {
    start: { x: 5, y: 50 },
    end: { x: 95, y: 50 }
  },
  up: {
    start: { x: 50, y: 85 },
    end: { x: 50, y: 15 }
  }
};

const swipe = async (from, to) => {
  await browser.touchPerform([
    {
      action: 'press',
      options: from
    },
    {
      action: 'wait',
      options: { ms: 1e3 }
    },
    {
      action: 'moveTo',
      options: to
    },
    {
      action: 'release'
    }
  ]);

  return browser.pause(1e3);
};

const getDeviceScreenCoordinates = (screenSize, coordinates) => ({
  x: Math.round(screenSize.width * (coordinates.x / 100)),
  y: Math.round(screenSize.height * (coordinates.y / 100))
});

const swipeOnPercentage = async (from, to) => {
  const screenSize = await browser.getWindowRect();
  const pressOptions = getDeviceScreenCoordinates(screenSize, from);
  const moveToScreenCoordinates = getDeviceScreenCoordinates(screenSize, to);

  return swipe(pressOptions, moveToScreenCoordinates);
};

const calculateXY = ({ x, y }, percentage) => ({
  x: x * percentage,
  y: y * percentage
});

const swipeDown = (percentage = 1) =>
  swipeOnPercentage(
    calculateXY(SWIPE_DIRECTION.down.start, percentage),
    calculateXY(SWIPE_DIRECTION.down.end, percentage)
  );

const swipeUp = (percentage = 1, start = null, end = null) =>
  swipeOnPercentage(
    calculateXY(start || SWIPE_DIRECTION.up.start, percentage),
    calculateXY(end || SWIPE_DIRECTION.up.end, percentage)
  );

const swipeLeft = (percentage = 1) =>
  swipeOnPercentage(
    calculateXY(SWIPE_DIRECTION.left.start, percentage),
    calculateXY(SWIPE_DIRECTION.left.end, percentage)
  );

const swipeRight = (percentage = 1) =>
  swipeOnPercentage(
    calculateXY(SWIPE_DIRECTION.right.start, percentage),
    calculateXY(SWIPE_DIRECTION.right.end, percentage)
  );

export default { swipeDown, swipeUp, swipeLeft, swipeRight };
