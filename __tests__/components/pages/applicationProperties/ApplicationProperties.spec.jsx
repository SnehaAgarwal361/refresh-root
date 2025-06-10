import React, { useState } from 'react';
import {
  act, fireEvent,
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
jest.mock('../../../../src/components/common/authentication/UserState', () => ({
  useAdsId: jest.fn()
    .mockReturnValueOnce('testUser'),
}));

const applicationList = [{
  friendlyName: 'Test Application',
  description: 'Test Application',
  id: 'TEST',
}];

jest.mock('../../../../src/constants/applicationList', () => ({
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
    useOneDataFetchye.mockImplementation(mockApiImplementation(createApiResponseJson(3)));
    const mockProps = {
      applicationName: 'Test Application',
      errorMessage: undefined,
      setErrorMessage: jest.fn(),
      successMessage: undefined,
      setSuccessMessage: jest.fn(),
      currentPage: 1,
      setCurrentPage: jest.fn(),
    };
    render(<ApplicationProperties {...mockProps} />);
    expect(screen.getByTestId('applicationPropertiesSection')).toBeInTheDocument();
    expect(screen.getByTestId('selectRowsDropdown')).toBeInTheDocument();
    expect(screen.getByTestId('applicationPropertiesTable')).toBeInTheDocument();
    expect(screen.getByTestId('empty-success-message')).toBeInTheDocument();
    expect(screen.getByTestId('empty-error-message')).toBeInTheDocument();
    expect(screen.queryByTestId('applicationModal')).not.toBeInTheDocument();
  });

  test('Handle Change In Rows Displayed', async () => {
    const TestComponent = () => {
      const [currentPage, setCurrentPage] = useState(1); // Use hooks inside a functional component

      const mockProps = {
        applicationName: 'Test Application',
        errorMessage: undefined,
        setErrorMessage: jest.fn(),
        successMessage: undefined,
        setSuccessMessage: jest.fn(),
        currentPage, // Pass currentPage from state
        setCurrentPage, // Pass setCurrentPage directly
      };

      return <ApplicationProperties {...mockProps} />;
    };
    useOneDataFetchye.mockImplementation(mockApiImplementation(createApiResponseJson(20)));
    render(<TestComponent />);
    // Verify Initial state
    expect(screen.getByTestId('itemsPageDropDown')).toBeInTheDocument();
    expect(screen.getByText('Test property0')).toBeInTheDocument();
    expect(screen.getByText('Test property19')).toBeInTheDocument();
    // Simulate selecting page size
    await act(async () => {
      userEvent.selectOptions(screen.getByTestId('itemsPageDropDown'), '10');
    });
    expect(screen.getByText('Test property0')).toBeInTheDocument();
    expect(screen.getByText('Test property17')).toBeInTheDocument();
    expect(screen.queryByText('Test property18')).not.toBeInTheDocument();
    expect(screen.queryByText('Test property9')).not.toBeInTheDocument();
    // simulate selecting next page
    expect(screen.getByRole('button', { name: /Next/ })).toBeInTheDocument();
    await act(async () => {
      userEvent.click(screen.getByRole('button', { name: /Next/ }));
    });

    // Verify currentPage update
    expect(screen.getByText('Test property18')).toBeInTheDocument();
    expect(screen.getByText('Test property9')).toBeInTheDocument();
    expect(screen.queryByText('Test property0')).not.toBeInTheDocument();
    expect(screen.queryByText('Test property17')).not.toBeInTheDocument();
  });

  test('Table not displayed if API response has not loaded', () => {
    useOneDataFetchye.mockImplementation(() => ({
      isLoading: true,
      run: jest.fn(),
    }));
    const mockProps = {
      applicationName: 'Test Application',
      errorMessage: undefined,
      setErrorMessage: jest.fn(),
      successMessage: undefined,
      setSuccessMessage: jest.fn(),
      currentPage: 1,
      setCurrentPage: jest.fn(),
    };
    render(<ApplicationProperties {...mockProps} />);
    expect(screen.queryByTestId('applicationPropertiesTable')).not.toBeInTheDocument(); // No Table present
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
    const mockProps = {
      applicationName: 'Test Application',
      errorMessage: undefined,
      setErrorMessage: jest.fn(),
      successMessage: undefined,
      setSuccessMessage: jest.fn(),
      currentPage: 1,
      setCurrentPage: jest.fn(),
    };
    render(<ApplicationProperties {...mockProps} />);
    expect(fetchMock)
      .toHaveBeenCalledWith('ReadKnowYourCustomerRefreshApplicationProperties.v1', {
        body: { application_name: 'Test Application' },
        defer: false,
      });
    return expect(screen.queryByText('Test property'))
      .not
      .toBeInTheDocument(); // No Table present
  });

  test('Message displayed if API returns empty data body', () => {
    useOneDataFetchye.mockImplementation(() => (
      {
        isLoading: false,
        run: jest.fn(),
        data: {
          status: 200,
          body: [],
        },
      }));

    const TestComponent = () => {
      const [errorMessage, setErrorMessage] = useState(undefined);

      const mockProps = {
        applicationName: 'Test Application',
        errorMessage,
        setErrorMessage,
        successMessage: undefined,
        setSuccessMessage: jest.fn(),
        currentPage: 1,
        setCurrentPage: jest.fn(),
      };

      return <ApplicationProperties {...mockProps} />;
    };

    render(<TestComponent />);
    // Verify error message is displayed
    expect(screen.getByTestId('error-message')).toBeInTheDocument();
    expect(screen.getByText('Empty response body returned from One Data.')).toBeInTheDocument();

    // Verify no table data is rendered
    expect(screen.queryByText('Test property')).not.toBeInTheDocument();
  });

  test('Update application property', async () => {
    const TestComponent = () => {
      const [successMessage, setSuccessMessage] = useState('');
      return (
        <ApplicationProperties
          applicationName="Test Application"
          errorMessage={undefined}
          setErrorMessage={jest.fn()}
          currentPage={1}
          setCurrentPage={jest.fn()}
          successMessage={successMessage}
          setSuccessMessage={setSuccessMessage}
        />
      );
    };
    useOneDataFetchye.mockImplementation(mockApiImplementation(apiTableData));
    render(<TestComponent />);
    expect(screen.getByText('API_CONTROL')).toBeInTheDocument();

    // Simulate opening the modal
    await act(async () => {
      userEvent.click(screen.getByText('API_CONTROL'));
    });
    await waitFor(() => expect(screen.getByTestId('applicationModal')).toBeInTheDocument());

    // Simulate editing the value
    await act(async () => {
      userEvent.clear(screen.getByTestId('modalInputArea'));
    });
    userEvent.type(screen.getByTestId('modalInputArea'), 'FALSE');

    // Simulate saving the application property
    userEvent.click(screen.getByTestId('modalSaveBtn'));
    // Verify success message is displayed
    await act(async () => {
      await waitFor(() => expect(screen.getByTestId('success-message')).toBeInTheDocument());
      await waitFor(() => expect(screen.getByTestId('empty-error-message')).toBeInTheDocument());
      await waitFor(() => expect(screen.getByText('Updated Successfully')).toBeInTheDocument());
    });
  });

  test('Update application property fails', async () => {
    const TestComponent = () => {
      const [errorMessage, setErrorMessage] = useState('');
      return (
        <ApplicationProperties
          applicationName="Test Application"
          errorMessage={errorMessage}
          setErrorMessage={setErrorMessage}
          currentPage={1}
          setCurrentPage={jest.fn()}
          successMessage={undefined}
          setSuccessMessage={jest.fn()}
        />
      );
    };
    useOneDataFetchye.mockImplementation(mockUpdateFailureResponse(apiTableData));
    render(<TestComponent />);
    expect(screen.getByText('TRUE'))
      .toBeInTheDocument();
    userEvent.click(screen.getByText('TRUE'));
    userEvent.clear(screen.getByTestId('modalInputArea'));
    userEvent.type(screen.getByTestId('modalInputArea'), 'FALSE');
    userEvent.click(screen.getByTestId('modalSaveBtn'));
    await act(async () => {
      await waitFor(() => expect(screen.getByTestId('error-message')).toBeInTheDocument());
      await waitFor(() => expect(screen.getByTestId('empty-success-message')).toBeInTheDocument());
      await waitFor(() => expect(screen.getByText('Server Error')).toBeInTheDocument());
    });
  });

  test('Update succeeds but refresh fails', async () => {
    const TestComponent = () => {
      const [errorMessage, setErrorMessage] = useState('');
      return (
        <ApplicationProperties
          applicationName="Test Application"
          errorMessage={errorMessage}
          setErrorMessage={setErrorMessage}
          currentPage={1}
          setCurrentPage={jest.fn()}
          successMessage={undefined}
          setSuccessMessage={jest.fn()}
        />
      );
    };
    useOneDataFetchye.mockImplementation(mockRefreshFailureResponse(apiTableData));
    render(<TestComponent />);
    expect(screen.getByText('TRUE'))
      .toBeInTheDocument();
    userEvent.click(screen.getByText('TRUE'));
    userEvent.clear(screen.getByTestId('modalInputArea'));
    userEvent.type(screen.getByTestId('modalInputArea'), 'FALSE');
    userEvent.click(screen.getByTestId('modalSaveBtn'));
    await act(async () => {
      await waitFor(() => expect(screen.getByTestId('error-message')).toBeInTheDocument());
      await waitFor(() => expect(screen.getByTestId('empty-success-message')).toBeInTheDocument());
      await waitFor(() => expect(screen.getByText('Server Error')).toBeInTheDocument());
    });
  });

  test('Updates table data and resets current page on search input', () => {
    const setCurrentPageMock = jest.fn();
    const mockProps = {
      applicationName: 'Test Application',
      errorMessage: undefined,
      setErrorMessage: jest.fn(),
      successMessage: undefined,
      setSuccessMessage: jest.fn(),
      currentPage: 1,
      setCurrentPage: setCurrentPageMock,
    };

    useOneDataFetchye.mockImplementation(mockApiImplementation(createApiResponseJson(3)));

    render(<ApplicationProperties {...mockProps} />);

    const searchInput = screen.getByTestId('searchTerm');
    fireEvent.change(searchInput, { target: { value: 'property1' } });

    expect(setCurrentPageMock).toHaveBeenCalledWith(1);
    // Verify that only the searched row is displayed
    expect(screen.getByText('Test property1')).toBeInTheDocument();
    expect(screen.queryByText('Test property0')).not.toBeInTheDocument();
    expect(screen.queryByText('Test property2')).not.toBeInTheDocument();

    // Clear the search input
    fireEvent.change(searchInput, { target: { value: ' ' } });

    // Verify table data is reset
    expect(screen.getByText('Test property0')).toBeInTheDocument();
    expect(screen.getByText('Test property1')).toBeInTheDocument();
    expect(screen.getByText('Test property2')).toBeInTheDocument();
  });
});
