import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SelectRowsDropdown from '../../../../src/components/pages/applicationProperties/SelectRowsDropdown';

describe('SelectRowsDropdown', () => {
  const handleDropDownChange = jest.fn();

  test('renders correctly with given props', () => {
    render(
      <SelectRowsDropdown
        handleDropDownChange={handleDropDownChange}
        itemsPerPage={10}
        tableLength={100}
      />
    );

    expect(screen.getByTestId('selectRowsDropdownLabel')).toBeInTheDocument();
    expect(screen.getByTestId('itemsPageDropDown')).toBeInTheDocument();
    expect(screen.getByRole('option', { name: '10' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: '20' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'All Rows' })).toBeInTheDocument();
    expect(screen.getByTestId('itemsPageDropDown')).toHaveValue('10');
  });

  test('calls handleDropDownChange when a new option is selected', () => {
    render(
      <SelectRowsDropdown
        handleDropDownChange={handleDropDownChange}
        itemsPerPage={10}
        tableLength={100}
      />
    );
    fireEvent.change(screen.getByTestId('itemsPageDropDown'), { target: { value: '20' } });
    expect(handleDropDownChange).toHaveBeenCalled();
  });

  test('correctly displays All Rows option if selected', () => {
    render(
      <SelectRowsDropdown
        handleDropDownChange={handleDropDownChange}
        itemsPerPage={100}
        tableLength={100}
      />
    );

    expect(screen.getByTestId('itemsPageDropDown')).toHaveValue('100');
    expect(screen.getByText('All Rows')).toBeInTheDocument();
  });
});
