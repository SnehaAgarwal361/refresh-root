import React from 'react';
import { shallow } from 'enzyme';
import { loadLanguagePack } from '@americanexpress/one-app-ducks';
import ModuleRoute from 'holocron-module-route';
import {
  loadModuleData,
  TestableKnowYourCustomerRefreshRoot,
} from '../../src/components/KnowYourCustomerRefreshRoot';
import childRoutes from '../../src/childRoutes';

require('@testing-library/jest-dom/extend-expect');

jest.mock('@americanexpress/one-app-ducks', () => ({
  loadLanguagePack: jest.fn((module, { fallbackLocale } = {}) => ({
    message: `lang pack async state for ${module}`,
    fallbackLocale,
  })),
}));

describe('TestableKnowYourCustomerRefreshRoot', () => {
  describe('should render as expected', () => {
    it('module should render correct JSX', () => {
      const renderedModule = shallow(<TestableKnowYourCustomerRefreshRoot languageData={{ intlKeyMock: 'intlValueMock' }} locale="localeMock" />);
      expect(renderedModule)
        .toMatchSnapshot();
    });
  });

  describe('loadModuleData', () => {
    const fakeStore = {
      dispatch: jest.fn((x) => x),
    };

    it('should call languageData', async () => {
      await loadModuleData({ store: fakeStore });
      expect(loadLanguagePack)
        .toMatchSnapshot();
    });
  });

  describe('childRoutes', () => {
    it('should return an array of Routes', () => {
      expect(childRoutes())
        .toEqual(expect.any(Array));
      childRoutes()
        .forEach((route) => expect(route.type)
          .toEqual(ModuleRoute));
    });
  });
});
