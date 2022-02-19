import {
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

export const ApplicationModal = forwardRef((props, ref) => {
  const [showModal, setShowModal] = useState(false);
  const [application, setApplication] = useState();
  const [value, setValue] = useState();
  const [index, setIndex] = useState();

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  useImperativeHandle(ref, () => ({
    openModal: (applicationRow, index) => {
      toggleModal();
      setValue(applicationRow.value);
      setApplication(applicationRow);
      setIndex(index);
    },
  }));

  const updateValue = (e) => {
    setValue(e.target.value);
  };

  const saveApplication = (e) => {
    e.preventDefault();
    const _application = { ...application };
    _application.value = value;
    props.saveApplication({ application: _application, index });

    toggleModal();
  };

  return (
    <>
      {showModal && (
        <Modal onClose={toggleModal}>
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
                <textarea value={value} rows="6" className="fluid pad-1" onChange={updateValue} />
              </p>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button className="margin-1-r" styleType="primary" onClick={saveApplication}>
              <FormattedMessage id="save.button.label" />
            </Button>
            <Button styleType="primary" onClick={toggleModal}>
              <FormattedMessage id="close.button.label" />
            </Button>
          </ModalFooter>
        </Modal>
      )}
    </>
  );
});
