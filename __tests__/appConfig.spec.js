import AppConfig from '../src/appConfig';

describe('state config', () => {
  it('should be valid', () => {
    const stateConfig = AppConfig.provideStateConfig.oneDataApiUrl;

    Object.keys(stateConfig)
      .forEach((configName) => {
        expect(stateConfig[configName])
          .toMatchObject({
            e1: expect.any(String),
            e2: expect.any(String),
            e3: expect.any(String),
          });
      });
  });
});
