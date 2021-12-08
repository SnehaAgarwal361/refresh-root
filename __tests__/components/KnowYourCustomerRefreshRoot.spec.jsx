import React from 'react';
import { shallow } from 'enzyme';
import { loadLanguagePack } from '@americanexpress/one-app-ducks';
import { Route } from '@americanexpress/one-app-router';
import childRoutes from '../../src/childRoutes';
import { TestableKnowYourCustomerRefreshRoot, loadModuleData } from '../../src/components/KnowYourCustomerRefreshRoot';

jest.mock('@americanexpress/one-app-ducks', () => ({
  loadLanguagePack: jest.fn((module, { fallbackLocale } = {}) => ({
    message: `lang pack async state for ${module}`,
    fallbackLocale,
  })),
}));

describe('TestableKnowYourCustomerRefreshRoot', () => {
  describe('should render as expected', () => {
    let props;

    beforeEach(() => {
      props = {
        languageData: { intlKeyMock: 'intlValueMock' },
        locale: 'localeMock',
      };
    });
    it('module should render correct JSX', () => {
      const renderedModule = shallow(<TestableKnowYourCustomerRefreshRoot {...props} />);
      expect(renderedModule).toMatchSnapshot();
    });
  });

  describe('loadModuleData', () => {
    const fakeStore = {
      dispatch: jest.fn((x) => x),
    };

    it('should call languageData', async () => {
      await loadModuleData({ store: fakeStore });
      expect(loadLanguagePack).toMatchSnapshot();
    });
  });

  describe('childRoutes', () => {
    it('should return an array of Routes', () => {
      expect(childRoutes()).toEqual(expect.any(Array));
      childRoutes().forEach((route) => expect(route.type).toEqual(Route));
    });
  });
});
