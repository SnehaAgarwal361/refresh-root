import React, { useState } from 'react';
import {
  ButtonPrimary,
  Label,
  Select,
  SelectOption,
} from '@americanexpress/dls-react';
import PropTypes from 'prop-types';
import { applicationList } from '../../../applicationList';

export function TopPanel({ setApp }) {
  const [selectedApp, setSelectedApp] = useState('');
  return (
    <div className="pad-2-md-up pad-1-sm-down shadow-2">
      <div className="col-md-6 row col-md-offset-3 margin-1-r">
        <Label className="margin-2-t margin-3-r" htmlFor="applicationName">Application Name</Label>
        <Select
          id="selectedApplication"
          data-testid="selectedApplication"
          value={selectedApp}
          onChange={(evt) => setSelectedApp(evt.target.value)}
        >
          <SelectOption value="" />
          {
            applicationList.map((option) => (
              <SelectOption key={option.id} value={option.id}>{option.friendlyName}
              </SelectOption>
            ))
          }
        </Select>
        <ButtonPrimary
          data-testid="select-app-button"
          className="margin-4-l"
          aria-label="Primary"
          size="sm"
          onClick={() => setApp(selectedApp)}
        >
          Search
        </ButtonPrimary>
      </div>
    </div>
  );
}

TopPanel.propTypes = {
  setApp: PropTypes.func.isRequired,
};
