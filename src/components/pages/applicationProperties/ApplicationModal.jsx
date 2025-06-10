/* eslint-disable react/jsx-no-useless-fragment -- fragment required when hidden */
import React,
{
  useState,
  forwardRef,
  useImperativeHandle,
} from 'react';
import { FormattedMessage } from 'react-intl';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from '@americanexpress/dls-react';
import { useAdsId } from '../../common/authentication/UserState';

export const ApplicationModal = forwardRef((props, ref) => {
  const [showModal, setShowModal] = useState(false);
  const [application, setApplication] = useState();
  const [value, setValue] = useState();
  const [index, setIndex] = useState();
  const adsId = useAdsId();
  const toggleModal = () => {
    setShowModal(!showModal);
  };

  useImperativeHandle(ref, () => ({
    openModal: (applicationRow, rowIndex) => {
      toggleModal();
      setValue(applicationRow.value);
      setApplication(applicationRow);
      setIndex(rowIndex);
    },
  }));

  const updateValue = (e) => {
    setValue(e.target.value);
  };

  const saveApplication = (e) => {
    e.preventDefault();
    const applicationProp = { ...application };
    applicationProp.value = value;
    applicationProp.last_updated.user_id = adsId;
    props.saveApplication({ application: applicationProp, index });
    toggleModal();
  };

  return (
    <>
      {showModal && (
        <Modal onClose={toggleModal} data-testid="applicationModal">
          <ModalHeader>
            <h2 className="fluid heading-3">
              <FormattedMessage id="modal.head" />
            </h2>
          </ModalHeader>
          <ModalBody>
            <div className="padResponsiveExtraLr pad-2">
              <h2 className="heading-5 margin-3-b pad-3-t">
                {application?.name}
              </h2>
              <p className="pad-2-b">
                <textarea data-testid="modalInputArea" value={value} rows="6" className="fluid pad-1" onChange={updateValue} />
              </p>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button data-testid="modalSaveBtn" className="margin-1-r" styleType="primary" onClick={saveApplication}>
              <FormattedMessage id="save.button.label" />
            </Button>
            <Button styleType="primary" onClick={toggleModal} data-testid="modalCloseButton">
              <FormattedMessage id="close.button.label" />
            </Button>
          </ModalFooter>
        </Modal>
      )}
    </>
  );
});

/* eslint-enable react/jsx-no-useless-fragment -- fragment required when hidden */

ApplicationModal.displayName = 'ApplicationModal';
ApplicationModal.propTypes = React.PropsWithChildren;
