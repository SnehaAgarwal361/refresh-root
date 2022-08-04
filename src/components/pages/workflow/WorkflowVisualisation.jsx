import React, { useState } from 'react';
import {
  Label,
  MultiSelect,
  MultiSelectOption,
  Select,
  SelectOption,
} from '@americanexpress/dls-react';
import {
  FetchStateMachine,
  FetchWorkflowStrategies,
  FetchWorkflowTags,
} from './ApiWrapperFunctions';
import { StateMachineDiagram } from './StateMachineDiagram';

export function WorkflowVisualisation() {
  const [selectedStrategy, setSelectedStrategy] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const strategyList = FetchWorkflowStrategies();
  const tags = FetchWorkflowTags(selectedStrategy.applicationName, selectedStrategy.strategy);
  const stateMachine = FetchStateMachine(
    selectedStrategy.applicationName, selectedStrategy.strategy, selectedTags);

  const onChangeStrategy = (event) => {
    if (event.target.selectedIndex > 0) {
      setSelectedStrategy(strategyList[event.target.selectedIndex - 1]);
      setSelectedTags([]);
    }
  };

  const onChangeTags = (id, value) => {
    setSelectedTags((oldOptions) => {
      if (value) {
        oldOptions.push(id);
        return [...new Set(oldOptions)];
      }
      return oldOptions.filter((option) => option !== id);
    }
    );
  };
  return (
    <>
      <h2>
        <div className="text-align-center margin-2-b heading-4">Workflow Visualization</div>
      </h2>
      <div className="card flex flex-align-center flex-justify-center border">
        <div className="margin-1">
          <Label htmlFor="strategy-select">Select a Strategy</Label>
          <Select
            id="strategy-select"
            required={true}
            data-testid="strategy-select"
            onChange={onChangeStrategy}
          >
            <SelectOption value="">Select</SelectOption>
            {strategyList && strategyList.map((strat) => (
              <SelectOption
                key={`${strat.shortName}-${strat.strategy}`}
                value={strat.strategy}
              > {strat.strategy} ({strat.shortName})
              </SelectOption>
            ))}
          </Select>
        </div>
        <div className="margin-1">
          <Label htmlFor="tags-select">Filter by Tags</Label>
          <MultiSelect
            id="tags-select"
            data-testid="tags-select"
            onChange={onChangeTags}
          >
            {tags && tags.map((tag) => (
              <MultiSelectOption key={tag} value={tag} label={tag} id={tag} />
            ))}
          </MultiSelect>
        </div>

      </div>
      <StateMachineDiagram
        transitions={stateMachine}
        applicationName={selectedStrategy.applicationName}
      />
    </>
  );
}
