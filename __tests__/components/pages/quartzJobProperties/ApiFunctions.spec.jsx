import { useOneDataFetchye } from '@americanexpress/fetchye-amex';
import {
  CreateTrigger,
  FetchTriggerList,
  PauseTrigger, ResetTrigger, ResumeTrigger,
  UpdateTrigger,
} from '../../../../src/components/pages/quartzJobProperties/ApiFunctions';

jest.mock('@americanexpress/fetchye-amex');

test('Call Fetch Triggers API  function with expected argument list', () => {
  const mockApi = useOneDataFetchye.mockImplementation(jest.fn);
  FetchTriggerList('Test Application');
  expect(mockApi)
    .toHaveBeenCalledWith('ReadKnowYourCustomerRefreshJobTriggers.v1', { body: { application_name: 'Test Application' } });
});

test('Call Create Trigger API  function with expected argument list', () => {
  const mockApi = useOneDataFetchye.mockImplementation(jest.fn);
  CreateTrigger('Test Application', 'Test Trigger');
  expect(mockApi)
    .toHaveBeenCalledWith('CreateKnowYourCustomerRefreshJobTrigger.v1', { defer: true, body: { application_name: 'Test Application', trigger_name: 'Test Trigger' } });
});

test('Call Update Trigger API  function with expected argument list', () => {
  const mockApi = useOneDataFetchye.mockImplementation(jest.fn);
  UpdateTrigger('Test Application', 'Test Trigger', { trigger_type: 'CRON', interval: '0 0/2 * * * ?' });
  expect(mockApi)
    .toHaveBeenCalledWith('UpdateKnowYourCustomerRefreshJobTrigger.v1', { defer: true, body: { application_name: 'Test Application', trigger_name: 'Test Trigger', schedule: { trigger_type: 'CRON', interval: '0 0/2 * * * ?' } } });
});

test('Call Pause Trigger API  function with expected argument list', () => {
  const mockApi = useOneDataFetchye.mockImplementation(jest.fn);
  PauseTrigger('Test Application', 'Test Trigger');
  expect(mockApi)
    .toHaveBeenCalledWith('UpdateKnowYourCustomerRefreshJobTrigger.v1', { defer: true, body: { application_name: 'Test Application', trigger_name: 'Test Trigger', status: 'PAUSED' } });
});

test('Call Resume Trigger API  function with expected argument list', () => {
  const mockApi = useOneDataFetchye.mockImplementation(jest.fn);
  ResumeTrigger('Test Application', 'Test Trigger');
  expect(mockApi)
    .toHaveBeenCalledWith('UpdateKnowYourCustomerRefreshJobTrigger.v1', { defer: true, body: { application_name: 'Test Application', trigger_name: 'Test Trigger', status: 'NORMAL' } });
});

test('Call Reset Trigger API  function with expected argument list', () => {
  const mockApi = useOneDataFetchye.mockImplementation(jest.fn);
  ResetTrigger('Test Application', 'Test Trigger');
  expect(mockApi)
    .toHaveBeenCalledWith('UpdateKnowYourCustomerRefreshJobTrigger.v1', { defer: true, body: { application_name: 'Test Application', trigger_name: 'Test Trigger', status: 'RESET' } });
});
