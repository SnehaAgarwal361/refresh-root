import { render, screen } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';
import { useOneDataFetchye } from '@americanexpress/fetchye-amex';
import { WorkflowVisualisation } from '../../../../src/components/pages/workflow/WorkflowVisualisation';
import { StateMachineDiagram } from '../../../../src/components/pages/workflow/StateMachineDiagram';

require('@testing-library/jest-dom/extend-expect');

jest.mock('../../../../src/components/pages/workflow/StateMachineDiagram');
jest.mock('@americanexpress/fetchye-amex');

StateMachineDiagram.mockImplementation(() => (<div>StateMachine</div>));

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
        name: 'TAG-1',
      },
      {
        name: 'TAG-2',
      },
      {
        name: 'TAG-3',
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

useOneDataFetchye.mockImplementation((functionName) => {
  if (functionName.startsWith('ReadKnowYourCustomerRefreshTransitions')) {
    return {
      isLoading: false,
      data: {
        status: 200,
        body: transitionList,
      },
    };
  }
  return {
    isLoading: false,
    data: {
      status: 200,
      body: [
        'INBOUND', 'OUTBOUD', 'NO-REFRESH',
      ],
      run: async () => {
      },
    },
  };
});

describe('State Machine Diagram', () => {
  test('Display state machine as selected', () => {
    render(<WorkflowVisualisation />);
    userEvent.selectOptions(screen.getByTestId('strategy-select'), 'INBOUND');
    userEvent.click(screen.getByText('TAG-1')); // Select TAG-1
    userEvent.click(screen.getByText('TAG-2')); // Select TAG-2
    userEvent.click(screen.getByText('TAG-1')); // Un Select TAG-1
    expect(screen.getByText('StateMachine')) // State machine gets displayed
      .toBeInTheDocument();
  });

  test('Current tags do not get removed if strategy is unselected', () => {
    render(<WorkflowVisualisation />);
    userEvent.selectOptions(screen.getByTestId('strategy-select'), 'INBOUND');
    userEvent.selectOptions(screen.getByTestId('strategy-select'), 'Select');
    expect(screen.getByText('TAG-1'))
      .toBeInTheDocument();
  });
});
