import { render, screen } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { Map as iMap } from 'immutable';
import Header from '../../../src/components/common/Header';

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
  it('Display home screen as expected', async () => {
    render(
      <Provider store={store}>
        <Header />
      </Provider>
    );
    expect(screen.queryByRole('img'))
      .toBeInTheDocument();
    expect(screen.queryByRole('banner'))
      .toBeInTheDocument();
    expect(screen.getByRole('button', { id: /overflow1/i }))
      .toBeInTheDocument(); // Overflow Menu
  });
});
