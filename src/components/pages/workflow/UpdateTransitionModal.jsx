import {
  Button, IconButton, IconTag,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Tag,
} from '@americanexpress/dls-react';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { UpdateTagsFunction } from './ApiWrapperFunctions';
import { ErrorMessage, SuccessMessage } from '../../common/PageMessages';

export function UpdateTransitionModal({
  selectedTransition,
  toggleModal,
  applicationName,
}) {
  const [tags, setTags] = useState(selectedTransition.tags);
  const [successMessage, setSuccessMessage] = useState('');
  const [failureMessage, setFailureMessage] = useState('');
  const [tagToAdd, setTagToAdd] = useState('');
  const { run: updateRun } = UpdateTagsFunction(applicationName, selectedTransition, tags);
  const updateTags = async (event) => {
    event.preventDefault();
    const { data } = await updateRun();
    if (data && data.status === 200) {
      setSuccessMessage('Tags updated successfully');
    } else if (data.body) {
      setTags(selectedTransition.tags);
      setFailureMessage(data.body.error);
    } else {
      setFailureMessage('Unknown error');
    }
  };

  return (
    <Modal onClose={toggleModal}>
      <ModalHeader>
        <h2 className="fluid heading-3">Update Transition Tags</h2>
      </ModalHeader>
      <ModalBody>
        {
          successMessage && successMessage.length > 0 && (
            <SuccessMessage
              data-testid="successMsg"
              message={successMessage}
              setSuccess={setSuccessMessage}
            />
          )
        }
        {
          failureMessage && failureMessage.length > 0 && (
            <ErrorMessage
              data-testid="failureMsg"
              message={failureMessage}
              setError={setFailureMessage}
            />
          )
        }
        <div className="row">
          <p className="col-md-3 label-3">Super
            State: {selectedTransition.superStateName}
          </p>
          <p className="col-md-3 label-3">State: {selectedTransition.stateName}</p>
          <p className="col-md-3 label-3">Event: {selectedTransition.eventType}</p>
          <p className="col-md-3 label-3">Strategy: {selectedTransition.strategy}</p>
        </div>
        <br />
        <br />
        <Label className="col-md-1" htmlFor="tags">Tags</Label>
        <div id="tags" className="stack-r">
          {tags && tags.map((tag) => (
            <Tag
              id={tag.name}
              onDismiss={() => {
                setTags((oldTags) => {
                  if (oldTags.length === 1) return [];
                  return [...oldTags.filter((t) => t.name !== tag.name)];
                });
              }}
              key={tag.name}
              dismissible={true}
            >
              {tag.name}
            </Tag>

          ))}
        </div>
      </ModalBody>

      <ModalFooter>
        <Label htmlFor="newTag">New Tag</Label>
        <Input
          id="newTag"
          data-testid="newTag"
          onChange={(e) => {
            const newTag = e.target.value;
            if (newTag.length > 0) {
              setTagToAdd(newTag);
            }
          }}
        />
        <IconButton
          styleType="primary"
          aria-label="Primary Icon"
          size="sm"
          icon={<IconTag />}
          onClick={() => {
            setTags((oldTags) => {
              if (!oldTags || oldTags.length === 0) return [{ name: tagToAdd }];
              const updatedTags = [...oldTags, { name: tagToAdd }];
              return [...new Set(updatedTags)];
            });
            setTagToAdd('');
          }}
        >
          Add
        </IconButton>
        <Button
          className="margin-1"
          styleType="primary"
          onClick={updateTags}
          size="sm"
        >
          Update
        </Button>
        <Button
          className="margin-1"
          styleType="primary"
          onClick={toggleModal}
          size="sm"
        >
          Close
        </Button>
      </ModalFooter>
    </Modal>
  );
}

UpdateTransitionModal.propTypes = {
  selectedTransition: PropTypes.shape({
    version: PropTypes.number,
    lastUpdatedUserId: PropTypes.string,
    lastUpdatedSource: PropTypes.string,
    guid: PropTypes.string,
    strategy: PropTypes.string,
    superStateName: PropTypes.string,
    stateName: PropTypes.string,
    eventType: PropTypes.string,
    nextSuperStateName: PropTypes.string,
    nextStateName: PropTypes.string,
    actionName: PropTypes.string,
    tags: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
      })
    ),
    active: PropTypes.bool,
  }),
  toggleModal: PropTypes.func,
  applicationName: PropTypes.string,
};
