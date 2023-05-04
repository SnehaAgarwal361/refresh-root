import { render } from '@testing-library/react';
import React from 'react';
import { AuthBlueProvider } from 'use-authblue-sso';
import Home from '../../src/components/Home';

const userAttributesAndGroupsToCollect = {
  attributes: [
    'testADS',
  ],
  groups: ['SSO_GG-ADS-Maestro-Refresh-Ui-Users'],
};

test('Display home screen as expected', () => {
  const { container } = render(
    <AuthBlueProvider env="e0" scope={userAttributesAndGroupsToCollect}>
      <Home />
    </AuthBlueProvider>
  );
  expect(container.firstChild)
    .toMatchSnapshot();
});
