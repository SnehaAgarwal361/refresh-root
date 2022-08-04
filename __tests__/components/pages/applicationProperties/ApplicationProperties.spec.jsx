import React from 'react';
import {
  act, fireEvent, render, screen, waitFor,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import { useOneDataFetchye } from '@americanexpress/fetchye-amex';
import userEvent from '@testing-library/user-event';
import ApplicationProperties
  from '../../../../src/components/pages/applicationProperties/ApplicationProperties';
import { createApiResponseJson } from '../../../testMocks/ApiResponseGenerator';
import {
  apiTableData,
  mockApiImplementation,
  mockRefreshFailureResponse,
  mockUpdateFailureResponse,
} from '../../../testMocks/MockApiResponse';

jest.mock('@americanexpress/fetchye-amex');
jest.mock('../../../../src/components/common/UserState', () => ({
  useAdsId: jest.fn()
    .mockReturnValueOnce('testUser'),
}));

const applicationList = [{
  friendlyName: 'Test Application',
  description: 'Test Application',
  id: 'TEST',
}];

jest.mock('../../../../src/applicationList', () => ({
  applicationList,
}));

jest.mock('@americanexpress/one-app-ducks', () => ({
  queryLanguagePack: jest.fn((module, { fallbackLocale } = {}) => ({
    message: `lang pack async state for ${module}`,
    fallbackLocale,
  })),
}));

describe('Application properties', () => {
  test('Application properties screen loaded correctly', () => {
    useOneDataFetchye.mockImplementation(jest.fn);
    render(<ApplicationProperties />);
    expect(screen.getByTestId('applicationFilterSelect'))
      .toBeInTheDocument();
    expect(screen.getByTestId('searchTerm'))
      .toBeInTheDocument();
  });

  test('Handle Pagination', () => {
    useOneDataFetchye.mockImplementation(mockApiImplementation(createApiResponseJson(20)));
    render(<ApplicationProperties />);
    act(() => userEvent.selectOptions(screen.getByTestId('applicationFilterSelect'), 'Test Application'));
    expect(screen.getByText('Test Application').selected)
      .toBeTruthy();
    waitFor(() => {
      expect(screen.getByTestId('itemsPageDropDown'))
        .toBeInTheDocument();
      userEvent.selectOptions(screen.getByTestId('itemsPageDropDown'), '10');
      fireEvent.click(screen.getByRole('button', { name: /Next/ }));
      expect(screen.getByText('Test property19'))
        .toBeInTheDocument();
    });
  });

  test('Handle no response from API', async () => {
    const fetchMock = useOneDataFetchye.mockImplementation(() => ({
      isLoading: false,
      run: jest.fn()
        .mockImplementation(async () => ({
          data: {
            status: 404,
            body: { error: 'No response' },
          },
        })),
    }));
    render(<ApplicationProperties />);
    act(() => userEvent.selectOptions(screen.getByTestId('applicationFilterSelect'), 'Test Application')
    );
    expect(screen.getByText('Test Application').selected)
      .toBeTruthy();

    await waitFor(() => expect(fetchMock)
      .toHaveBeenCalledWith('ReadKnowYourCustomerRefreshApplicationProperties.v1', {
        body: { applicationName: 'TEST' },
        defer: false,
      }));
    expect(screen.queryByText('Test property'))
      .not
      .toBeInTheDocument(); // No Table present
  });

  test('Handle Search within property list', async () => {
    const fetchMock = useOneDataFetchye
      .mockImplementation(mockApiImplementation(createApiResponseJson(5)));
    render(<ApplicationProperties />);
    await act(async () => {
      userEvent.selectOptions(screen.getByTestId('applicationFilterSelect'), 'Test Application');
    });
    await waitFor(() => expect(fetchMock)
      .toHaveBeenCalledWith('ReadKnowYourCustomerRefreshApplicationProperties.v1', {
        body: { applicationName: 'TEST' },
        defer: false,
      }));
    await act(async () => {
      userEvent.type(await screen.findByTestId('searchTerm'), '4'); // Search 4th property
    });
    expect(screen.queryByText('Test property4'))
      .toBeInTheDocument();
    await act(async () => {
      userEvent.clear(await screen.findByTestId('searchTerm')); // Clear the search
    });
    await waitFor(() => expect(screen.queryByText('Test property3'))
      .toBeInTheDocument()); // All properties are back in table
  });

  test('Filter application before search', () => {
    useOneDataFetchye.mockImplementation(mockApiImplementation(null));
    render(<ApplicationProperties />);
    act(() => {
      userEvent.type(screen.getByTestId('searchTerm'), 'Test property');
    });
    expect(screen.queryByText('Test property'))
      .not
      .toBeInTheDocument(); // No table exits
  });

  test('Update application property', () => {
    useOneDataFetchye.mockImplementation(mockApiImplementation(apiTableData));
    render(<ApplicationProperties />);
    userEvent.selectOptions(screen.getByTestId('applicationFilterSelect'), 'Test Application');
    waitFor(() => {
      fireEvent.click(screen.getByText('API_CONTROL'));
      userEvent.clear(screen.getByTestId('modalInputArea'));
      userEvent.type(screen.getByTestId('modalInputArea'), 'FALSE');
      fireEvent.click(screen.getByTestId('modalSaveBtn'));
      waitFor(() => expect(screen.getByText('Updated Successfully')));
    });
  });

  test('Update application property fails', () => {
    useOneDataFetchye.mockImplementation(mockUpdateFailureResponse(apiTableData));
    render(<ApplicationProperties />);
    userEvent.selectOptions(screen.getByTestId('applicationFilterSelect'), 'Test Application');
    expect(screen.getByText('Test Application').selected)
      .toBeTruthy();
    waitFor(() => {
      expect(screen.getByText('TRUE'))
        .toBeInTheDocument();
    });
    fireEvent.click(screen.getByText('TRUE'));
    userEvent.clear(screen.getByTestId('modalInputArea'));
    userEvent.type(screen.getByTestId('modalInputArea'), 'FALSE');
    fireEvent.click(screen.getByTestId('modalSaveBtn'));
    waitFor(() => expect(screen.getByText('Server Error')));
  });

  test('Update succeeds but refresh fails', () => {
    useOneDataFetchye.mockImplementation(mockRefreshFailureResponse(apiTableData));
    render(<ApplicationProperties />);
    userEvent.selectOptions(screen.getByTestId('applicationFilterSelect'), 'Test Application');
    expect(screen.getByText('Test Application').selected)
      .toBeTruthy();
    waitFor(() => {
      expect(screen.getByText('TRUE'))
        .toBeInTheDocument();
    });
    act(() => {
      fireEvent.click(screen.getByText('TRUE'));
    }
    );
    userEvent.clear(screen.getByTestId('modalInputArea'));
    userEvent.type(screen.getByTestId('modalInputArea'), 'FALSE');
    act(() => {
      fireEvent.click(screen.getByTestId('modalSaveBtn'));
    });
    waitFor(() => expect(screen.getByText('Server Error')));
  });
});
