import { render, screen } from '@testing-library/react';
import React from 'react';
import { fromJS } from 'immutable';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import Header from '../../../src/components/common/Header';

require('@testing-library/jest-dom/extend-expect');

const mockConfigState = fromJS({
  config: {
    'axp-intranet-authblueLogoutBaseUrl': 'testUrl',
  },
});

function stateReducer(state = mockConfigState) {
  return state;
}

const store = configureStore({
  reducer: stateReducer,
});

test('Display home screen as expected', () => {
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
