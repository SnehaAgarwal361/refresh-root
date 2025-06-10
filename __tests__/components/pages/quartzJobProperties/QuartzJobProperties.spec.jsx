/* eslint-disable react/jsx-no-constructed-context-values -- Source code uses useMemo */
import React from 'react';
import {
  fireEvent, render, screen,
} from '@testing-library/react';
import { useOneDataFetchye } from '@americanexpress/fetchye-amex';
import {
  QuartzJobProperties,
} from '../../../../src/components/pages/quartzJobProperties/QuartzJobProperties';
import { ErrorMessage, SuccessMessage } from '../../../../src/components/common/PageMessages';

require('@testing-library/jest-dom/extend-expect');

jest.mock('@americanexpress/fetchye-amex');
const applicationList = [{
  friendlyName: 'Test Application',
  description: 'Test Application',
  id: 'TEST',
}];
jest.mock('../../../../src/constants/applicationList', () => ({
  applicationList,
}));

describe('Quartz Scheduler', () => {
  const sampleTrigger = {
    schedule: {
      trigger_type: 'CRON',
      interval: '0 0/2 * * * ?',
    },
    name: 'Test Trigger',
  };

  test('Displays Trigger List', () => {
    useOneDataFetchye.mockImplementation(() => ({
      isLoading: false,
      data: {
        status: 200,
        body: [sampleTrigger],
      },
      run: jest.fn()
        .mockImplementation(() => ({
          data: {
            status: 200,
            body: [sampleTrigger],
          },
        })),

    })
    );
    render(<QuartzJobProperties selectedApp="Test Application" />);
    expect(screen.getByTestId('triggerList')).toBeInTheDocument();
    expect(screen.getByTestId('actionsNotification')).toBeInTheDocument();
    expect(screen.queryByText('Test Trigger'))
      .toBeInTheDocument();
    expect(screen.queryByText('0 0/2 * * * ?'))
      .toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Pause/ }))
      .toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Fire Now/ }))
      .toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Resume/ }))
      .toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Reset/ }))
      .toBeInTheDocument();
  });

  test('Display Error Message when fetch fails for selected application', () => {
    jest.mock('../../../../src/components/pages/quartzJobProperties/ApiFunctions');
    useOneDataFetchye.mockImplementation(() => ({
      isLoading: false,
      data: {
        status: 400,
        body: { error: 'Bad Request' },
      },
    }));
    render(
      <QuartzJobProperties selectedApp="Test Application" />
    );
    expect(screen.queryByText('Bad Request'))
      .toBeInTheDocument();
    expect(screen.queryByText('Trigger Application'))
      .not
      .toBeInTheDocument();
  });

  test('Trigger panel not displayed when fetch fails and there is no error message', () => {
    jest.mock('../../../../src/components/pages/quartzJobProperties/ApiFunctions');
    useOneDataFetchye.mockImplementation(() => ({
      isLoading: false,
      data: undefined,
    }));
    render(
      <QuartzJobProperties selectedApp="Test Application" />
    );
    expect(screen.queryByText('Legend'))
      .not
      .toBeInTheDocument();
    expect(screen.queryByText('Trigger Application'))
      .not
      .toBeInTheDocument();
  });

  test('Trigger panel not displayed when API response is still loading', () => {
    jest.mock('../../../../src/components/pages/quartzJobProperties/ApiFunctions');
    useOneDataFetchye.mockImplementation(() => ({
      isLoading: true,
      data: {
        status: 400,
        body: undefined,
      },
    }));
    render(
      <QuartzJobProperties selectedApp="Test Application" />
    );
    expect(screen.queryByText('Legend'))
      .not
      .toBeInTheDocument();
    expect(screen.queryByText('Trigger Application'))
      .not
      .toBeInTheDocument();
  });

  /* eslint-enable react/jsx-no-constructed-context-values -- Enabling back */

  test('Error Message is dismissible', () => {
    const setErrorMock = jest.fn();
    render(<ErrorMessage setError={setErrorMock} message="Test Message" />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(setErrorMock)
      .toHaveBeenLastCalledWith(undefined);
  });

  test('Success Message is dismissible', () => {
    const setSuccessMock = jest.fn();
    render(<SuccessMessage setSuccess={setSuccessMock} message="Test Message" />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(setSuccessMock)
      .toHaveBeenLastCalledWith(undefined);
  });
});
