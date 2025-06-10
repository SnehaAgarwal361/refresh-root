import React from 'react';
import {
  Label, Select, SelectOption,
} from '@americanexpress/dls-react';
import PropTypes from 'prop-types';
import { applicationList } from '../../../constants/applicationList';
import styles from './ApplicationFilter.scss';

export function ApplicationFilter({ setApp }) {
  return (
    <div className={styles.appfilter} data-testid="applicationFilter">
      <Label htmlFor="application_name" data-testid="applicationFilterLabel">Application Name</Label>
      <Select
        id="applicationFilterSelect"
        data-testid="applicationFilterSelect"
        onChange={(evt) => setApp(evt)}
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
  );
}

ApplicationFilter.propTypes = {
  setApp: PropTypes.func.isRequired,
};
