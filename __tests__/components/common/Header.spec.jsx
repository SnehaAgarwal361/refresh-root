import { render, screen } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { Map as iMap } from 'immutable';
import Header from '../../../src/components/common/header/Header';

require('@testing-library/jest-dom/extend-expect');

const reduxState = iMap({
  config: {
    intranetEnv: 'e0',
    BYPASS_AUTHBLUE_SSO: true,
  },
});

const store = configureStore({
  reducer: (state = reduxState) => state,
});

describe('Header', () => {
  it('renders as expected', async () => {
    render(
      <Provider store={store}>
        <Header />
      </Provider>
    );

    const expectedLogoutUrl = 'https://ssoisvc-dev.aexp.com/ssoi/logoff?channel=use-authblue-sso@1.2.2';
    expect(screen.queryByRole('banner')).toBeInTheDocument();
    expect(screen.queryByRole('img', { alt: /american express/i })).toBeInTheDocument();
    expect(screen.getByText('Maestro Configuration Manager')).toBeInTheDocument();
    expect(screen.queryByText(/logout/i)).toBeInTheDocument();
    expect(screen.getByTestId('logoutLink')).toHaveAttribute('href', expectedLogoutUrl);
  });
});
