import { render, screen } from '@testing-library/react';
import React from 'react';
import Header from '../../../src/components/common/Header';

require('@testing-library/jest-dom/extend-expect');

test('Display home screen as expected', () => {
  render(<Header />);
  expect(screen.queryByRole('img')).toBeInTheDocument();
  expect(screen.queryByRole('banner')).toBeInTheDocument();
  expect(screen.getByRole('button', { id: /overflow1/i })).toBeInTheDocument(); // Overflow Menu
});
