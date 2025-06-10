import React from 'react';
import {
  fireEvent,
  render,
  screen,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useOneDataFetchye } from '@americanexpress/fetchye-amex';
import ApplicationConfigurationsPage from '../../../src/components/pages/ApplicationConfigurationsPage';
import { renderAuthBlueSso } from '../../__utils__/renderWithAuthblue';
import { apiTableData, mockApiImplementation } from '../../testMocks/MockApiResponse';

jest.mock('@americanexpress/fetchye-amex');
jest.mock('../../../src/components/common/authentication/UserState', () => ({
  useAdsId: jest.fn()
    .mockReturnValue('testUser'),
}));

const applicationList = [{
  friendlyName: 'Test Application',
  description: 'Test Application',
  id: 'TEST',
}];

jest.mock('../../../src/constants/applicationList', () => ({
  applicationList,
}));

jest.mock('@americanexpress/one-app-ducks', () => ({
  queryLanguagePack: jest.fn((module, { fallbackLocale } = {}) => ({
    message: `lang pack async state for ${module}`,
    fallbackLocale,
  })),
}));

describe('Application Configurations Page', () => {
  beforeEach(() => {
    useOneDataFetchye.mockReturnValue({
      isLoading: false,
      data: { body: [] },
      error: null,
    });
  });

  it('loads only applicationFilter when no app is selected', () => {
    renderAuthBlueSso(<ApplicationConfigurationsPage />, ['config', 'BYPASS_AUTHBLUE_SSO', true]);
    expect(screen.getByTestId('applicationFilter')).toBeInTheDocument();
    expect(screen.getAllByText('Application Name').length).toBe(1);
  });

  test('renders Application Properties Component when an application is selected', () => {
    useOneDataFetchye.mockImplementation(mockApiImplementation(apiTableData));
    render(<ApplicationConfigurationsPage />);
    userEvent.selectOptions(screen.getByTestId('applicationFilterSelect'), 'Test Application');
    expect(screen.getByText('Test Application').selected).toBeTruthy();
    expect(screen.getByTestId('applicationPropertiesSection')).toBeInTheDocument();
    expect(screen.queryByTestId('quartzPropertiesSection')).not.toBeInTheDocument();
  });

  test('renders Quartz Job Properties Component when quartz section is selected', () => {
    const testTrigger = {
      name: 'Test Trigger',
      schedule: {
        trigger_type: 'CRON',
        interval: '0 0/2 * * * ?',
      },
      state: 'NORMAL',
    };
    useOneDataFetchye.mockReturnValue({
      isLoading: false,
      data: { body: [testTrigger] },
      error: null,
    });
    render(<ApplicationConfigurationsPage />);
    userEvent.selectOptions(screen.getByTestId('applicationFilterSelect'), 'Test Application');
    fireEvent.click(screen.getByText('Quartz Job Properties'));
    expect(screen.getByTestId('quartzPropertiesSection')).toBeInTheDocument();
    expect(screen.queryByTestId('applicationPropertiesSection')).not.toBeInTheDocument();
  });
});
