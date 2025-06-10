import React, { useState } from 'react';
import NavBar from '../common/navBar/NavBar';
import { ApplicationFilter } from '../common/applicationFilter/ApplicationFilter';
import ApplicationProperties from './applicationProperties/ApplicationProperties';
import { QuartzJobProperties } from './quartzJobProperties/QuartzJobProperties';

function ApplicationConfigurationsPage() {
  const [selectedApp, setApplicationName] = useState('');
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [successMessage, setSuccessMessage] = useState(undefined);
  const [currentPage, setCurrentPage] = useState(1);
  const [section, setSection] = useState('applicationProperties');
  const onApplicationFilterChange = (e) => {
    setApplicationName(e.target.value);
    setErrorMessage(undefined);
    setSuccessMessage(undefined);
    setCurrentPage(1);
  };

  return (
    <div>
      <ApplicationFilter setApp={onApplicationFilterChange} />
      {selectedApp && <NavBar section={section} setSection={setSection} /> }
      {selectedApp
          && section === 'applicationProperties'
          && (
          <ApplicationProperties
            applicationName={selectedApp}
            errorMessage={errorMessage}
            setErrorMessage={setErrorMessage}
            successMessage={successMessage}
            setSuccessMessage={setSuccessMessage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
          )}
      {selectedApp && section === 'quartz' && <QuartzJobProperties selectedApp={selectedApp} />}
    </div>
  );
}

export default ApplicationConfigurationsPage;
