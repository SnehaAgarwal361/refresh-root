import {
  act, render, screen, waitFor,
} from '@testing-library/react';
import React from 'react';
import { useOneDataFetchye } from '@americanexpress/fetchye-amex';
import userEvent from '@testing-library/user-event';
import { UpdateTransitionModal } from '../../../../src/components/pages/workflow/UpdateTransitionModal';

require('@testing-library/jest-dom/extend-expect');

const sampleTransition = {
  version: 1,
  lastUpdatedUserId: 'string',
  lastUpdatedSource: 'string',
  guid: 'testId',
  strategy: 'string',
  superStateName: 'fromSuperState',
  stateName: 'fromState',
  eventType: 'sampleEvent',
  nextSuperStateName: 'toSuperState',
  nextStateName: 'toState',
  actionName: 'sampleAction',
  tags: [
    {
      name: 'AML_REFRESH',
    },
  ],
  active: true,
};
jest.mock('@americanexpress/fetchye-amex');

describe('Test the pop up that updates transition tags', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test('Update Transition Tag', async () => {
    const updateRunMock = useOneDataFetchye.mockImplementation(jest.fn()
      .mockImplementation(() => ({
        isLoading: false,
        run: jest.fn()
          .mockImplementation(async () => ({
            data: {
              status: 200,
              body: '',
            },
          })),
      })));
    const toggleModel = jest.fn();
    render(<UpdateTransitionModal
      applicationName="Test application"
      selectedTransition={sampleTransition}
      toggleModal={toggleModel}
    />);
    userEvent.click(screen.getByText('AML_REFRESH')); // Remove existing Tag
    userEvent.type(screen.getByTestId('newTag'), 'newTag1'); // Add new Tag
    userEvent.click(screen.getByText('Add'));
    userEvent.clear(screen.getByTestId('newTag'));
    userEvent.type(screen.getByTestId('newTag'), 'newTag10'); // Add new Tag again for coverage
    userEvent.click(screen.getByText('Add'));
    await act(async () => {
      userEvent.click(screen.getByText('Update'));
      await waitFor(() => expect(updateRunMock)
        .toHaveBeenCalledWith('UpdateKnowYourCustomerRefreshTransition.v1', {
          body: {
            applicationName: 'Test application',
            transition: {
              actionName: 'sampleAction',
              active: true,
              eventType: 'sampleEvent',
              guid: 'testId',
              lastUpdatedSource: 'string',
              lastUpdatedUserId: 'string',
              nextStateName: 'toState',
              nextSuperStateName: 'toSuperState',
              stateName: 'fromState',
              strategy: 'string',
              superStateName: 'fromSuperState',
              tags: [{ name: 'newTag1' }, { name: 'newTag10' }], // Expecting only the newly added tag
              version: 1,
            },
            transitionId: 'testId',
          },
          defer: true,
        }));
      await waitFor(expect(screen.getByText('Tags updated successfully')).toBeInTheDocument);
      userEvent.click(screen.getByText('Close'));
    });
  });

  test('Update Failed', async () => {
    useOneDataFetchye.mockImplementation(jest.fn()
      .mockImplementation(() => ({
        isLoading: false,
        run: jest.fn()
          .mockImplementation(async () => ({
            data: {
              status: 404,
              body: {
                error: 'Server not found',
              },
            },
          })),
      })));
    const toggleModel = jest.fn();
    render(<UpdateTransitionModal
      applicationName="Test application"
      selectedTransition={sampleTransition}
      toggleModal={toggleModel}
    />);
    userEvent.type(screen.getByTestId('newTag'), 'newTag2'); // Add new Tag
    userEvent.click(screen.getByText('Add'));
    await act(async () => {
      userEvent.click(screen.getByText('Update'));
    });
    await waitFor(expect(screen.getByText('Server not found')).toBeInTheDocument);
  });

  test('Update Failed with unknown error', async () => {
    useOneDataFetchye.mockImplementation(jest.fn()
      .mockImplementation(() => ({
        isLoading: false,
        run: jest.fn()
          .mockImplementation(async () => ({
            data: {
              status: 500,
              body: undefined,
            },
          })),
      })));
    const toggleModel = jest.fn();
    render(<UpdateTransitionModal
      applicationName="Test application"
      selectedTransition={sampleTransition}
      toggleModal={toggleModel}
    />);
    userEvent.type(screen.getByTestId('newTag'), 'newTag3'); // Add new Tag
    userEvent.click(screen.getByText('Add'));
    userEvent.clear(screen.getByTestId('newTag'));
    userEvent.type(screen.getByTestId('newTag'), 'newTag30'); // Add new Tag
    userEvent.click(screen.getByText('Add'));
    userEvent.click(screen.getByText('newTag30')); // Removing last added tag again for coverage
    await act(async () => {
      userEvent.click(screen.getByText('Update'));
    });
    await waitFor(expect(screen.getByText('Unknown error')).toBeInTheDocument);
  });
});
