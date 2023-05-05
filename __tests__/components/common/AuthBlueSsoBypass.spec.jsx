import React from 'react';
import { render, screen } from '@testing-library/react';
import AuthBlueSsoBypass, { mockUseAuthBlueSso } from '../../../src/components/common/AuthBlueSsoBypass';
import '@testing-library/jest-dom';

describe('Should render as expected', () => {
  beforeEach(() => {
    render(
      <AuthBlueSsoBypass>
        <a href={mockUseAuthBlueSso.user.attributes.adsId}>Hello!!</a>
      </AuthBlueSsoBypass>
    );
  });

  it('Renders its children properly', () => {
    const hello = screen.getByText(/hello!!/i);
    expect(hello).toBeInTheDocument();
    expect(hello).toHaveAttribute('href', expect.stringMatching(mockUseAuthBlueSso.user.attributes.adsId));
  });
});
