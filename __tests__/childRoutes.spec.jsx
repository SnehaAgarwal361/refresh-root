import childRoutes from '../src/childRoutes';

describe('childRoutes', () => {
  it('should have the proper routes', () => {
    expect(childRoutes()).toMatchSnapshot();
  });
});
