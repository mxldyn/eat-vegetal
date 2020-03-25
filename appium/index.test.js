/* eslint-disable global-require */
const wdio = require('webdriverio');

const baseConfig = {
  port: 4723,
  connectionRetryCount: 3,
  connectionRetryTimeout: 30e3,
  waitforTimeout: 10e3
};

jest.clearAllMocks().resetModules().useRealTimers().setTimeout(900e3);

export default capabilities => {
  beforeAll(async () => {
    const client = await wdio.remote({
      ...baseConfig,
      capabilities
    });

    global.browser = client;

    await browser.pause(5e3);
    await browser.setImplicitTimeout(20e3);
  });

  require('./integration/navigation.spec');

  afterAll(async () => {
    await browser.pause(5e3);
    await browser.deleteSession();
  });
};
