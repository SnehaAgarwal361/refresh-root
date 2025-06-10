import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { SuccessMessage, ErrorMessage } from '../../../src/components/common/PageMessages';

describe('PageMessage', () => {
  test('renders SuccessMessage correctly', () => {
    const setSuccess = jest.fn();
    render(<SuccessMessage message="Success!" setSuccess={setSuccess} />);
    expect(screen.getByText('Success!')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /close/i })).toBeInTheDocument();
  });

  test('successMessage does not render if message is undefined', () => {
    const setSuccess = jest.fn();
    render(<SuccessMessage message={undefined} setSuccess={setSuccess} />);
    expect(screen.queryByText('Success!')).not.toBeInTheDocument();
    const divElement = screen.getByTestId('empty-success-message');
    expect(divElement).toBeEmptyDOMElement();
  });

  test('calls setSuccess when SuccessMessage is dismissed', () => {
    const setSuccess = jest.fn();
    render(<SuccessMessage message="Success!" setSuccess={setSuccess} />);
    fireEvent.click(screen.getByRole('button', { name: /close/i }));
    expect(setSuccess).toHaveBeenCalledWith(undefined);
  });

  test('renders ErrorMessage correctly', () => {
    const setError = jest.fn();
    render(<ErrorMessage message="Error!" setError={setError} />);
    expect(screen.getByText('Error!')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /close/i })).toBeInTheDocument();
  });

  test('errorMessage does not render if message is undefined', () => {
    const setError = jest.fn();
    render(<ErrorMessage message={undefined} setError={setError} />);
    expect(screen.queryByText('Error!')).not.toBeInTheDocument();
    const divElement = screen.getByTestId('empty-error-message');
    expect(divElement).toBeEmptyDOMElement();
  });

  test('calls setError when ErrorMessage is dismissed', () => {
    const setError = jest.fn();
    render(<ErrorMessage message="Error!" setError={setError} />);
    fireEvent.click(screen.getByRole('button', { name: /close/i }));
    expect(setError).toHaveBeenCalledWith(undefined);
  });
});
