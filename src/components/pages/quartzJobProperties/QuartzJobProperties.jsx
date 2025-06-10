import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { ErrorMessage, SuccessMessage } from '../../common/PageMessages';
import styles from './QuartzJobProperties.scss';
import QuartzJobPropertiesTable from './QuartzJobPropertiesTable';
import ActionsPanelNotification from './ActionsPanelNotification';
import { FetchTriggerList } from './ApiFunctions';

function TriggerList({ selectedApp }) {
  const { isLoading, data, run } = FetchTriggerList(selectedApp);
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [successMessage, setSuccessMessage] = useState(undefined);

  const fetchMemo = useMemo(() => ({
    refresh: run,
    setError: setErrorMessage,
    setSuccess: setSuccessMessage,
  }), [run]);

  if (!isLoading) {
    if (data !== undefined && data.status === 200) {
      return (
        <div className={styles.quartzJobSectionBackground}>
          <SuccessMessage message={successMessage} setSuccess={setSuccessMessage} />
          <ErrorMessage message={errorMessage} setError={setErrorMessage} />
          <ActionsPanelNotification />
          <div className="flex flex-grow row margin-1-t margin-1-b">
            <QuartzJobPropertiesTable fetchMemo={fetchMemo} selectedApp={selectedApp} data={data} />
          </div>

        </div>
      );
    }
    if (data !== undefined) {
      return <ErrorMessage message={data.body.error} />;
    }
  }
  return <div />;
}

export const QuartzJobProperties = ({ selectedApp }) => (
  <div id="outer" className={styles.quartz} data-testid="quartzPropertiesSection">
    {selectedApp !== '' && <TriggerList selectedApp={selectedApp} />}
  </div>
);

QuartzJobProperties.propTypes = {
  selectedApp: PropTypes.string,
};

TriggerList.propTypes = {
  selectedApp: PropTypes.string,
};
