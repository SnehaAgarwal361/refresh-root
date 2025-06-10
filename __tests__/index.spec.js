import MainExport from '../src';
import ModuleContainer from '../src/KnowYourCustomerRefreshRoot';

describe('index', () => {
  it('should export the top component', () => {
    expect(MainExport).toBe(ModuleContainer);
  });
});
