import { render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { fromJS } from 'immutable';
import { configureStore } from '@reduxjs/toolkit';
import Home from '../../src/components/Home';

const mockConfigState = fromJS({
  modules: {
    'axp-intranet-identity': {
      profile: {
        uid: 'testUser',
      },
    },
  },
});

function stateReducer(state = mockConfigState) {
  return state;
}

const store = configureStore({
  reducer: stateReducer,
});
test('Display home screen as expected', () => {
  const { container } = render(
    <Provider store={store}>
      <Home />
    </Provider>
  );
  expect(container.firstChild)
    .toMatchSnapshot();
});
