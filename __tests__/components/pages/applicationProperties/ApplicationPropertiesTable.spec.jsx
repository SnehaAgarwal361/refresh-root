import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
// eslint-disable-next-line import/no-named-as-default -- Using named export for testing purposes
import ApplicationPropertiesTable from '../../../../src/components/pages/applicationProperties/applicationPropertiesTable/ApplicationPropertiesTable';

const paginatedRows = [
  {
    application_name: 'App1', name: 'Property1', group: 'Group1', description: 'Description1', value: 'Value1',
  },
  {
    application_name: 'App2', name: 'Property2', group: 'Group2', description: 'Description2', value: 'Value2',
  },
];

const modalRef = { current: { openModal: jest.fn() } };
const handleSortClick = jest.fn();

describe('ApplicationPropertiesTable', () => {
  test('renders correctly', () => {
    render(<ApplicationPropertiesTable paginatedRows={paginatedRows} modalRef={modalRef} sortedDirection="ascending" handleSortClick={handleSortClick} />);
    expect(screen.getByRole('table')).toBeInTheDocument();
    expect(screen.getAllByRole('columnheader')).toHaveLength(4);
  });

  test('displays all application properties', () => {
    render(<ApplicationPropertiesTable paginatedRows={paginatedRows} modalRef={modalRef} sortedDirection="ascending" handleSortClick={handleSortClick} />);
    paginatedRows.forEach((row) => {
      expect(screen.getByText(row.name)).toBeInTheDocument();
      expect(screen.getByText(row.group)).toBeInTheDocument();
      expect(screen.getByText(row.description)).toBeInTheDocument();
      expect(screen.getByText(row.value)).toBeInTheDocument();
    });
  });

  test('calls handleSortClick when sort button is clicked', () => {
    render(<ApplicationPropertiesTable paginatedRows={paginatedRows} modalRef={modalRef} sortedDirection="ascending" handleSortClick={handleSortClick} />);
    fireEvent.click(screen.getByRole('button', { name: /sort by/i }));
    expect(handleSortClick).toHaveBeenCalled();
  });

  test('calls openModal when a row is clicked', () => {
    render(<ApplicationPropertiesTable paginatedRows={paginatedRows} modalRef={modalRef} sortedDirection="ascending" handleSortClick={handleSortClick} />);
    fireEvent.click(screen.getByText(paginatedRows[0].name));
    expect(modalRef.current.openModal).toHaveBeenCalledWith(paginatedRows[0], 0);
  });

  test('renders descending sort icon when sortedDirection is ascending', () => {
    render(<ApplicationPropertiesTable paginatedRows={paginatedRows} modalRef={modalRef} sortedDirection="ascending" handleSortClick={handleSortClick} />);
    const sortIcon = screen.getByTestId('sortByIcon');
    expect(sortIcon).toBeInTheDocument();
    expect(sortIcon).toHaveClass('sortIconAscending');
  });

  test('renders descending sort icon when sortedDirection is descending', () => {
    render(<ApplicationPropertiesTable paginatedRows={paginatedRows} modalRef={modalRef} sortedDirection="descending" handleSortClick={handleSortClick} />);
    const sortIcon = screen.getByTestId('sortByIcon');
    expect(sortIcon).toBeInTheDocument();
    expect(sortIcon).toHaveClass('sortIconDescending');
  });
});
