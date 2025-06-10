import React from 'react';
import {
  DataTableBodyV2, DataTableCellV2,
  DataTableHeadCellV2,
  DataTableHeadV2,
  DataTableRowV2,
  DataTableV2,
} from '@americanexpress/dls-react';
import { FormattedMessage } from 'react-intl';
import { IconChange } from '@americanexpress/dls-icons';
import PropTypes from 'prop-types';
import styles from './ApplicationPropertiesTable.scss';

function ApplicationPropertiesTable({
  paginatedRows, modalRef, sortedDirection, handleSortClick,
}) {
  function showSortIcon(iconDirection) {
    return (
      <IconChange
        title="Sort by"
        data-testid="sortByIcon"
        color="black"
        className={iconDirection === 'descending' ? styles.sortIconDescending : styles.sortIconAscending}
      />
    );
  }
  return (
    <div data-testid="applicationPropertiesTable" className={styles.table}>
      <DataTableV2 small={true} striped={true} id="tablev2-small-instance">
        <DataTableHeadV2>
          <DataTableRowV2 className="body-1">
            <DataTableHeadCellV2 id="propertyName">
              <FormattedMessage id="property.name" />
              <button type="button" onClick={handleSortClick} className={styles.iconButton}>
                {showSortIcon(sortedDirection)}
              </button>
            </DataTableHeadCellV2>
            <DataTableHeadCellV2><FormattedMessage id="group" /></DataTableHeadCellV2>
            <DataTableHeadCellV2><FormattedMessage id="description" /></DataTableHeadCellV2>
            <DataTableHeadCellV2><FormattedMessage id="value" /></DataTableHeadCellV2>
          </DataTableRowV2>
        </DataTableHeadV2>
        <DataTableBodyV2>
          {paginatedRows.map((row, i) => (
            <DataTableRowV2
              key={`${row.name}-${row.application_name}`}
              onClick={() => modalRef.current.openModal(row, i)}
            >
              <DataTableCellV2>{row.name}</DataTableCellV2>
              <DataTableCellV2>{row.group}</DataTableCellV2>
              <DataTableCellV2>{row.description}</DataTableCellV2>
              <DataTableCellV2>{row.value}</DataTableCellV2>
            </DataTableRowV2>
          )
          )}
        </DataTableBodyV2>
      </DataTableV2>
    </div>
  );
}

export default ApplicationPropertiesTable;

ApplicationPropertiesTable.propTypes = {
  paginatedRows: PropTypes.arrayOf(PropTypes.shape({
    application_name: PropTypes.string,
    name: PropTypes.string,
    group: PropTypes.string,
    description: PropTypes.string,
    value: PropTypes.string,
  })),
  modalRef: PropTypes.shape({
    current: PropTypes.shape({
      openModal: PropTypes.func,
    }),
  }).isRequired,
  sortedDirection: PropTypes.oneOf(['ascending', 'descending', '']),
  handleSortClick: PropTypes.func,
};
