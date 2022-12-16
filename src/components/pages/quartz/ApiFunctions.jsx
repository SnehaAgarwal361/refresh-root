import { useOneDataFetchye } from '@americanexpress/fetchye-amex';

export function FetchTriggerList(selectedApp) {
  return useOneDataFetchye('ReadKnowYourCustomerRefreshJobTriggers.v1', { body: { application_name: selectedApp } });
}

export function PauseTrigger(selectedApp, triggerName) {
  return useOneDataFetchye('UpdateKnowYourCustomerRefreshJobTrigger.v1', {
    defer: true,
    body: {
      application_name: selectedApp,
      triggerName,
      status: 'PAUSED',
    },
  });
}

export function ResetTrigger(selectedApp, triggerName) {
  return useOneDataFetchye('UpdateKnowYourCustomerRefreshJobTrigger.v1', {
    defer: true,
    body: {
      application_name: selectedApp,
      triggerName,
      status: 'RESET',
    },
  });
}

export function ResumeTrigger(selectedApp, triggerName) {
  return useOneDataFetchye('UpdateKnowYourCustomerRefreshJobTrigger.v1', {
    defer: true,
    body: {
      application_name: selectedApp,
      triggerName,
      status: 'NORMAL',
    },
  });
}

export function CreateTrigger(selectedApp, triggerName) {
  return useOneDataFetchye('CreateKnowYourCustomerRefreshJobTrigger.v1', {
    defer: true,
    body: {
      application_name: selectedApp,
      triggerName,
    },
  });
}

export function UpdateTrigger(selectedApp, trigger, scheduleJson) {
  return useOneDataFetchye('UpdateKnowYourCustomerRefreshJobTrigger.v1', {
    defer: true,
    body: {
      application_name: selectedApp,
      triggerName: trigger,
      schedule: scheduleJson,
    },
  });
}
