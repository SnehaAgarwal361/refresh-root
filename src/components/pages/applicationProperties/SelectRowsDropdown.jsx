import { Label, Select, SelectOption } from '@americanexpress/dls-react';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

const SelectRowsDropdown = ({ handleDropDownChange, itemsPerPage, tableLength }) => (
  <div className="flex flex-direction-row" data-testid="selectRowsDropdown">
    <Label className="flex flex-align-center" data-testid="selectRowsDropdownLabel">
      <FormattedMessage id="rows.per.page" />
    </Label>
    <div className="margin-1-l">
      <Select
        id="dt-v2-p-select"
        data-testid="itemsPageDropDown"
        onChange={handleDropDownChange}
        value={itemsPerPage}
      >
        <SelectOption value="10">10</SelectOption>
        <SelectOption value="20">20</SelectOption>
        <SelectOption value={tableLength}>All Rows</SelectOption>
      </Select>
    </div>
  </div>
);

export default SelectRowsDropdown;

SelectRowsDropdown.propTypes = {
  handleDropDownChange: PropTypes.func.isRequired,
  itemsPerPage: PropTypes.number.isRequired,
  tableLength: PropTypes.number.isRequired,
};
