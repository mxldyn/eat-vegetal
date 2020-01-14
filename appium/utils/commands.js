const find = async id => {
  const { ELEMENT } = await browser.findElement('accessibility id', id);

  return ELEMENT;
};

const waitFor = async id => {
  await browser.pause(500);

  return find(id);
};

const clear = async id => {
  const element = await find(id);

  await browser.elementClear(element);

  if (__IOS__) {
    await browser.hideKeyboard();
  }
};

const click = async (id, wait = 0) => {
  const element = await find(id);

  await browser.elementClick(element);

  if (wait) {
    await browser.pause(wait);
  }
};

const flick = async (id, x, y, wait = 0) => {
  const element = (await find(id)) || '';

  if (__ANDROID__) {
    await browser.touchFlick(x, y, element, 100);
  } else {
    await browser.touchPerform([
      {
        action: 'press',
        options: {
          element,
          x: 0,
          y: 0
        }
      },
      {
        action: 'wait',
        options: {
          ms: 1e3
        }
      },
      {
        action: 'moveTo',
        options: {
          x,
          y
        }
      },
      { action: 'release' }
    ]);
  }

  if (wait) {
    await browser.pause(wait);
  }
};

const type = async (id, text) => {
  const element = await find(id);

  await browser.elementSendKeys(element, text);

  if (__IOS__) {
    await browser.hideKeyboard();
  }
};

const dismissAlert = async () => {
  await browser.pause(1e3);

  return browser.dismissAlert();
};

const acceptAlert = async () => {
  await browser.pause(1e3);

  return browser.acceptAlert();
};

export default {
  find,
  waitFor,
  clear,
  click,
  flick,
  type,
  dismissAlert,
  acceptAlert
};
