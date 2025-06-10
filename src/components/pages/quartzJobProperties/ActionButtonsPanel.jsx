import React, { useContext, useState } from 'react';
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from '@americanexpress/dls-react';
import PropTypes from 'prop-types';
import {
  CreateTrigger,
  PauseTrigger,
  ResetTrigger,
  ResumeTrigger,
  UpdateTrigger,
} from './ApiFunctions';
import FetchContext from '../../../context/FetchContext';
import styles from './QuartzJobProperties.scss';

export function FireButton({ selectedApp, trigger_name }) {
  const { run: createRun } = CreateTrigger(selectedApp, trigger_name);
  const fetchContext = useContext(FetchContext);
  const create = async (event) => {
    event.preventDefault();
    fetchContext.setError(undefined);
    fetchContext.setSuccess(undefined);
    const { data } = await createRun();
    if (data && data.status === 201) {
      fetchContext.setSuccess('Trigger Created Successfully');
    } else if (data.body) {
      fetchContext.setError(data.body.error);
    } else {
      fetchContext.setError('Unknown error occurred');
    }
  };
  return (
    <button type="button" data-testid="fireButton" className={styles.actionButton} onClick={create} aria-label="Fire Now">
      <i className="icon-sm, icon dls-icon-play-circle" data-dls-icon-role="decorative" />
      <span className={styles.actionButtonLabel}>Fire Now</span>
    </button>
  );
}

export function PauseButton({ selectedApp, trigger_name }) {
  const { run: pauseRun } = PauseTrigger(selectedApp, trigger_name);
  const fetchContext = useContext(FetchContext);
  const pause = async (event) => {
    event.preventDefault();
    fetchContext.setError(undefined);
    const { data } = await pauseRun();
    if (data && data.status === 204) {
      fetchContext.refresh();
    } else if (data.body) {
      fetchContext.setError(data.body.error);
    } else {
      fetchContext.setError('Unknown error occurred');
    }
  };
  return (
    <button type="button" className={styles.actionButton} onClick={pause} aria-label="Pause">
      <i className="icon-sm, icon dls-icon-pause" data-dls-icon-role="decorative" />
      <span className={styles.actionButtonLabel}>Pause</span>
    </button>
  );
}

export function ResetButton({ selectedApp, trigger_name }) {
  const { run: resetRun } = ResetTrigger(selectedApp, trigger_name);
  const fetchContext = useContext(FetchContext);
  const reset = async (event) => {
    event.preventDefault();
    fetchContext.setError(undefined);
    const { data } = await resetRun();
    if (data && data.status === 204) {
      fetchContext.refresh();
    } else if (data.body) {
      fetchContext.setError(data.body.error);
    } else {
      fetchContext.setError('Unknown error occurred');
    }
  };
  return (
    <button type="button" className={styles.actionButton} onClick={reset} aria-label="Reset">
      <i className="icon-sm, icon dls-icon-refresh" data-dls-icon-role="decorative" />
      <span className={styles.actionButtonLabel}>Reset</span>
    </button>
  );
}

export function ResumeButton({ selectedApp, trigger_name }) {
  const { run: resumeRun } = ResumeTrigger(selectedApp, trigger_name);
  const fetchContext = useContext(FetchContext);
  const resume = async (event) => {
    event.preventDefault();
    fetchContext.setError(undefined);
    const { data } = await resumeRun();
    if (data && data.status === 204) {
      fetchContext.refresh();
    } else if (data.body) {
      fetchContext.setError(data.body.error);
    } else {
      fetchContext.setError('Unknown error occurred');
    }
  };
  return (
    <button type="button" className={styles.actionButton} onClick={resume} aria-label="Resume">
      <i className="icon-sm, icon dls-icon-play" data-dls-icon-role="decorative" />
      <span className={styles.actionButtonLabel}>Resume</span>
    </button>
  );
}

export function EditButton({ selectedApp, trigger }) {
  const [state, setState] = useState({ show: false });
  const [interval, setInterval] = useState('');
  const toggleModal = () => setState({ show: !state.show });
  const { run: editRun } = UpdateTrigger(
    selectedApp, trigger.name, {
      trigger_type: trigger.schedule.trigger_type,
      interval,
    });
  const fetchContext = useContext(FetchContext);
  const edit = async (event) => {
    event.preventDefault();
    fetchContext.setError(undefined);
    const { data } = await editRun();
    if (data && data.status === 204) {
      fetchContext.refresh();
    } else if (data.body) {
      fetchContext.setError(data.body.error);
    } else {
      fetchContext.setError('Unknown error occurred');
    }
    toggleModal();
  };
  return (
    <>
      <button type="button" className={styles.actionButton} onClick={toggleModal} aria-label="Edit">
        <i className="icon-sm, icon dls-icon-edit" data-dls-icon-role="decorative" />
        <span className={styles.actionButtonLabel}>Edit</span>
      </button>
      {state.show && (
      <Modal theme={{ 'div[role = "dialog"]': { width: '70%' } }} onClose={toggleModal}>
        <ModalHeader>
          <h2 className="fluid heading-3">Edit Quartz Trigger</h2>
        </ModalHeader>
        <ModalBody>
          <div className="padResponsiveMd">
            <h2 className="heading-3 margin-3-b pad-3-t col-md-6">
              Trigger : {trigger.name}
            </h2>
            <div className="col-md-12 row">
              <h2 className="heading-3 col-md-6">Trigger Type: {trigger.schedule.trigger_type}</h2>
              <Input
                id="edit-button-input"
                className="dls-white-bg col-md-offset-3 col-md-6"
                defaultValue={trigger.schedule.interval}
                onChange={(e) => setInterval(e.target.value)}
              />
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button styleType="primary" onClick={edit}>Update</Button>
        </ModalFooter>
      </Modal>
      )}
    </>
  );
}

const ActionButtonsPanel = ({ selectedApp, trigger }) => (
  <div className={styles.actionButtonsPanel}>
    <FireButton selectedApp={selectedApp} trigger_name={trigger.name} />
    <PauseButton selectedApp={selectedApp} trigger_name={trigger.name} />
    <ResumeButton selectedApp={selectedApp} trigger_name={trigger.name} />
    <ResetButton selectedApp={selectedApp} trigger_name={trigger.name} />
    <EditButton selectedApp={selectedApp} trigger={trigger} />
  </div>
);

export default ActionButtonsPanel;

ActionButtonsPanel.propTypes = {
  selectedApp: PropTypes.string.isRequired,
  trigger: PropTypes.shape({
    name: PropTypes.string.isRequired,
    schedule: PropTypes.shape({
      trigger_type: PropTypes.string.isRequired,
      interval: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

FireButton.propTypes = {
  selectedApp: PropTypes.string.isRequired,
  trigger_name: PropTypes.string.isRequired,
};

PauseButton.propTypes = {
  selectedApp: PropTypes.string.isRequired,
  trigger_name: PropTypes.string.isRequired,
};

ResumeButton.propTypes = {
  selectedApp: PropTypes.string.isRequired,
  trigger_name: PropTypes.string.isRequired,
};

ResetButton.propTypes = {
  selectedApp: PropTypes.string.isRequired,
  trigger_name: PropTypes.string.isRequired,
};

EditButton.propTypes = {
  selectedApp: PropTypes.string.isRequired,
  trigger: PropTypes.shape({
    name: PropTypes.string,
    schedule: PropTypes.shape({
      trigger_type: PropTypes.string,
      interval: PropTypes.string,
    }),
  }).isRequired,
};
