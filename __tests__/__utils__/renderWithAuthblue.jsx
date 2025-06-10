import { configureStore } from '@reduxjs/toolkit';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import React from 'react';
import { Map as iMap } from 'immutable';
import { AuthBlueProvider, AuthBlueSessionTimeoutModal, OneDataProvider } from 'use-authblue-sso';
import { AuthBlueSso } from '../../src/components/common/authentication/AuthBlueSso';
import { getMockComponent } from './renderWithProviders';
import AuthBlueSsoBypass from '../../src/components/common/authentication/AuthBlueSsoBypass';

jest.mock('use-authblue-sso');
jest.mock('../../src/components/common/authentication/AuthBlueSsoBypass');
const defaultState = iMap({ config: { intranetEnv: 'e0' } });
export const renderAuthBlueSso = (children, stateUpdate = null) => {
  jest.resetAllMocks();
  const authBlueProviderMock = AuthBlueProvider.mockImplementation(getMockComponent('AuthBlueProvider'));
  const authBlueSsoBypassMock = AuthBlueSsoBypass.mockImplementation(getMockComponent('AuthBlueSsoBypass'));
  const oneDataProviderMock = OneDataProvider.mockImplementation(getMockComponent('OneDataProvider'));
  const authBlueSessionTimeoutModalMock = AuthBlueSessionTimeoutModal.mockImplementation(getMockComponent('AuthBlueSessionTimeoutModal'));

  let reduxState = defaultState;
  if (stateUpdate != null) {
    reduxState = reduxState.setIn(stateUpdate);
  }
  const store = configureStore({
    reducer: (state = reduxState) => state,
  });
  const renderResult = render(
    <Provider store={store}>
      <AuthBlueSso>
        {children}
      </AuthBlueSso>
    </Provider>
  );
  return {
    renderResult,
    mocks: {
      authBlueProviderMock,
      authBlueSsoBypassMock,
      oneDataProviderMock,
      authBlueSessionTimeoutModalMock,
    },
  };
};
