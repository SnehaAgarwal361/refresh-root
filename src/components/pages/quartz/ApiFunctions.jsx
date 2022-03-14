import { useOneDataFetchye } from '@americanexpress/fetchye-amex';

export function FetchTriggerList(selectedApp) {
  return useOneDataFetchye('ReadKnowYourCustomerRefreshJobTriggers.v1', { body: { applicationName: selectedApp } });
}

export function PauseTrigger(selectedApp, triggerName) {
  return useOneDataFetchye('UpdateKnowYourCustomerRefreshJobTrigger.v1', {
    defer: true,
    body: {
      applicationName: selectedApp,
      triggerName,
      status: 'PAUSED',
    },
  });
}

export function ResetTrigger(selectedApp, triggerName) {
  return useOneDataFetchye('UpdateKnowYourCustomerRefreshJobTrigger.v1', {
    defer: true,
    body: {
      applicationName: selectedApp,
      triggerName,
      status: 'RESET',
    },
  });
}

export function ResumeTrigger(selectedApp, triggerName) {
  return useOneDataFetchye('UpdateKnowYourCustomerRefreshJobTrigger.v1', {
    defer: true,
    body: {
      applicationName: selectedApp,
      triggerName,
      status: 'NORMAL',
    },
  });
}

export function CreateTrigger(selectedApp, triggerName) {
  return useOneDataFetchye('CreateKnowYourCustomerRefreshJobTrigger.v1', {
    defer: true,
    body: {
      applicationName: selectedApp,
      triggerName,
    },
  });
}

export function UpdateTrigger(selectedApp, trigger, scheduleJson) {
  return useOneDataFetchye('UpdateKnowYourCustomerRefreshJobTrigger.v1', {
    defer: true,
    body: {
      applicationName: selectedApp,
      triggerName: trigger,
      schedule: scheduleJson,
    },
  });
}
