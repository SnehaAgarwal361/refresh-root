import React, {
  useEffect, useMemo, useRef, useState,
} from 'react';
import {
  Pagination,
  Search,
} from '@americanexpress/dls-react';
import { useOneDataFetchye } from '@americanexpress/fetchye-amex';
import PropTypes from 'prop-types';
import { ApplicationModal } from './ApplicationModal';
import { ErrorMessage, SuccessMessage } from '../../common/PageMessages';
import styles from './ApplicationProperties.scss';
import ApplicationPropertiesTable from './applicationPropertiesTable/ApplicationPropertiesTable';
import useSortTableHandler from './useSortTableHandler';
import SelectRowsDropdown from './SelectRowsDropdown';

const ApplicationProperties = ({
  applicationName,
  errorMessage,
  setErrorMessage,
  successMessage,
  setSuccessMessage,
  currentPage,
  setCurrentPage,
}) => {
  const [itemsPerPage, setItemsPerPage] = useState(0);
  const [tableData, setTableData] = useState([]);
  const [selectedRow, setSelectedRow] = useState();
  const [modalSave, setModalSave] = useState(false);
  const { sortedDirection, handleSortClick } = useSortTableHandler({
    tableData,
    setTableData,
    setCurrentPage,
  });
  const [searchTerm, setSearchTerm] = useState('');

  const {
    isLoading,
    data: fetchData,
    error: fetchError,
    run: fetchRun,
  } = useOneDataFetchye(
    'ReadKnowYourCustomerRefreshApplicationProperties.v1',
    {
      defer: applicationName?.trim().length <= 1,
      body: {
        application_name: applicationName,
      },
    });

  const updatePropertyRun = useOneDataFetchye(
    'UpdateKnowYourCustomerRefreshApplicationProperty.v1',
    {
      defer: true,
      body: {
        application_name: applicationName,
        property: {
          ...selectedRow?.application,
        },
      },
    });

  const searchTermHandler = (e) => {
    const inputValue = e.target.value;
    setSearchTerm(inputValue);
    setCurrentPage(1);
    if (inputValue?.trim() === '') {
      setTableData(fetchData.body);
    } else {
      const filteredData = fetchData.body.filter(
        (row) => row.name?.toLowerCase()
          .includes(inputValue.toLowerCase())
                        || row.group?.toLowerCase()
                          .includes(inputValue.toLowerCase())
                        || row.value?.toLowerCase()
                          .includes(inputValue.toLowerCase())
                        || row.description?.toLowerCase()
                          .includes(inputValue.toLowerCase()));
      setTableData(filteredData);
    }
  };

  useEffect(() => { // Changes on clicking save
    if (modalSave && selectedRow) {
      updatePropertyRun.run().then((updateResult) => {
        if (updateResult.data.ok) {
          setSuccessMessage('Updated Successfully');
          fetchRun().then((fetchResult) => {
            if (!fetchResult.data.ok) {
              setErrorMessage(fetchResult?.data.body.error);
            }
          });
          setSelectedRow(null);
        } else {
          setErrorMessage(updateResult.data.body.error);
        }
      }
      );
      setModalSave(false);
    }
  }, [selectedRow, modalSave, updatePropertyRun, fetchRun, setErrorMessage, setSuccessMessage]);

  useEffect(() => { // Changes on selecting an application
    if (!isLoading && !fetchError) {
      if (Array.isArray(fetchData?.body) && fetchData.body.length > 0) {
        const sortedData = [...fetchData.body].sort((a, b) => a.name.localeCompare(b.name));
        setTableData(sortedData);
        setItemsPerPage(sortedData.length);
      } else if (fetchData?.body?.length === 0) {
        setErrorMessage('Empty response body returned from One Data.');
      }
    } else {
      setTableData(null);
    }
  }, [fetchError, isLoading, applicationName]);

  const handleDropDownChange = (event) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  const modalRef = useRef();

  const paginatedRows = useMemo(() => {
    const markup = [];

    if (!tableData) return markup;

    const beginIndex = (currentPage - 1) * itemsPerPage;
    let endIndex = Math.min(beginIndex + itemsPerPage, tableData.length);
    endIndex = endIndex < tableData.length ? beginIndex + itemsPerPage : tableData.length;
    for (let i = beginIndex; i < endIndex; i += 1) {
      markup.push(tableData[i]);
    }
    return markup;
    // eslint-disable-next-line react-hooks/exhaustive-deps -- sortedDirection affects order of data
  }, [tableData, currentPage, itemsPerPage, sortedDirection]);

  const saveApplication = (rowData) => {
    setSelectedRow(rowData);
    setModalSave(true);
  };

  const getTable = () => {
    if (!isLoading && tableData != null) {
      return (
        <div className={styles.app_properties_table_bg}>
          <div className="flex flex-direction-row flex-justify-between pad-1">
            <div className="col-md-4 pad-0-l">
              <Search
                id="df-search"
                data-testid="searchTerm"
                value={searchTerm}
                onChange={searchTermHandler}
                placeholder="Search application properties"
              />
            </div>
            <SelectRowsDropdown
              handleDropDownChange={handleDropDownChange}
              itemsPerPage={itemsPerPage}
              tableLength={tableData.length}
            />
          </div>
          <div className="row margin-1">
            <ApplicationPropertiesTable
              paginatedRows={paginatedRows}
              modalRef={modalRef}
              sortedDirection={sortedDirection}
              handleSortClick={handleSortClick}
            />
            {tableData.length > 0 && (
            <Pagination
              data-testid="selectPageNumber"
              theme={{ background: 'transparent' }}
              selected={currentPage}
              onChange={(page) => setCurrentPage(page)}
              total={Math.ceil(tableData.length / itemsPerPage)}
            />
            )}
          </div>
        </div>
      );
    }
    return <div />;
  };

  return (
    <div data-testid="applicationPropertiesSection">
      <ApplicationModal ref={modalRef} saveApplication={saveApplication} />
      <div className="margin-1">
        <SuccessMessage message={successMessage} setSuccess={setSuccessMessage} />
        <ErrorMessage message={errorMessage} setError={setErrorMessage} />
      </div>
      {getTable()}
    </div>
  );
};

export default ApplicationProperties;

ApplicationProperties.propTypes = {
  applicationName: PropTypes.string,
  errorMessage: PropTypes.string,
  setErrorMessage: PropTypes.func,
  successMessage: PropTypes.string,
  setSuccessMessage: PropTypes.func,
  currentPage: PropTypes.number,
  setCurrentPage: PropTypes.func,
};
