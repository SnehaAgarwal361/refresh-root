import React from 'react';
import {
  render, screen, waitFor,
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
    return expect(screen.getByTestId('searchTerm'))
      .toBeInTheDocument();
  });

  test('Handle Pagination', () => {
    useOneDataFetchye.mockImplementation(mockApiImplementation(createApiResponseJson(20)));
    render(<ApplicationProperties />);
    userEvent.selectOptions(screen.getByTestId('applicationFilterSelect'), 'Test Application');
    expect(screen.getByText('Test Application').selected)
      .toBeTruthy();
    expect(screen.getByTestId('itemsPageDropDown'))
      .toBeInTheDocument();
    userEvent.selectOptions(screen.getByTestId('itemsPageDropDown'), '10');
    userEvent.click(screen.getByRole('button', { name: /Next/ }));
    return expect(screen.getByText('Test property19'))
      .toBeInTheDocument();
  });

  test('Handle no response from API', () => {
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
    userEvent.selectOptions(screen.getByTestId('applicationFilterSelect'), 'Test Application');
    expect(screen.getByText('Test Application').selected)
      .toBeTruthy();
    expect(fetchMock)
      .toHaveBeenCalledWith('ReadKnowYourCustomerRefreshApplicationProperties.v1', {
        body: { applicationName: 'TEST' },
        defer: false,
      });
    return expect(screen.queryByText('Test property'))
      .not
      .toBeInTheDocument(); // No Table present
  });

  test('Handle Search within property list', () => {
    const fetchMock = useOneDataFetchye
      .mockImplementation(mockApiImplementation(createApiResponseJson(5)));
    render(<ApplicationProperties />);
    userEvent.selectOptions(screen.getByTestId('applicationFilterSelect'), 'Test Application');
    expect(fetchMock)
      .toHaveBeenCalledWith('ReadKnowYourCustomerRefreshApplicationProperties.v1', {
        body: { applicationName: 'TEST' },
        defer: false,
      });
    return screen.findByTestId('searchTerm')
      .then((el) => userEvent.type(el, '4')) // Search 4th property
      .then(expect(screen.queryByText('Test property4'))
        .toBeInTheDocument())
      .then(() => screen.findByTestId('searchTerm'))
      .then((el) => userEvent.clear(el)) // Clear the search
      .then(expect(screen.queryByText('Test property3')).toBeInTheDocument()); // All properties are back in table
  });

  test('Filter application before search', () => {
    useOneDataFetchye.mockImplementation(mockApiImplementation(null));
    render(<ApplicationProperties />);
    userEvent.type(screen.getByTestId('searchTerm'), 'Test property');
    expect(screen.queryByText('Test property'))
      .not
      .toBeInTheDocument(); // No table exits
  });

  test('Update application property', () => {
    useOneDataFetchye.mockImplementation(mockApiImplementation(apiTableData));
    render(<ApplicationProperties />);
    userEvent.selectOptions(screen.getByTestId('applicationFilterSelect'), 'Test Application');
    userEvent.click(screen.getByText('API_CONTROL'));
    userEvent.clear(screen.getByTestId('modalInputArea'));
    userEvent.type(screen.getByTestId('modalInputArea'), 'FALSE');
    userEvent.click(screen.getByTestId('modalSaveBtn'));
    return waitFor(() => expect(screen.getByText('Updated Successfully')));
  });

  test('Update application property fails', () => {
    useOneDataFetchye.mockImplementation(mockUpdateFailureResponse(apiTableData));
    render(<ApplicationProperties />);
    userEvent.selectOptions(screen.getByTestId('applicationFilterSelect'), 'Test Application');
    expect(screen.getByText('Test Application').selected)
      .toBeTruthy();
    expect(screen.getByText('TRUE'))
      .toBeInTheDocument();
    userEvent.click(screen.getByText('TRUE'));
    userEvent.clear(screen.getByTestId('modalInputArea'));
    userEvent.type(screen.getByTestId('modalInputArea'), 'FALSE');
    userEvent.click(screen.getByTestId('modalSaveBtn'));
    return waitFor(() => expect(screen.getByText('Server Error')));
  });

  test('Update succeeds but refresh fails', () => {
    useOneDataFetchye.mockImplementation(mockRefreshFailureResponse(apiTableData));
    render(<ApplicationProperties />);
    userEvent.selectOptions(screen.getByTestId('applicationFilterSelect'), 'Test Application');
    expect(screen.getByText('Test Application').selected)
      .toBeTruthy();
    expect(screen.getByText('TRUE'))
      .toBeInTheDocument();
    userEvent.click(screen.getByText('TRUE'));
    userEvent.clear(screen.getByTestId('modalInputArea'));
    userEvent.type(screen.getByTestId('modalInputArea'), 'FALSE');
    userEvent.click(screen.getByTestId('modalSaveBtn'));
    return waitFor(() => expect(screen.getByText('Server Error')));
  });
});
