import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import NavBar from '../../../src/components/common/navBar/NavBar';

describe('NavBar', () => {
  const setSection = jest.fn();

  test('renders correctly', () => {
    render(<NavBar section="applicationProperties" setSection={setSection} />);
    expect(screen.getByText('Application Properties')).toBeInTheDocument();
    expect(screen.getByText('Quartz Job Properties')).toBeInTheDocument();
  });

  test('highlights the correct section', () => {
    render(<NavBar section="applicationProperties" setSection={setSection} />);
    expect(screen.getByText('Application Properties')).toHaveAttribute('aria-current', 'page');
    expect(screen.getByText('Quartz Job Properties')).toHaveAttribute('aria-current', 'false');
  });

  test('calls setSection correctly when the Quartz Job Properties button is clicked', () => {
    render(<NavBar section="applicationProperties" setSection={setSection} />);
    fireEvent.click(screen.getByText('Quartz Job Properties'));
    expect(setSection).toHaveBeenCalledWith('quartz');
  });

  test('calls setSection correctly when the Application Properties button is clicked', () => {
    render(<NavBar section="quartz" setSection={setSection} />);
    fireEvent.click(screen.getByText('Application Properties'));
    expect(setSection).toHaveBeenCalledWith('applicationProperties');
  });
});
