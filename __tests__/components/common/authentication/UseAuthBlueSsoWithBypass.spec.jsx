import { screen } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom';
import { renderAuthBlueSso } from '../../../__utils__/renderWithAuthblue';
import useAuthBlueSsoWithBypass from '../../../../src/components/common/authentication/UseAuthBlueSsoWithBypass';

function TestComponent() {
  const authBlue = useAuthBlueSsoWithBypass();
  let testUser = 'Bypassed';
  if (authBlue !== undefined) {
    testUser = 'Present';
  }
  return (
    <div>
      <title>{testUser}</title>
    </div>
  );
}

// -- Begin Tests -- //
describe('UserState returns the correct values from authblue', () => {
  it('UserState returns ADS id', () => {
    renderAuthBlueSso(<TestComponent />);
    expect(screen.getByText('Bypassed')).toBeInTheDocument();
  });
});
