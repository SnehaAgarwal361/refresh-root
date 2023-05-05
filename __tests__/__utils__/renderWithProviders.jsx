import React from 'react';
import { Provider } from 'react-redux';
import { FormProvider } from 'react-hook-form';
import { render } from '@testing-library/react';
import { Map as iMap } from 'immutable';
import { configureStore } from '@reduxjs/toolkit';

export const defaultState = iMap({
  config: {
    servicesUrl: 'api-url.aexp.com',
    intranetEnv: 'e0',
    BYPASS_AUTHBLUE_SSO: true,
    authBlueLogoutRedirect: 'http://square.americanexpress.com',
  },
});

const renderWithProviders = ({
  Component,
  props,
  routerPush = jest.fn(),
  reduxState = defaultState,
  rhfMethods,
  location,
}) => {
  const store = configureStore({
    reducer: (state = reduxState) => state,
  });

  if (rhfMethods) {
    render(
      <Provider store={store}>
        <FormProvider {...rhfMethods}>
          <Component router={{ push: routerPush, location }} {...props} />
        </FormProvider>
      </Provider>
    );
    return;
  }

  render(
    <Provider store={store}>
      <Component router={{ push: routerPush, location }} {...props} />
    </Provider>
  );
};

export default renderWithProviders;
export const getMockComponent = (displayName) => {
  // eslint-disable-next-line react/prop-types -- only used in testing
  const MockComponent = ({ children, ...restProps }) => (
    <div
      data-testid={displayName}
      name={displayName}
      data-props={JSON.stringify(restProps)}
    >
      {children}
    </div>
  );
  MockComponent.displayName = displayName;
  return MockComponent;
};
