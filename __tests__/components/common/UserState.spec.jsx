import { fromJS } from 'immutable';
import { configureStore } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import React from 'react';
import { useAdsId } from '../../../src/components/common/UserState';
import '@testing-library/jest-dom';

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

function TestComponent() {
  const adsId = useAdsId();
  return (
    <div>
      {adsId}
    </div>
  );
}

test('Retrieve userId from State', () => {
  render(
    <Provider store={store}>
      <TestComponent />
    </Provider>
  );
  expect(screen.getByText('testUser')).toBeInTheDocument();
});
