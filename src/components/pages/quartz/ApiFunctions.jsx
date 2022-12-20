import { useOneDataFetchye } from '@americanexpress/fetchye-amex';

export function FetchTriggerList(selectedApp) {
  return useOneDataFetchye('ReadKnowYourCustomerRefreshJobTriggers.v1', { body: { application_name: selectedApp } });
}

export function PauseTrigger(selectedApp, trigger_name) {
  return useOneDataFetchye('UpdateKnowYourCustomerRefreshJobTrigger.v1', {
    defer: true,
    body: {
      application_name: selectedApp,
      trigger_name,
      status: 'PAUSED',
    },
  });
}

export function ResetTrigger(selectedApp, trigger_name) {
  return useOneDataFetchye('UpdateKnowYourCustomerRefreshJobTrigger.v1', {
    defer: true,
    body: {
      application_name: selectedApp,
      trigger_name,
      status: 'RESET',
    },
  });
}

export function ResumeTrigger(selectedApp, trigger_name) {
  return useOneDataFetchye('UpdateKnowYourCustomerRefreshJobTrigger.v1', {
    defer: true,
    body: {
      application_name: selectedApp,
      trigger_name,
      status: 'NORMAL',
    },
  });
}

export function CreateTrigger(selectedApp, trigger_name) {
  return useOneDataFetchye('CreateKnowYourCustomerRefreshJobTrigger.v1', {
    defer: true,
    body: {
      application_name: selectedApp,
      trigger_name,
    },
  });
}

export function UpdateTrigger(selectedApp, trigger, scheduleJson) {
  return useOneDataFetchye('UpdateKnowYourCustomerRefreshJobTrigger.v1', {
    defer: true,
    body: {
      application_name: selectedApp,
      trigger_name: trigger,
      schedule: scheduleJson,
    },
  });
}
