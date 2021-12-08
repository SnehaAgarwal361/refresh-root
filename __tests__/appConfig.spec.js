import AppConfig from '../src/appConfig';

describe('appConfig', () => {
  it('should contain csp', () => {
    expect(AppConfig.csp).toBeDefined();
    expect(typeof AppConfig.csp).toBe('string');
    expect(AppConfig.csp).toMatchSnapshot();
  });
});
