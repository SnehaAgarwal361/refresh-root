/* eslint-disable react/jsx-no-constructed-context-values -- Source code uses useMemo */
import React from 'react';
import {
  fireEvent, render, screen, waitFor,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useOneDataFetchye } from '@americanexpress/fetchye-amex';
import {
  CreateButton,
  EditButton,
  FetchContext,
  PauseButton,
  Quartz,
  ResetButton,
  ResumeButton,
} from '../../../../src/components/pages/quartz/Quartz';
import { ErrorMessage, SuccessMessage } from '../../../../src/components/common/PageMessages';

require('@testing-library/jest-dom/extend-expect');

jest.mock('@americanexpress/fetchye-amex');
const applicationList = [{
  friendlyName: 'Test Application',
  description: 'Test Application',
  id: 'TEST',
}];
jest.mock('../../../../src/applicationList', () => ({
  applicationList,
}));

describe('Quartz Scheduler', () => {
  test('Display just the top panel with list of applications on startup', () => {
    render(<Quartz />);
    expect(screen.getByTestId('selectedApplication'))
      .toBeInTheDocument();
    expect(screen.queryByText('Legend'))
      .not
      .toBeInTheDocument();
  });

  test('Display trigger list when application is selected', () => {
    useOneDataFetchye.mockImplementation((functionName, options) => {
      if (functionName.startsWith('ReadKnowYourCustomerRefreshJobTriggers')) {
        return {
          isLoading: false,
          data: {
            status: 200,
            body: [{
              name: 'Trigger Application',
              schedule: {
                trigger_type: 'CRON',
                interval: '0 */5 * * * ?',
              },
              state: 'NORMAL',
            }],
          },
        };
      }
      if (functionName.startsWith('CreateKnowYourCustomerRefreshJobTrigger')) {
        return {
          isLoading: false,
          data: {
            status: 204,
            body: undefined,
            run: async () => {
            },
          },
        };
      }
      if (functionName.startsWith('UpdateKnowYourCustomerRefreshJobTrigger') && options.body?.status === 'PAUSED') {
        return {
          isLoading: false,
          data: {
            status: 204,
            body: undefined,
            run: async () => {
            },
          },
        };
      }
      if (functionName.startsWith('UpdateKnowYourCustomerRefreshJobTrigger') && options.body?.status === 'RESET') {
        return {
          isLoading: false,
          data: {
            status: 204,
            body: undefined,
            run: async () => {
            },
          },
        };
      }
      if (functionName.startsWith('UpdateKnowYourCustomerRefreshJobTrigger') && options.body?.status === 'RESUME') {
        return {
          isLoading: false,
          data: {
            status: 204,
            body: undefined,
            run: async () => {
            },
          },
        };
      }
      return {
        isLoading: false,
        data: {
          status: 204,
          body: undefined,
          run: async () => {
          },
        },
      };
    });
    const {
      getByTestId,
      getByRole,
    } = render(
      <Quartz />
    );

    userEvent.selectOptions(getByTestId('selectedApplication'), 'Test Application');
    expect(getByRole('option', { name: 'Test Application' }).selected)
      .toBe(true);
    expect(screen.getByTestId('selectedApplication'))
      .toBeInTheDocument();
    expect(screen.queryByText('Legend'))
      .toBeInTheDocument();
    expect(screen.queryByText('Trigger Application'))
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
    jest.mock('../../../../src/components/pages/quartz/ApiFunctions');
    useOneDataFetchye.mockImplementation(() => ({
      isLoading: false,
      data: {
        status: 400,
        body: { error: 'Bad Request' },
      },
    }));
    const {
      getByTestId,
      getByRole,
    } = render(
      <Quartz />
    );
    userEvent.selectOptions(getByTestId('selectedApplication'), 'Test Application');
    expect(getByRole('option', { name: 'Test Application' }).selected)
      .toBe(true);
    expect(screen.queryByText('Bad Request'))
      .toBeInTheDocument();
  });

  test('Trigger panel not displayed when fetch fails and there is no error message', () => {
    jest.mock('../../../../src/components/pages/quartz/ApiFunctions');
    useOneDataFetchye.mockImplementation(() => ({
      isLoading: false,
      data: undefined,
    }));
    const {
      getByTestId,
      getByRole,
    } = render(
      <Quartz />
    );
    userEvent.selectOptions(getByTestId('selectedApplication'), 'Test Application');
    expect(getByRole('option', { name: 'Test Application' }).selected)
      .toBe(true);
    expect(screen.queryByText('Legend'))
      .not
      .toBeInTheDocument();
    expect(screen.queryByText('Trigger Application'))
      .not
      .toBeInTheDocument();
  });

  test('Trigger panel not displayed until API response is loaded', () => {
    jest.mock('../../../../src/components/pages/quartz/ApiFunctions');
    useOneDataFetchye.mockImplementation(() => ({
      isLoading: true,
      data: {
        status: 400,
        body: undefined,
      },
    }));
    const {
      getByTestId,
      getByRole,
    } = render(
      <Quartz />
    );
    userEvent.selectOptions(getByTestId('selectedApplication'), 'Test Application');
    expect(getByRole('option', { name: 'Test Application' }).selected)
      .toBe(true);
    expect(screen.queryByText('Legend'))
      .not
      .toBeInTheDocument();
    expect(screen.queryByText('Trigger Application'))
      .not
      .toBeInTheDocument();
  });

  test('Pause button calls Pause API correctly', async () => {
    const pauseRunMock = jest.fn()
      .mockImplementation(() => ({ data: { status: 204 } }));
    const fetchContext = {
      refresh: jest.fn()
        .mockImplementation(() => true),
      setError: jest.fn(),
      setSuccess: jest.fn(),
    };
    useOneDataFetchye.mockImplementation(() => ({
      run: pauseRunMock,
    }));
    render(
      <FetchContext.Provider value={fetchContext}>
        <PauseButton selectedApp="Test Application" trigger_name="Test Trigger" />
      </FetchContext.Provider>
    );
    const button = screen.getByRole('button');
    fireEvent.click(button);
    await waitFor(() => expect(pauseRunMock)
      .toBeCalledTimes(1));
    await waitFor(() => expect(fetchContext.refresh)
      .toBeCalledTimes(1));
  });

  test('Pause button sets error message when API call fails', async () => {
    const fetchContext = {
      refresh: jest.fn()
        .mockImplementation(() => true),
      setError: jest.fn(),
      setSuccess: jest.fn(),
    };
    useOneDataFetchye.mockImplementation(() => ({
      run: jest.fn()
        .mockImplementation(() => ({
          data: {
            status: 400,
            body: { error: 'Bad Request' },
          },
        })),
    })
    );
    render(
      <FetchContext.Provider value={fetchContext}>
        <PauseButton selectedApp="Test Application" trigger_name="Test trigger" />
      </FetchContext.Provider>
    );
    const button = screen.getByRole('button');
    fireEvent.click(button);
    await waitFor(() => expect(fetchContext.setError)
      .toBeCalledTimes(2));
  });

  test('Pause button sets error message when Unknown error occurs', async () => {
    const fetchContext = {
      refresh: jest.fn()
        .mockImplementation(() => true),
      setError: jest.fn(),
      setSuccess: jest.fn(),
    };
    useOneDataFetchye.mockImplementation(() => ({
      run: jest.fn()
        .mockImplementation(() => ({
          data: {
            status: 400,
            body: undefined,
          },
        })),
    })
    );
    render(
      <FetchContext.Provider value={fetchContext}>
        <PauseButton selectedApp="Test Application" trigger_name="Test trigger" />
      </FetchContext.Provider>
    );
    const button = screen.getByRole('button');
    fireEvent.click(button);
    await waitFor(() => expect(fetchContext.setError)
      .toBeCalledTimes(2));
  });

  test('Resume button calls Resume API correctly', async () => {
    const resumeRunMock = jest.fn()
      .mockImplementation(() => ({ data: { status: 204 } }));
    const fetchContext = {
      refresh: jest.fn()
        .mockImplementation(() => true),
      setError: jest.fn(),
      setSuccess: jest.fn(),
    };
    useOneDataFetchye.mockImplementation(() => (
      {
        run: resumeRunMock,
      }
    ));
    render(
      <FetchContext.Provider value={fetchContext}>
        <ResumeButton selectedApp="Test Application" trigger_name="Test Trigger" />
      </FetchContext.Provider>
    );
    const button = screen.getByRole('button');
    fireEvent.click(button);
    await waitFor(() => expect(fetchContext.refresh)
      .toBeCalledTimes(1));
  });

  test('Resume button sets error message when API call fails', async () => {
    const resumeRunMock = jest.fn()
      .mockImplementation(() => ({
        data: {
          status: 400,
          body: { error: 'Bad Request' },
        },
      }));
    const fetchContext = {
      refresh: jest.fn()
        .mockImplementation(() => true),
      setError: jest.fn(),
      setSuccess: jest.fn(),
    };
    useOneDataFetchye.mockImplementation(() => ({
      run: resumeRunMock,
    }));
    render(
      <FetchContext.Provider value={fetchContext}>
        <ResumeButton selectedApp="Test Application" trigger_name="Test trigger" />
      </FetchContext.Provider>
    );
    const button = screen.getByRole('button');
    fireEvent.click(button);
    await waitFor(() => expect(fetchContext.setError)
      .toBeCalledTimes(2));
  });

  test('Resume button sets error message when unknown error occurs', async () => {
    const resumeRunMock = jest.fn()
      .mockImplementation(() => ({
        data: { status: 400 },
        body: undefined,
      }));
    const fetchContext = {
      refresh: jest.fn()
        .mockImplementation(() => true),
      setError: jest.fn(),
      setSuccess: jest.fn(),
    };
    useOneDataFetchye.mockImplementation(() => ({
      run: resumeRunMock,
    }));
    render(
      <FetchContext.Provider value={fetchContext}>
        <ResumeButton selectedApp="Test Application" trigger_name="Test trigger" />
      </FetchContext.Provider>
    );
    const button = screen.getByRole('button');
    fireEvent.click(button);
    await waitFor(() => expect(fetchContext.setError)
      .toBeCalledTimes(2));
  });

  test('Reset button calls Reset API correctly', async () => {
    const resetRunMock = jest.fn()
      .mockImplementation(() => ({ data: { status: 204 } }));
    const fetchContext = {
      refresh: jest.fn()
        .mockImplementation(() => true),
      setError: jest.fn(),
      setSuccess: jest.fn(),
    };
    useOneDataFetchye.mockImplementation(() => ({
      run: resetRunMock,
    }));
    render(
      <FetchContext.Provider value={fetchContext}>
        <ResetButton selectedApp="Test Application" trigger_name="Test Trigger" />
      </FetchContext.Provider>
    );
    const button = screen.getByRole('button');
    fireEvent.click(button);
    await waitFor(() => expect(resetRunMock)
      .toBeCalledTimes(1));
    await waitFor(() => expect(fetchContext.refresh)
      .toBeCalledTimes(1));
  });

  test('Reset button set error message when API call fails', async () => {
    const fetchContext = {
      refresh: jest.fn()
        .mockImplementation(() => true),
      setError: jest.fn(),
      setSuccess: jest.fn(),
    };
    useOneDataFetchye.mockImplementation(() => (
      {
        run: jest.fn()
          .mockImplementation(() => ({
            data: {
              status: 400,
              body: { error: 'Bad Request' },
            },
          })),
      }
    ));
    render(
      <FetchContext.Provider value={fetchContext}>
        <ResetButton selectedApp="Test Application" trigger_name="Test Trigger" />
      </FetchContext.Provider>
    );
    const button = screen.getByRole('button');
    fireEvent.click(button);
    await waitFor(() => expect(fetchContext.setError)
      .toBeCalledTimes(2));
  });

  test('Reset button sets error message unknown error occurs', async () => {
    const fetchContext = {
      refresh: jest.fn()
        .mockImplementation(() => true),
      setError: jest.fn(),
      setSuccess: jest.fn(),
    };
    useOneDataFetchye.mockImplementation(() => (
      {
        run: jest.fn()
          .mockImplementation(() => ({
            data: {
              status: 400,
              body: undefined,
            },
          })),
      }
    ));
    render(
      <FetchContext.Provider value={fetchContext}>
        <ResetButton selectedApp="Test Application" trigger_name="Test Trigger" />
      </FetchContext.Provider>
    );
    const button = screen.getByRole('button');
    fireEvent.click(button);
    await waitFor(() => expect(fetchContext.setError)
      .toBeCalledTimes(2));
  });

  test('Fire now button calls Create API correctly', async () => {
    const createRunMock = jest.fn()
      .mockImplementation(() => ({ data: { status: 201 } }));
    const fetchContext = {
      refresh: jest.fn()
        .mockImplementation(() => true),
      setError: jest.fn(),
      setSuccess: jest.fn(),
    };
    useOneDataFetchye.mockImplementation(() => (
      {
        run: createRunMock,
      }
    ));
    render(
      <FetchContext.Provider value={fetchContext}>
        <CreateButton selectedApp="Test Application" trigger_name="Test Trigger" />
      </FetchContext.Provider>
    );
    const button = screen.getByRole('button');
    fireEvent.click(button);
    await waitFor(() => expect(createRunMock)
      .toBeCalledTimes(1));
    await waitFor(() => expect(fetchContext.setSuccess)
      .toBeCalledTimes(2));
  });

  test('Fire now button sets error message when API call fails', async () => {
    const fetchContext = {
      refresh: jest.fn()
        .mockImplementation(() => true),
      setError: jest.fn(),
      setSuccess: jest.fn(),
    };
    useOneDataFetchye.mockImplementation(() => (
      {
        run: jest.fn()
          .mockImplementation(() => ({
            data: {
              status: 400,
              body: { error: 'Bad Request' },
            },
          })),
      }
    ));
    render(
      <FetchContext.Provider value={fetchContext}>
        <CreateButton selectedApp="Test Application" trigger_name="Test Trigger" />
      </FetchContext.Provider>
    );
    const button = screen.getByRole('button');
    fireEvent.click(button);
    await waitFor(() => expect(fetchContext.setError)
      .toBeCalledTimes(2));
  });

  test('Fire now button sets error message when unknown error occurs', async () => {
    const fetchContext = {
      refresh: jest.fn()
        .mockImplementation(() => true),
      setError: jest.fn(),
      setSuccess: jest.fn(),
    };
    useOneDataFetchye.mockImplementation(() => (
      {
        run: jest.fn()
          .mockImplementation(() => ({
            data: {
              status: 400,
              body: undefined,
            },
          })),
      }
    ));
    render(
      <FetchContext.Provider value={fetchContext}>
        <CreateButton selectedApp="Test Application" trigger_name="Test Trigger" />
      </FetchContext.Provider>
    );
    const button = screen.getByRole('button');
    fireEvent.click(button);
    await waitFor(() => expect(fetchContext.setError)
      .toBeCalledTimes(2));
  });

  test('Edit now button calls Update API correctly', async () => {
    const updateRunMock = jest.fn()
      .mockImplementation(() => ({ data: { status: 204 } }));
    const fetchContext = {
      refresh: jest.fn()
        .mockImplementation(() => true),
      setError: jest.fn(),
      setSuccess: jest.fn(),
    };
    useOneDataFetchye.mockImplementation(() => (
      {
        run: updateRunMock,
      }
    ));
    const sampleTrigger = {
      schedule: {
        trigger_type: 'CRON',
        interval: '0 0/2 * * * ?',
      },
      name: 'Test Trigger',
    };
    const {
      findByText,
      getByDisplayValue,
    } = render(
      <FetchContext.Provider value={fetchContext}>
        <EditButton selectedApp="Test Application" trigger={sampleTrigger} />
      </FetchContext.Provider>
    );
    const editButton = screen.getByRole('button');
    const newInterval = '0 0/1 * * * ?';
    fireEvent.click(editButton);
    const inputForInterval = await getByDisplayValue(sampleTrigger.schedule.interval);
    fireEvent.change(inputForInterval, { target: { value: newInterval } });
    const updateButton = await findByText('Update');
    fireEvent.click(updateButton);
    await waitFor(() => expect(updateRunMock)
      .toBeCalledTimes(1));
    await waitFor(() => expect(fetchContext.refresh)
      .toBeCalledTimes(1));
  });

  test('Edit button set error message when API call fails', async () => {
    const fetchContext = {
      refresh: jest.fn()
        .mockImplementation(() => true),
      setError: jest.fn(),
      setSuccess: jest.fn(),
    };
    useOneDataFetchye.mockImplementation(() => (
      {
        run: jest.fn()
          .mockImplementation(() => ({
            data: {
              status: 400,
              body: { error: 'Bad Request' },
            },
          })),
      }
    ));
    const sampleTrigger = {
      schedule: {
        trigger_type: 'CRON',
        interval: '0 0/2 * * * ?',
      },
      name: 'Test Trigger',
    };
    const { findByText } = render(
      <FetchContext.Provider value={fetchContext}>
        <EditButton selectedApp="Test Application" trigger={sampleTrigger} />
      </FetchContext.Provider>
    );
    const editButton = screen.getByRole('button');
    fireEvent.click(editButton);
    const updateButton = await findByText('Update');
    fireEvent.click(updateButton);
    await waitFor(() => expect(fetchContext.setError)
      .toBeCalledTimes(2));
  });

  test('Edit button sets error message when unknown error occurs', async () => {
    const fetchContext = {
      refresh: jest.fn()
        .mockImplementation(() => true),
      setError: jest.fn(),
      setSuccess: jest.fn(),
    };
    useOneDataFetchye.mockImplementation(() => (
      {
        run: jest.fn()
          .mockImplementation(() => ({
            data: {
              status: 400,
              body: undefined,
            },
          })),
      }
    ));
    const sampleTrigger = {
      schedule: {
        trigger_type: 'CRON',
        interval: '0 0/2 * * * ?',
      },
      name: 'Test Trigger',
    };
    const { findByText } = render(
      <FetchContext.Provider value={fetchContext}>
        <EditButton selectedApp="Test Application" trigger={sampleTrigger} />
      </FetchContext.Provider>
    );
    const editButton = screen.getByRole('button');
    fireEvent.click(editButton);
    const updateButton = await findByText('Update');
    fireEvent.click(updateButton);
    await waitFor(() => expect(fetchContext.setError)
      .toBeCalledTimes(2));
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
