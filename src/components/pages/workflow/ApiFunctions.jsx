import { useOneDataFetchye } from '@americanexpress/fetchye-amex';

export function FetchStrategies(applicationName) {
  return useOneDataFetchye('ReadKnowYourCustomerRefreshStrategies.v1', {
    defer: false,
    body: { applicationName },
  });
}

export function FetchTransitions(applicationName, strategyName) {
  return useOneDataFetchye('ReadKnowYourCustomerRefreshTransitions.v1', {
    defer: strategyName === '',
    body: {
      applicationName,
      strategyName,
    },
  });
}

export function UpdateTransition(applicationName, transition) {
  return useOneDataFetchye('UpdateKnowYourCustomerRefreshTransition.v1', {
    defer: true,
    body: {
      applicationName,
      transitionId: transition?.guid,
      transition,
    },
  });
}
