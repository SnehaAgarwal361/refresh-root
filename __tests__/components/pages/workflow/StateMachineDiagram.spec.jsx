import { act, render, screen } from '@testing-library/react';
import React from 'react';
import mermaid from 'mermaid';
import userEvent from '@testing-library/user-event';
import { StateMachineDiagram } from '../../../../src/components/pages/workflow/StateMachineDiagram';
import { UpdateTransitionModal } from '../../../../src/components/pages/workflow/UpdateTransitionModal';

require('@testing-library/jest-dom/extend-expect');

jest.mock('mermaid');
jest.mock('../../../../src/components/pages/workflow/UpdateTransitionModal');
mermaid.initialize = jest.fn();
mermaid.mermaidAPI = jest.fn();

UpdateTransitionModal.mockImplementation(() => (<div>UpdateModal</div>));
const sampleTransitions = [
  {
    version: 1,
    lastUpdatedUserId: 'string',
    lastUpdatedSource: 'string',
    guid: 'testId',
    strategy: 'string',
    superStateName: 'fromSuperState',
    stateName: 'fromState',
    eventType: 'sampleEvent',
    nextSuperStateName: 'toSuperState',
    nextStateName: 'toState',
    actionName: 'sampleAction',
    tags: [
      {
        name: 'AML REFRESH',
      },
    ],
    active: true,
  },
];

describe('State Machine Diagram', () => {
  test('Display state machine as selected', () => {
    mermaid.mermaidAPI.render = jest.fn().mockImplementation(
      (arg1, arg2, arg3) => {
        arg3('<span class="edgeLabel">sampleEvent (sampleAction)<title>testId</title></span>');
      });
    render(<StateMachineDiagram
      applicationName="Test application"
      transitions={sampleTransitions}
    />);
    expect(screen.getByTestId('container')) // State machine gets displayed
      .toBeInTheDocument();
  });

  test('Show Tag Update Modal When clicked on a transition', () => {
    mermaid.mermaidAPI.render = jest.fn()
      .mockImplementation(
        (arg1, arg2, arg3) => {
          arg3('<span class="edgeLabel">sampleEvent (sampleAction)<title>testId</title></span>');
        });
    render(<StateMachineDiagram
      applicationName="Test application"
      transitions={sampleTransitions}
    />);
    act(() => {
      userEvent.click(screen.getByText('sampleEvent (sampleAction)'));
    });
    expect(screen.getByText('UpdateModal'))
      .toBeInTheDocument();
  });

  test('Do not show Modal on invalid transition', () => {
    mermaid.mermaidAPI.render = jest.fn()
      .mockImplementation(
        (arg1, arg2, arg3) => {
          arg3('<span class="edgeLabel">sampleEvent (sampleAction)<title>InvalidId</title></span>');
        });
    render(<StateMachineDiagram
      applicationName="Test application"
      transitions={sampleTransitions}
    />);
    act(() => {
      userEvent.click(screen.getByText('sampleEvent (sampleAction)'));
    });
    expect(screen.queryByText('UpdateModal'))
      .not
      .toBeInTheDocument();
  });

  test('Diagram not gets displayed if transitions are empty', () => {
    mermaid.mermaidAPI.render = jest.fn();
    render(<StateMachineDiagram
      applicationName="Test application"
      transitions={[]}
    />);
    expect(screen.getByTestId('container')) // State machine not gets displayed
      .toBeEmptyDOMElement();
  });

  test('Diagram not gets displayed if transitions are undefined', () => {
    mermaid.mermaidAPI.render = jest.fn();
    render(<StateMachineDiagram
      applicationName="Test application"
      transitions={undefined}
    />);
    expect(screen.getByTestId('container')) // State machine not gets displayed
      .toBeEmptyDOMElement();
  });
});
