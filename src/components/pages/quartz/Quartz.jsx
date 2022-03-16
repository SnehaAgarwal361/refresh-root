import React, { useContext, useMemo, useState } from 'react';
import {
  Button,
  CardRounded,
  DataTableBodyV2,
  DataTableCellV2,
  DataTableHeadCellV2,
  DataTableHeadV2,
  DataTableRowV2,
  DataTableV2,
  Input,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from '@americanexpress/dls-react';
import PropTypes from 'prop-types';
import {
  CreateTrigger,
  FetchTriggerList,
  PauseTrigger,
  ResetTrigger,
  ResumeTrigger,
  UpdateTrigger,
} from './ApiFunctions';
import { TopPanel } from './TopPanel';
import { ErrorMessage, SuccessMessage } from '../../common/PageMessages';

export const FetchContext = React.createContext(undefined);

export function PauseButton({ selectedApp, triggerName }) {
  const { run: pauseRun } = PauseTrigger(selectedApp, triggerName);
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
    <button type="button" aria-label="Pause" className="col-md-2 icon-sm, icon dls-icon-pause" onClick={pause} />
  );
}

export function ResetButton({ selectedApp, triggerName }) {
  const { run: resetRun } = ResetTrigger(selectedApp, triggerName);
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
    <button type="button" aria-label="Reset" className="col-md-2 icon-sm, icon dls-icon-refresh" onClick={reset} />
  );
}

export function ResumeButton({ selectedApp, triggerName }) {
  const { run: resumeRun } = ResumeTrigger(selectedApp, triggerName);
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
    <button type="button" aria-label="Resume" className="col-md-2 icon-sm, icon dls-icon-play" onClick={resume} />
  );
}

export function CreateButton({ selectedApp, triggerName }) {
  const { run: createRun } = CreateTrigger(selectedApp, triggerName);
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
    <button type="button" aria-label="Fire Now" className="col-md-2 icon-sm, icon dls-icon-play-circle" onClick={create} />
  );
}

export function EditButton({ selectedApp, trigger }) {
  const [state, setState] = useState({ show: false });
  const [interval, setInterval] = useState('');
  const toggleModal = () => setState({ show: !state.show });
  const { run: editRun } = UpdateTrigger(
    selectedApp, trigger.name, {
      triggerType: trigger.schedule.triggerType,
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
      <button
        type="button"
        aria-label="Edit"
        className="col-md-4 icon-sm, icon dls-icon-edit"
        onClick={toggleModal}
      />
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
                <h2 className="heading-3 col-md-6">Trigger Type: {trigger.schedule.triggerType}</h2>
                <Input
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

function TriggerListHeader() {
  const headers = ['Name', 'Type', 'Schedule', 'State', 'Actions'];
  return headers.map((header) => (
    <DataTableHeadCellV2 key={header}> {header} </DataTableHeadCellV2>
  ));
}
export function TriggerDataListBody({
  selectedApp,
  listData,
}) {
  return listData.body.map((trigger) => (
    <DataTableRowV2 key={trigger.name}>
      <DataTableCellV2>{trigger.name}</DataTableCellV2>
      <DataTableCellV2>{trigger.schedule.triggerType}</DataTableCellV2>
      <DataTableCellV2>{trigger.schedule.interval}</DataTableCellV2>
      <DataTableCellV2>{trigger.state}</DataTableCellV2>
      <DataTableCellV2 className="col-md-12">
        <CreateButton selectedApp={selectedApp} triggerName={trigger.name} />
        <PauseButton selectedApp={selectedApp} triggerName={trigger.name} />
        <ResetButton selectedApp={selectedApp} triggerName={trigger.name} />
        <ResumeButton selectedApp={selectedApp} triggerName={trigger.name} />
        <EditButton selectedApp={selectedApp} trigger={trigger} />
      </DataTableCellV2>
    </DataTableRowV2>
  ));
}

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
        <div className="card card-rounded">
          <SuccessMessage message={successMessage} setSuccess={setSuccessMessage} />
          <ErrorMessage message={errorMessage} setError={setErrorMessage} />
          <Legend />
          <DataTableV2>
            <DataTableHeadV2>
              <DataTableRowV2><TriggerListHeader />
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
        </div>
      );
    }
    if (data !== undefined) {
      return <ErrorMessage message={data.body.error} />;
    }
  }
  return <div />;
}

function Legend() {
  return (
    <CardRounded className="col-md-12">
      <div className="row">
        <span className="col-md-2 label-1">Legend</span>
        <span className="col-md-2">
          <span className="icon-sm, icon dls-icon-play-circle" />
          <span className="body-1">Fire now</span>
        </span>
        <span className="col-md-2">
          <span className="icon-sm, icon dls-icon-edit" />
          <span className="body-1">Edit</span>
        </span>
        <span className="col-md-2">
          <span className="icon-sm, icon dls-icon-pause" />
          <span className=" body-1">Pause</span>
        </span>
        <span className="col-md-2">
          <span className="icon-sm, icon dls-icon-play" />
          <span className="body-1">Resume</span>
        </span>
        <span className="col-md-2">
          <span className="icon-sm, icon dls-icon-refresh" />
          <span className="body-1">Reset</span>
        </span>
      </div>
    </CardRounded>
  );
}

export function Quartz() {
  const [selectedApp, setSelectedApp] = useState('');
  return (
    <>
      <h2>
        <div className="text-align-center margin-2-b heading-4">Quartz Scheduler</div>
      </h2>
      <div id="outer">
        <TopPanel setApp={setSelectedApp} />
        {selectedApp !== '' && <TriggerList selectedApp={selectedApp} />}
      </div>
    </>
  );
}

TriggerList.propTypes = {
  selectedApp: PropTypes.string.isRequired,
};

CreateButton.propTypes = {
  selectedApp: PropTypes.string.isRequired,
  triggerName: PropTypes.string.isRequired,
};

PauseButton.propTypes = {
  selectedApp: PropTypes.string.isRequired,
  triggerName: PropTypes.string.isRequired,
};

ResumeButton.propTypes = {
  selectedApp: PropTypes.string.isRequired,
  triggerName: PropTypes.string.isRequired,
};

ResetButton.propTypes = {
  selectedApp: PropTypes.string.isRequired,
  triggerName: PropTypes.string.isRequired,
};

EditButton.propTypes = {
  selectedApp: PropTypes.string.isRequired,
  trigger: PropTypes.shape({
    name: PropTypes.string,
    schedule: PropTypes.shape({
      triggerType: PropTypes.string,
      interval: PropTypes.string,
    }),
  }).isRequired,
};
