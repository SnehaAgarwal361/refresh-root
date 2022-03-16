import React from 'react';
import { Label, Select, SelectOption } from '@americanexpress/dls-react';
import PropTypes from 'prop-types';
import { applicationList } from '../../../applicationList';

export function TopPanel({ setApp }) {
  return (
    <div className="pad-2-md-up pad-1-sm-down shadow-2">
      <div className="col-md-6 row col-md-offset-4">
        <Label className="margin-2-t margin-3-r" htmlFor="applicationName">Application Name</Label>
        <Select
          id="selectedApplication"
          data-testid="selectedApplication"
          onChange={(evt) => setApp(evt.target.value)}
        >
          <SelectOption value="" />
          {
            applicationList.map((option) => (
              <SelectOption key={option.id} value={option.id}>{option.friendlyName}
              </SelectOption>
            ))
          }
        </Select>
      </div>
    </div>
  );
}

TopPanel.propTypes = {
  setApp: PropTypes.func.isRequired,
};
