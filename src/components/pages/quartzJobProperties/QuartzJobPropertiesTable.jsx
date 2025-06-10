import React from 'react';
import {
  DataTableBodyV2,
  DataTableCellV2,
  DataTableHeadCellV2,
  DataTableHeadV2,
  DataTableRowV2,
  DataTableV2,
} from '@americanexpress/dls-react';
import PropTypes from 'prop-types';
import styles from './QuartzJobProperties.scss';
import FetchContext from '../../../context/FetchContext';
import ActionButtonsPanel from './ActionButtonsPanel';

const QuartzJobPropertiesTable = ({
  fetchMemo, selectedApp, data,
}) => (
  <DataTableV2 small={true} striped={true} className="borders-column" data-testid="triggerList">
    <DataTableHeadV2>
      <DataTableRowV2 className="body-1">
        <TriggerListHeader />
      </DataTableRowV2>
    </DataTableHeadV2>
    <DataTableBodyV2>
      <FetchContext.Provider
        value={fetchMemo}
      >
        <TriggerDataListBody selectedApp={selectedApp} listData={data} />
      </FetchContext.Provider>
    </DataTableBodyV2>
  </DataTableV2>
);

function TriggerListHeader() {
  const headers = ['Name', 'Type', 'Schedule', 'State', 'Actions'];
  return headers.map((header) => (
    <DataTableHeadCellV2 key={header} className={styles.quartzTableHeader}>
      {header}
    </DataTableHeadCellV2>
  ));
}

function TriggerDataListBody({
  selectedApp,
  listData,
}) {
  return listData.body.map((trigger) => (
    <DataTableRowV2 key={trigger.name}>
      <DataTableCellV2>{trigger.name}</DataTableCellV2>
      <DataTableCellV2>{trigger.schedule.trigger_type}</DataTableCellV2>
      <DataTableCellV2>{trigger.schedule.interval}</DataTableCellV2>
      <DataTableCellV2>{trigger.state}</DataTableCellV2>
      <DataTableCellV2>
        <ActionButtonsPanel selectedApp={selectedApp} trigger={trigger} />
      </DataTableCellV2>
    </DataTableRowV2>
  ));
}

export default QuartzJobPropertiesTable;

QuartzJobPropertiesTable.propTypes = {
  fetchMemo: PropTypes.shape({
    refresh: PropTypes.func.isRequired,
    setError: PropTypes.func.isRequired,
    setSuccess: PropTypes.func.isRequired,
  }).isRequired,
  selectedApp: PropTypes.string.isRequired,
  data: PropTypes.shape({
    body: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        schedule: PropTypes.shape({
          trigger_type: PropTypes.string.isRequired,
          interval: PropTypes.string.isRequired,
        }).isRequired,
      })
    ),
    state: PropTypes.string,
  }),
};

TriggerDataListBody.propTypes = {
  selectedApp: PropTypes.string.isRequired,
  listData: PropTypes.shape({
    body: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        schedule: PropTypes.shape({
          trigger_type: PropTypes.string.isRequired,
          interval: PropTypes.string.isRequired,
        }).isRequired,
      }).isRequired
    ).isRequired,
    state: PropTypes.string,
  }).isRequired,
};
