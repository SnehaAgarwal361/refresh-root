const { toBeAccessible } = require('@americanexpress/jest-a11y');

// timeout increased to pull the lighthouse docker and run the a11y audit
jest.setTimeout(20 * 60 * 1000);

// `testHost` and `port` are provided to Jest
// as globals by jest-environment-selenium
const APP_HOSTNAME = `http://localhost:${port}`;
// (One App is fully available for you and so any route on your tenancy is accessible)
const moduleUrl = `${APP_HOSTNAME}/`;

expect.extend({ toBeAccessible });

describe('Lighthouse Web Page Tests for TestV5 module', () => {
  it('Accessibility test', async () => {
    await expect(moduleUrl).toBeAccessible();
  });
});
