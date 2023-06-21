import { render, screen } from '@testing-library/react';
import React from 'react';
import { useAuthBlueSso } from 'use-authblue-sso';
import Header from '../../../src/components/common/Header';

require('@testing-library/jest-dom/extend-expect');

jest.mock('use-authblue-sso', () => ({
  ...jest.requireActual('react-redux'),
  useAuthBlueSso: jest.fn(),
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

describe('Header', () => {
  it('Display home screen as expected', async () => {
    useAuthBlueSso.mockReturnValue({
      urls: { getLogoffUrl: () => 'https://ssoisvc-dev.aexp.com/ssoi/logoff?channel=use-authblue-sso@1.2.2' },
    });
    render(<Header />);
    expect(screen.queryByRole('img'))
      .toBeInTheDocument();
    expect(screen.queryByRole('banner'))
      .toBeInTheDocument();
    expect(screen.getByRole('button', { id: /overflow1/i }))
      .toBeInTheDocument(); // Overflow Menu
  });
});
