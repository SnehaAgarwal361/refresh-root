/* eslint-disable react/jsx-no-constructed-context-values -- Source code uses useMemo */
import React from 'react';
import {
  fireEvent, render, screen, waitFor,
} from '@testing-library/react';
import { useOneDataFetchye } from '@americanexpress/fetchye-amex';
import FetchContext from '../../../../src/context/FetchContext';
import {
  PauseButton, ResetButton, ResumeButton, FireButton, EditButton,
} from '../../../../src/components/pages/quartzJobProperties/ActionButtonsPanel';

require('@testing-library/jest-dom/extend-expect');

jest.mock('@americanexpress/fetchye-amex');

describe('Action Buttons Panel', () => {
  const sampleTrigger = {
    schedule: {
      trigger_type: 'CRON',
      interval: '0 0/2 * * * ?',
    },
    name: 'Test Trigger',
  };

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
        <FireButton selectedApp="Test Application" trigger_name="Test Trigger" />
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
        <FireButton selectedApp="Test Application" trigger_name="Test Trigger" />
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
        <FireButton selectedApp="Test Application" trigger_name="Test Trigger" />
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
});
