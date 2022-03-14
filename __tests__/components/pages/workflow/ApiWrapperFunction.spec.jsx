import { useOneDataFetchye } from '@americanexpress/fetchye-amex';
import {
  FetchStateMachine,
  FetchWorkflowStrategies,
  FetchWorkflowTags,
} from '../../../../src/components/pages/workflow/ApiWrapperFunctions';

const applicationList = [{
  friendlyName: 'Test Application',
  description: 'Test Application',
  id: 'TEST',
  isEngineImplementation: true,
}];
const transitionList = [
  {
    version: 0,
    lastUpdatedUserId: null,
    lastUpdatedSource: 'test Source',
    lastUpdatedTimestamp: '2022-02-14T17:05:40.482+00:00',
    guid: 'd7fe65c5-e233-50d1-e053-a065160af988',
    strategy: 'INBOUND',
    superStateName: 'NONE',
    stateName: 'REFRESH_COMPLETED',
    eventType: 'REFRESH_SUCCESS',
    nextSuperStateName: 'NONE',
    nextStateName: 'REFRESH_COMPLETED',
    actionName: 'sampleAction',
    tags: [
      {
        name: 'REFRESH_INBOUND_BAU',
      },
      {
        name: 'CASE_STRATEGY_BAU',
      },
    ],
    active: true,
  },
  {
    version: 0,
    lastUpdatedUserId: null,
    lastUpdatedSource: 'test Source',
    lastUpdatedTimestamp: '2022-02-14T17:05:40.482+00:00',
    guid: 'd7fe65c5-e233-50d1-e053-a065160af988',
    strategy: 'Strategy2',
    superStateName: 'State2',
    stateName: 'superState2',
    eventType: 'eventType2',
    nextSuperStateName: 'None2',
    nextStateName: 'nextState2',
    actionName: 'sampleAction2',
    tags: [
      {
        name: 'REFRESH_INBOUND_BAU2',
      },
    ],
    active: true,
  },
];
jest.mock('@americanexpress/fetchye-amex');
jest.mock('../../../../src/applicationList', () => ({
  applicationList,
}));

describe('Test Api wrapper functions', () => {
  const strategies = [
    'INBOUND', 'OUTBOUND', 'NO-REFRESH',
  ];

  test('Fetch Strategies', () => {
    useOneDataFetchye.mockImplementation(jest.fn()
      .mockImplementation(() => ({
        data: {
          status: 200,
          body: strategies.map((strategy) => ({
            applicationName: 'Test Application',
            shortName: 'TestApp',
            strategy,
          })),
        },
      })));
    const response = FetchWorkflowStrategies();
    strategies.forEach((strategy, index) => expect(response[index])
      .toMatchSnapshot({
        strategy: {
          applicationName: 'Test Application',
          shortName: 'TestApp',
          strategy,
        },
      }));
  });

  test('Handle Failure in Fetch Strategies', () => {
    useOneDataFetchye.mockImplementation(jest.fn()
      .mockImplementation(() => ({
        data: {
          status: 404,
          body: {
            error: 'Server not found',
          },
        },
      })));
    const response = FetchWorkflowStrategies();
    expect(response)
      .toStrictEqual([]);
  });

  test('Handle Failure in Fetch Strategies with unknown error', () => {
    useOneDataFetchye.mockImplementation(jest.fn()
      .mockImplementation(() => ({
        data: {
          status: 500,
          body: undefined,
        },
      })));
    const response = FetchWorkflowStrategies();
    expect(response)
      .toStrictEqual([]);
  });

  test('Fetch Transitions Tags', () => {
    useOneDataFetchye.mockImplementation(jest.fn()
      .mockImplementation(() => ({
        data: {
          status: 200,
          body: transitionList,
        },
      })));
    const response = FetchWorkflowTags();
    expect(response[0])
      .toMatchSnapshot();
  });

  test('Handle failure in Fetch Transitions Tags', () => {
    useOneDataFetchye.mockImplementation(jest.fn()
      .mockImplementation(() => ({
        data: {
          status: 404,
          body: {
            error: 'Server not found',
          },
        },
      })));
    const response = FetchWorkflowTags();
    expect(response)
      .toStrictEqual([]);
  });

  test('Handle unknown failure in Fetch Transitions Tags', () => {
    useOneDataFetchye.mockImplementation(jest.fn()
      .mockImplementation(() => ({
        data: {
          status: 500,
          body: undefined,
        },
      })));
    const response = FetchWorkflowTags();
    expect(response)
      .toStrictEqual([]);
  });

  test('Fetch Transitions', () => {
    useOneDataFetchye.mockImplementation(jest.fn()
      .mockImplementation(() => ({
        data: {
          status: 200,
          body: transitionList,
        },
      })));
    const response = FetchStateMachine();
    expect(response[0])
      .toMatchSnapshot();
  });

  test('Fetch Transitions with tag filter', () => {
    useOneDataFetchye.mockImplementation(jest.fn()
      .mockImplementation(() => ({
        data: {
          status: 200,
          body: transitionList,
        },
      })));
    const response = FetchStateMachine('Test Application', 'Test Strategy', ['REFRESH_INBOUND_BAU']);
    expect(response.length)
      .toBe(1); // Original list has two transitions
  });

  test('Handle failure in Fetch Transitions', () => {
    useOneDataFetchye.mockImplementation(jest.fn()
      .mockImplementation(() => ({
        data: {
          status: 404,
          body: {
            error: 'Server not found',
          },
        },
      })));
    const response = FetchStateMachine();
    expect(response)
      .toStrictEqual([]);
  });

  test('Handle unknown failure in Fetch Transitions', () => {
    useOneDataFetchye.mockImplementation(jest.fn()
      .mockImplementation(() => ({
        data: {
          status: 500,
          body: undefined,
        },
      })));
    const response = FetchStateMachine();
    expect(response)
      .toStrictEqual([]);
  });
});
