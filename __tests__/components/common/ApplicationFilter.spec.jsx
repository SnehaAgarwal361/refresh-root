import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { ApplicationFilter } from '../../../src/components/common/applicationFilter/ApplicationFilter';
import { applicationList } from '../../../src/constants/applicationList';

describe('ApplicationFilter', () => {
  const setAppMock = jest.fn();

  beforeEach(() => {
    setAppMock.mockClear();
  });

  test('renders correctly', () => {
    render(<ApplicationFilter setApp={setAppMock} />);
    expect(screen.getByTestId('applicationFilterLabel')).toBeInTheDocument();
    expect(screen.getByTestId('applicationFilterSelect')).toBeInTheDocument();
  });

  test('displays all application options', () => {
    render(<ApplicationFilter setApp={setAppMock} />);
    const options = screen.getAllByRole('option');
    expect(options).toHaveLength(applicationList.length + 1); // +1 for the empty option
    applicationList.forEach((app) => {
      expect(screen.getByText(app.friendlyName)).toBeInTheDocument();
    });
  });

  test('calls setApp when an option is selected', () => {
    render(<ApplicationFilter setApp={setAppMock} />);
    const select = screen.getByTestId('applicationFilterSelect');
    fireEvent.change(select, { target: { value: applicationList[0].id } });
    expect(setAppMock).toHaveBeenCalledWith(expect.any(Object));
  });
});
