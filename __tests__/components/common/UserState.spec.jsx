import { render, screen } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom';
import { AuthBlueProvider, useAuthBlueSso } from 'use-authblue-sso';

const userAttributesAndGroupsToCollect = {
  attributes: [
    'testUser',
  ],
  groups: ['SSO_GG-ADS-Maestro-Refresh-Ui-Users'],
};

function TestComponent() {
  const testUser = useAuthBlueSso().user.attributes;
  return (
    <div>
      <text>{testUser}</text>
    </div>
  );
}

test('Retrieve userId from State', () => {
  render(
    <AuthBlueProvider env="e0" scope={userAttributesAndGroupsToCollect}>
      <TestComponent />
    </AuthBlueProvider>
  );
  expect(screen.getByText('testUser')).toBeInTheDocument();
});
