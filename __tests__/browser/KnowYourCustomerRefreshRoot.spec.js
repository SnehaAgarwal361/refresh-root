import { getWebdriverClient } from 'one-amex-test-utils';
import { toMatchImageSnapshot } from 'jest-image-snapshot';
import '@testing-library/jest-dom';

// `testHost` and `port` are provided to Jest
// as globals by jest-environment-selenium
const APP_HOSTNAME = `http://${testHost}:${port}`;

// For root modules, snapshotting works out the box, but you might want to be more specific.
// If you wish only to snapshot this module in isolation, consider using a demo route here.
// (https://github.aexp.com/amex-eng/axp-demo)
const moduleUrl = `${APP_HOSTNAME}/`;
let client;

beforeAll(async () => {
  expect.extend({ toMatchImageSnapshot });
  // get a Selenium client you can use to drive the browser
  client = await getWebdriverClient({
    // need to tell it what port Selenium server is listening on when running tests locally
    localRemoteOptions: {
      // seleniumServerPort is a global provided to Jest by jest-environment-one-app-runner
      // (port number is randomly selected upon test startup)
      port: seleniumServerPort,
    },
    // when running on CI server you will also want to tell it where Selenium server is listening
    // (in the future https://saucelabs.com will be accessible from CI and configured here)
    ciRemoteOptions: {
      port: seleniumServerPort,
    },
  });
});

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn()
    .mockReturnValue('testUser'),
}));

afterAll(() => client.deleteSession());

describe('KycRoot module', () => {
  describe('look and feel in browser', () => {
    beforeAll(async () => {
      await client.newWindow(moduleUrl, 'WebdriverIO window', 'width=375,height=667,resizable,scrollbars=yes,status=1');
      await client.pause(6000);
    });

    it('renders correctly on mobile sized viewport', async () => {
      await client.setWindowSize(375, 667);
      const mobileView = await client.takeScreenshot();

      expect(mobileView).toBeDefined(); // Convert this to match snapshot
    });

    it('renders correctly on tablet sized viewport', async () => {
      await client.setWindowSize(768, 768);
      const tabletView = await client.takeScreenshot();

      expect(tabletView).toBeDefined(); // Convert this to match snapshot
    });

    it('renders correctly on small desktop sized viewport', async () => {
      await client.setWindowSize(1024, 768);
      const desktopView = await client.takeScreenshot();

      expect(desktopView).toBeDefined(); // Convert this to match snapshot
    });

    it('renders correctly on large desktop sized viewport', async () => {
      await client.setWindowSize(1280, 768);
      const desktopView = await client.takeScreenshot();

      expect(desktopView).toBeDefined(); // Convert this to match snapshot
    });
    it('app renders with no breaking errors', async () => {
      const consoleLogs = await client.getLogs('browser');
      const javascriptErrors = consoleLogs.filter(({ source }) => source === 'javascript');
      const networkErrors = consoleLogs
        .filter(({ source }) => source === 'network')
        .filter(({ message }) => !message.includes('favicon'));
      expect(javascriptErrors).toEqual([]);
      expect(networkErrors).toEqual([]);
    });
  });
});
