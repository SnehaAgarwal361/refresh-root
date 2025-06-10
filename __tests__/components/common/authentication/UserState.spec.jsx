import { screen } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom';
import { useAdsId } from '../../../../src/components/common/authentication/UserState';
import { renderAuthBlueSso } from '../../../__utils__/renderWithAuthblue';

function TestComponent() {
  const testUser = useAdsId();
  return (
    <div>
      <title>{testUser}</title>
    </div>
  );
}

// -- Begin Tests -- //
describe('UserState returns the correct values from authblue', () => {
  it('UserState returns ADS id', () => {
    renderAuthBlueSso(<TestComponent />, ['config', 'BYPASS_AUTHBLUE_SSO', true]);
    expect(screen.getByText('BypassedTestUser')).toBeInTheDocument();
  });
});
