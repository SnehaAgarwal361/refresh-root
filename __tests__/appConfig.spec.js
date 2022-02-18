import AppConfig from '../src/appConfig';

describe('state config', () => {
  it('should be valid', () => {
    const stateConfig = AppConfig.provideStateConfig;

    Object.keys(stateConfig).forEach((configName) => {
      expect(stateConfig[configName]).toMatchObject({
        client: {
          e1: expect.any(String),
          e2: expect.any(String),
          e3: expect.any(String),
        },
        server: {
          e1: expect.any(String),
          e2: expect.any(String),
          e3: expect.any(String),
        },
      });
    });
  });
});
